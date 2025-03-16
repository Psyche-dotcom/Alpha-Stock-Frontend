"use client";

import { useHandlePush } from "@/hooks/handlePush";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useGetCompanies } from "@/services/home";

interface iProps {
  isAuth?: boolean;
}

const SearchDropdown: React.FC<iProps> = ({ isAuth = false }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [queryResults, setQueryResults] = useState<any>([]);

  const {
    companiesData,
    companiesFilter,
    companiesIsLoading,
    companiesRefetch,
  } = useGetCompanies({ enabled: true });

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleBlur = (event: any) => {
    if (
      !searchRef.current?.contains(event.relatedTarget as Node) &&
      !dropdownRef.current?.contains(event.relatedTarget as Node)
    ) {
      setShowDropdown(false);
    }
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  console.log(companiesData);

  useEffect(() => {
    if (companiesData && searchQuery.length > 1) {
      setQueryResults(
        companiesData.filter((company: any) =>
          company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setQueryResults([]);
    }
  }, [companiesData, searchQuery]);

  return (
    <>
      <div className="flex-1 flex justify-end md:justify-between items-center gap-3 lg:gap-6">
        <div className="flex-1 hidden md:block">
          <div className="max-w-[500px] relative">
            <input
              placeholder="Search..."
              onChange={handleInputChange}
              value={searchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full custom-input"
            />

            {searchQuery && (
              <button onClick={handleClearSearch}>
                {loading && <Spinner />}
              </button>
            )}
            <div ref={dropdownRef}>
              {searchQuery !== "" && (
                <>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div
                      className={`shadow-lg bg-white absolute w-full shadow-custom-1 p-6 pb-2 rounded-lg max-h-80 hide-scrollbar z-10 overflow-scroll`}
                    >
                      {queryResults?.length !== 0 ? (
                        <ul>
                          {queryResults?.map((result: any) => (
                            <li key={result.userId}>
                              <div className="mb-4">
                                <Link
                                  href={
                                    isAuth
                                      ? `/user/company/${result.symbol}?tab=company-info`
                                      : `/company/${result.symbol}?tab=company-info`
                                  }
                                  passHref
                                >
                                  <div className="flex gap-2 items-center">
                                    <div>
                                      <p
                                        className={`text-[10px] sm:text-sm flex items-center gap-[4px] capitalize`}
                                      >
                                        <span className="uppercase font-semibold">
                                          {result.symbol}
                                        </span>
                                        {result.companyName}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No results found for &lsquo;{searchQuery}&rsquo;</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDropdown;
