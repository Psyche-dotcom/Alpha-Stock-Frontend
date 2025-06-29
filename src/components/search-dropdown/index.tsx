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

const SearchDropdown: React.FC<iProps> = ({ isAuth = false }) => {
  const { profileData, setRedirectModalOpen } = useUserSession();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);

  const {
    companiesData,
    companiesFilter,
    companiesIsLoading,
    companiesRefetch,
  } = useGetCompanies({ enabled: enableSearch });

  // const handleFocus = () => {
  //   if (inputRef.current) {
  //     inputRef.current.blur();
  //   }
  // };

  // const handleBlur = (event: any) => {
  //   if (
  //     !searchRef.current?.contains(event.relatedTarget as Node) &&
  //     !dropdownRef.current?.contains(event.relatedTarget as Node)
  //   ) {
  //     setShowDropdown(false);
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: any) => {
    if (!profileData?.result?.isSubActive) {
      setRedirectModalOpen(true);
      return;
    }
    const value = event.target.value;
    setSearchQuery(value);
    setShowDropdown(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };
  useEffect(() => {
    if (searchQuery.length > 0) {
      companiesFilter(searchQuery);
      setEnableSearch(true);
    }
  }, [searchQuery]);

  return (
    <>
      <div className="flex-1 flex justify-end md:justify-between items-center gap-3 lg:gap-6">
        <div className="flex-1 hidden md:block">
          <div className="max-w-[500px] relative">
            <div className="relative w-full max-w-[500px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Find a stock"
                onChange={handleInputChange}
                value={searchQuery}
                // onFocus={handleFocus}
                ref={inputRef}
                className="w-full py-2 pl-12 pr-4 rounded-3xl border border-gray-300 focus:outline-none"
              />
            </div>

            <div ref={dropdownRef}>
              {searchQuery !== "" && showDropdown && (
                <>
                  {companiesIsLoading ? (
                    <div
                      className={`shadow-lg bg-white absolute w-full flex items-center justify-center shadow-custom-1 p-6 pb-2 rounded-lg max-h-20 hide-scrollbar z-10 overflow-scroll`}
                    >
                      <Spinner />
                    </div>
                  ) : (
                    <div
                      className={`shadow-lg bg-white absolute w-full shadow-custom-1 p-6 pb-2 rounded-lg max-h-80 hide-scrollbar z-10 overflow-scroll`}
                    >
                      {companiesData?.length !== 0 ? (
                        <ul>
                          {companiesData?.map((result: any) => (
                            <li key={result.userId}>
                              <div className="mb-4">
                                <Link
                                  href={
                                    isAuth
                                      ? `/user/company/${result.symbol}?tab=metrics`
                                      : `/company/${result.symbol}?tab=metrics`
                                  }
                                  passHref
                                  onClick={handleClearSearch}
                                >
                                  <div className="flex gap-2 items-center">
                                    <div>
                                      <p
                                        className={`text-[10px] sm:text-sm flex items-center gap-[4px] capitalize`}
                                      >
                                        <span className="uppercase font-semibold">
                                          {result.symbol}
                                        </span>
                                        {result.name}
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
