"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useGetCompanies } from "@/services/home";
import { useUserSession } from "@/app/context/user-context";
import { Search } from "lucide-react";

interface iProps {
  isAuth?: boolean;
}

interface Company {
  symbol: string;
  name: string;
  logo?: string;
}

const SearchDropdown: React.FC<iProps> = ({ isAuth = false }) => {
  const { profileData, setRedirectModalOpen } = useUserSession();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [previousSearches, setPreviousSearches] = useState<Company[]>([]);
  const [logos, setLogos] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);

  const { companiesData, companiesFilter, companiesIsLoading } = useGetCompanies({ enabled: enableSearch });

  const fetchLogo = async (rawSymbol: string) => {
    const symbol = rawSymbol.split(".")[0];

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/info/profile?symbol=${symbol}`);
      if (!res.ok) return;

      const data = await res.json();
      const image = data?.result?.[0]?.image;

      if (image) {
        setLogos((prev) => ({
          ...prev,
          [symbol]: image,
          [rawSymbol]: image,
        }));
      }
    } catch (err) {
      console.error("Logo fetch failed:", err);
    }
  };

  useEffect(() => {
    if (companiesData?.length) {
      companiesData.forEach((company: Company) => {
        const cleanSymbol = company.symbol.split(".")[0];
        if (!logos[cleanSymbol]) {
          fetchLogo(cleanSymbol);
        }
      });
    }
  }, [companiesData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      companiesFilter(searchQuery);
      setEnableSearch(true);
    }
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!profileData?.result?.isSubActive) {
      setRedirectModalOpen(true);
      return;
    }

    setSearchQuery(event.target.value);
    setShowDropdown(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery === "") {
      const saved = localStorage.getItem("previousSearches");
      if (saved) {
        setPreviousSearches(JSON.parse(saved));
        setShowDropdown(true);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  const saveSearchToLocal = (company: Company) => {
    const existing = JSON.parse(localStorage.getItem("previousSearches") || "[]");
    const updated = [company, ...existing.filter((s: Company) => s.symbol !== company.symbol)].slice(0, 5);
    localStorage.setItem("previousSearches", JSON.stringify(updated));
  };

  const renderLogo = (symbol: string) => {
    const cleanSymbol = symbol.split(".")[0];
    const logoUrl = logos[symbol] || logos[cleanSymbol];

    if (logoUrl) {
      return (
        <img
          src={logoUrl}
          alt={`${symbol} logo`}
          className="w-8 h-8 rounded-full object-contain bg-gray-100"
        />
      );
    }

    // Empty space if no logo
    return <div className="w-8 h-8 rounded-full bg-gray-100"></div>;
  };

  return (
    <div className="flex-1 flex justify-end md:justify-between items-center gap-3 lg:gap-6">
      <div className="flex-1 block">
        <div className="max-w-[500px] relative">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Find a stock"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleSearchFocus}
              ref={inputRef}
              className="w-full py-2 pl-12 pr-4 rounded-3xl border border-gray-300 focus:outline-none"
            />
          </div>

          <div ref={dropdownRef}>
            {showDropdown && (
              <div className="shadow-lg bg-white absolute w-full shadow-custom-1 p-4 rounded-lg max-h-80 overflow-y-auto z-10">
                {searchQuery === "" ? (
                  previousSearches.length > 0 ? (
                    <>
                      <p className="text-xs text-gray-500 mb-1">Recent Searches</p>
                      <ul>
                        {previousSearches.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setSearchQuery(item.symbol);
                              companiesFilter(item.symbol);
                              setEnableSearch(true);
                            }}
                            className="cursor-pointer flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded"
                          >
                            {renderLogo(item.symbol)}
                            <span className="text-sm">
                              <span className="uppercase font-semibold">{item.symbol}</span> - {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No recent searches</p>
                  )
                ) : companiesIsLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Spinner />
                  </div>
                ) : companiesData?.length ? (
                  <ul>
                    {companiesData.map((result: Company) => (
                      <li key={result.symbol} className="mb-2">
                        <Link
                          href={`/user/company/${result.symbol}?tab=metrics`}
                          onClick={() => {
                            saveSearchToLocal({
                              ...result,
                              logo: logos[result.symbol],
                            });
                            handleClearSearch();
                          }}
                          className="flex items-center gap-3"
                        >
                          {renderLogo(result.symbol)}
                          <div>
                            <p className="text-sm font-medium">
                              <span className="uppercase font-semibold">{result.symbol}</span> - {result.name}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No results found for &lsquo;{searchQuery}&rsquo;
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
