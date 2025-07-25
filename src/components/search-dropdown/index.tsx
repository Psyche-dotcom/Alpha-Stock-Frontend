"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { useGetCompanies } from "@/services/home";
import { useUserSession } from "@/app/context/user-context";
import { Search } from "lucide-react";
import React from "react"; // Import React for the inner component

interface iProps {
  isAuth?: boolean;
}

interface Company {
  symbol: string;
  name: string;
  logo?: string; // This will store the fetched logo URL if available
  currency?: string; // Add currency property
}

const SearchDropdown: React.FC<iProps> = ({ isAuth = false }) => {
  const { profileData, setRedirectModalOpen } = useUserSession();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [previousSearches, setPreviousSearches] = useState<Company[]>([]);
  // Use a map to store logo fetch status for each symbol
  const [logoStatus, setLogoStatus] = useState<
    Record<string, { url: string; error: boolean }>
  >({});
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);

  // Assuming useGetCompanies also fetches currency or it's available in company data
  const { companiesData, companiesFilter, companiesIsLoading } =
    useGetCompanies({ enabled: enableSearch });

  const fetchLogo = async (rawSymbol: string) => {
    const symbol = rawSymbol.split(".")[0];

    // Mark as loading or default placeholder initially
    setLogoStatus((prev) => ({
      ...prev,
      [symbol]: { url: "", error: false }, // Set to empty url initially
    }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/info/profile?symbol=${symbol}`
      );
      if (!res.ok) {
        console.warn(
          `Failed to fetch profile for ${symbol}. Status: ${res.status}`
        );
        setLogoStatus((prev) => ({
          ...prev,
          [symbol]: { url: "", error: true }, // Mark as error on bad response
        }));
        return;
      }

      const data = await res.json();
      console.log("Fetched Data", data);
      const image = data?.result?.[0]?.image;

      if (image) {
        setLogoStatus((prev) => ({
          ...prev,
          [symbol]: { url: image, error: false },
        }));
      } else {
        // No image URL found in the API response
        setLogoStatus((prev) => ({
          ...prev,
          [symbol]: { url: "", error: true }, // Mark as error if no image in response
        }));
      }
    } catch (err) {
      console.error(`Logo fetch failed for ${symbol}:`, err);
      setLogoStatus((prev) => ({
        ...prev,
        [symbol]: { url: "", error: true }, // Mark as error on network error
      }));
    }
  };

  useEffect(() => {
    if (companiesData?.length) {
      companiesData.forEach((company: Company) => {
        const cleanSymbol = company.symbol.split(".")[0];
        // Fetch logo only if not already fetching or fetched successfully/with error
        if (!logoStatus[cleanSymbol]) {
          fetchLogo(cleanSymbol);
        }
      });
    }
  }, [companiesData, logoStatus]); // Add logoStatus to dependency array to react to changes

  useEffect(() => {
    // When previous searches are loaded, fetch their logos if not already done
    previousSearches.forEach((company) => {
      const cleanSymbol = company.symbol.split(".")[0];
      if (!logoStatus[cleanSymbol]) {
        fetchLogo(cleanSymbol);
      }
    });
  }, [previousSearches, logoStatus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) // Also check if click is not on the input itself
      ) {
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
      setShowDropdown(true); // Ensure dropdown shows when typing
    } else {
      setEnableSearch(false); // Disable search when query is empty
    }
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!profileData?.result?.isSubActive) {
      setRedirectModalOpen(true);
      return;
    }
    setSearchQuery(event.target.value);
  };

  const handleSearchFocus = () => {
    // Only show previous searches if query is empty
    if (searchQuery === "") {
      const saved = localStorage.getItem("previousSearches");
      if (saved) {
        setPreviousSearches(JSON.parse(saved));
      }
    }
    setShowDropdown(true); // Always show dropdown on focus
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  const saveSearchToLocal = (company: Company) => {
    const existing = JSON.parse(
      localStorage.getItem("previousSearches") || "[]"
    );
    const updated = [
      company,
      ...existing.filter((s: Company) => s.symbol !== company.symbol),
    ].slice(0, 5);
    localStorage.setItem("previousSearches", JSON.stringify(updated));
  };

  // NEW: Refactored logo rendering into a dedicated component
  const LogoRenderer: React.FC<{ symbol: string }> = ({ symbol }) => {
    const cleanSymbol = symbol.split(".")[0];
    const { url, error } = logoStatus[cleanSymbol] || { url: "", error: false }; // Default if not yet fetched

    // If there's an error or no URL available, show the gray circle placeholder
    if (error || !url) {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          {/* Optional: Add a subtle icon or text here if desired, e.g., <span className="text-gray-400 text-xs">?</span> */}
        </div>
      );
    }

    // Otherwise, render the Image component with onError handling
    return (
      <Image
        src={url}
        alt={`${symbol} logo`}
        width={32} // Corresponds to w-8 (32px)
        height={32} // Corresponds to h-8 (32px)
        className="rounded-full object-contain bg-gray-100"
        onError={() => {
          // This onError specifically handles cases where the fetched URL itself is broken
          setLogoStatus((prev) => ({
            ...prev,
            [cleanSymbol]: { ...prev[cleanSymbol], error: true },
          }));
        }}
      />
    );
  };

  // Function to render a list of companies
  const renderCompanyList = (companies: Company[]) => (
    <ul>
      {companies.map((result: Company) => (
        <li key={result.symbol} className="mb-2">
          <Link
            href={`/user/company/${result.symbol}?tab=metrics`}
            onClick={() => {
              const logoInfo = logoStatus[result.symbol.split(".")[0]];
              saveSearchToLocal({
                ...result,
                logo: logoInfo?.url || undefined,
              });
              handleClearSearch();
            }}
            className="flex items-center gap-3"
          >
            <LogoRenderer symbol={result.symbol} />
            <div>
              <p className="text-sm font-medium">
                <span className="uppercase font-semibold">{result.symbol}</span>{" "}
                - {result.name}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  // Categorize companiesData
  const usStocks =
    companiesData?.filter((company: Company) => company.currency === "USD") ||
    [];
  const foreignStocks =
    companiesData?.filter((company: Company) => company.currency !== "USD") ||
    [];

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
                      <p className="text-xs text-gray-500 mb-1">
                        Recent Searches
                      </p>
                      {renderCompanyList(previousSearches)}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No recent searches</p>
                  )
                ) : companiesIsLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {usStocks.length > 0 && (
                      <>
                        <h3 className="text-md font-semibold mb-2">
                          US Stocks
                        </h3>
                        {renderCompanyList(usStocks)}
                      </>
                    )}

                    {usStocks.length > 0 && foreignStocks.length > 0 && (
                      <hr className="my-4 border-gray-200" />
                    )}

                    {foreignStocks.length > 0 && (
                      <>
                        <h3 className="text-md font-semibold mb-2">
                          Foreign Stocks
                        </h3>
                        {renderCompanyList(foreignStocks)}
                      </>
                    )}

                    {companiesData?.length === 0 && (
                      <p className="text-sm text-gray-500">
                        No results found for &lsquo;{searchQuery}&rsquo;
                      </p>
                    )}
                  </>
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
