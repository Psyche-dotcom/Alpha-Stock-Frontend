"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { showErrorAlert } from "@/utils/alert";
import {
  useAddMyPiller,
  useGetMyCurrentAlpha,
  useGetStockAlphaStat,
} from "@/services/stock";

type PillarFilter = {
  pillerName: string;
  comparison: ">" | "<";
  value: string; // Keep as string for input flexibility (e.g., "1.", before final number)
  format: string; // e.g., "$", "%", ""
};

type PillarOption = {
  label: string; // This is the displayed text in the dropdown
  value: string; // e.g., "netIcome fifth", "marketCap" - this remains the internal key
  format: string; // e.g., "$", "%", ""
  category: string;
};

// Define the expected format for each fundamental key
const formatMap: Record<string, string> = {
  netIcome: "$",
  roic: "%",
  averageShareOutstanding: "", // This is a count, no specific unit like $ or %
  freeCashFlowMargin: "%",
  revGrowth: "%", // Revenue Growth is a percentage
  pfcf: "", // P/FCF is a multiple, no unit
  peRatio: "", // P/E Ratio is a multiple, no unit
  profitMargin: "%",
  marketCap: "$", // Market Cap is a currency
};

const yearLabelMap: Record<string, string> = {
  first: "1Yr",
  fifth: "5Yr",
  ten: "10Yr",
};

// ** Explicit mapping for display labels **
// Use this for any keys that require specific capitalization or wording
const displayLabelMap: Record<string, string> = {
  netIcome: "Net Income",
  roic: "ROIC",
  averageShareOutstanding: "Average Shares Outstanding",
  freeCashFlowMargin: "Free Cash Flow Margin",
  revGrowth: "Revenue Growth",
  pfcf: "P/FCF",
  peRatio: "P/E Ratio",
  profitMargin: "Profit Margin",
  marketCap: "Market Cap",
  // Add any other keys from your API data here with their desired display names
  // This map overrides the general toTitleCase for specific terms.
};

// Helper function to convert camelCase to Title Case (as a fallback)
function toTitleCase(str: string): string {
  if (!str) return "";
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .split(" ") // Split by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join back with spaces
}

// 💡 Categorize based on key naming
function getCategory(key: string): string {
  // Normalize key for categorization if needed
  const normalizedKey = key.toLowerCase();
  if (normalizedKey.includes("growth")) return "Growth";
  if (normalizedKey.includes("margin") || normalizedKey.includes("profit"))
    return "Margins";
  if (
    normalizedKey.includes("cap") ||
    normalizedKey.includes("pe") ||
    normalizedKey.includes("pfcf") ||
    normalizedKey.includes("value") // For Enterprise Value, EV/Sales etc.
  )
    return "Valuation";
  return "Performance"; // Default category
}

function generatePillarOptions(apiData: any): PillarOption[] {
  const options: PillarOption[] = [];

  const relevantKeys = [
    "netIcome",
    "roic",
    "averageShareOutstanding",
    "freeCashFlowMargin",
    "revGrowth",
    "pfcf",
    "peRatio",
    "profitMargin",
    "marketCap",
    // Add other relevant keys from your ApiData that can be filtered
  ];

  relevantKeys.forEach((key) => {
    const value = apiData[key];

    // Get the base display name for the key (e.g., "Net Income" for "netIcome")
    // This ensures consistency for both direct and time-based pillars
    const baseDisplayName = displayLabelMap[key] || toTitleCase(key);

    if (typeof value === "object" && value !== null) {
      // Handle objects with periods (e.g., netIcome: { fifth: "...", first: "..." })
      Object.entries(value).forEach(([subKey, subVal]) => {
        if (subVal !== null) {
          const yearLabel = yearLabelMap[subKey] || toTitleCase(subKey); // "1Yr", "5Yr", "10Yr"

          options.push({
            label: `${yearLabel} ${baseDisplayName}`, // This is the final display string for the dropdown
            value: `${key} ${subKey}`, // e.g., "netIcome first" - this remains the internal identifier
            format: formatMap[key] || "",
            category: getCategory(key),
          });
        }
      });
    } else if (value !== null) {
      // Handle direct string/number values (e.g., marketCap: "...")
      options.push({
        label: baseDisplayName, // This is the final display string for the dropdown
        value: key,
        format: formatMap[key] || "",
        category: getCategory(key),
      });
    }
  });

  return options;
}

// ✅ Group options by category
function groupPillarOptions(options: PillarOption[]) {
  const groups: Record<string, PillarOption[]> = {};
  options.forEach((opt) => {
    if (!groups[opt.category]) groups[opt.category] = [];
    groups[opt.category].push(opt);
  });
  return groups;
}

export default function PillarScreener() {
  const length = 8;
  const [selectedFilters, setSelectedFilters] = useState<PillarFilter[]>([]);
  const [pillarOptions, setPillarOptions] = useState<PillarOption[]>([]);
  const [groupedOptions, setGroupedOptions] = useState<
    Record<string, PillarOption[]>
  >({});
  const {
    getStockAlphaStatData,
    getStockAlphaStatFilter,
    getStockAlphaStatIsLoading,
    setGetStockAlphaStatFilter,
    getStockAlphaStatError,
  } = useGetStockAlphaStat({ enabled: true });
  const {
    getMyCurrentAlphaData,
    getMyCurrentAlphaIsLoading,
    setGetMyCurrentAlphaFilter,
    getMyCurrentAlphaError,
    refetchGetMyCurrentAlpha,
  } = useGetMyCurrentAlpha({ enabled: true });

  useEffect(() => {
    // This effect should only run once on mount
    setGetStockAlphaStatFilter({
      symbol: "AAPL", // Assuming "AAPL" is a default or placeholder symbol
      period: "annual",
    });
    refetchGetMyCurrentAlpha();
  }, [setGetStockAlphaStatFilter, refetchGetMyCurrentAlpha]); // Dependencies for useEffect

  useEffect(() => {
    if (getMyCurrentAlphaData) {
      setSelectedFilters(getMyCurrentAlphaData);
    }
  }, [getMyCurrentAlphaData]);

  const { myAddPillerData, myAddPillerIsLoading, myAddPillerPayload } =
    useAddMyPiller((res: { statusCode: number; result: any }) => {
      // Handle success or error of adding pillars here if needed
      if (res.statusCode === 200) {
        // Optionally refetch current pillars or show success message
        refetchGetMyCurrentAlpha();
        // console.log("Pillars updated successfully!");
      } else {
        showErrorAlert("Failed to update pillars.");
      }
    });

  useEffect(() => {
    if (getStockAlphaStatData) {
      const opts = generatePillarOptions(getStockAlphaStatData);
      setPillarOptions(opts);
      setGroupedOptions(groupPillarOptions(opts));
    }
  }, [getStockAlphaStatData]);

  const updateFilter = (
    pillarKey: string,
    comparison: ">" | "<", // Strongly type comparison
    inputValue: string
  ) => {
    // 💡 Client-side validation: Filter out non-numeric characters
    // Allows numbers, a single decimal point, and leading minus sign
    const sanitizedInputValue = inputValue
      .replace(/[^0-9.-]/g, "")
      .replace(/(.*)\./, "$1.")
      .replace(/(\..*)\./g, "$1");

    const format =
      pillarOptions.find((p) => p.value === pillarKey)?.format || "";

    const updated: PillarFilter = {
      pillerName: pillarKey,
      comparison: comparison,
      value: sanitizedInputValue, // Use the sanitized value
      format,
    };

    setSelectedFilters((prev) => {
      const exists = prev.find((f) => f.pillerName === pillarKey);
      if (exists) {
        return prev.map((f) => (f.pillerName === pillarKey ? updated : f));
      } else {
        return [...prev, updated];
      }
    });
  };

  const removeFilter = (pillarKey: string) => {
    setSelectedFilters((prev) =>
      prev.filter((f) => f.pillerName !== pillarKey)
    );
  };

  const toggleFilter = (pillarKey: string) => {
    setSelectedFilters((prev) => {
      const exists = prev.find((f) => f.pillerName === pillarKey);
      if (exists) {
        return prev.filter((f) => f.pillerName !== pillarKey);
      } else {
        const newFilterOption = pillarOptions.find(
          (p) => p.value === pillarKey
        );
        return newFilterOption
          ? [
              ...prev,
              {
                pillerName: newFilterOption.value,
                comparison: ">", // Default comparison
                value: "", // Default empty value
                format: newFilterOption.format,
              },
            ]
          : prev;
      }
    });
  };

  const handleSearch = () => {
    if (selectedFilters.length < 1) {
      showErrorAlert("You should select at least 1 filter.");
      return;
    }
    if (selectedFilters.length > length) {
      showErrorAlert(`You selection should not be more than ${length} filters.`);
      return;
    }

    // Optional: Validate that all selected filters have a non-empty numeric value
    const hasInvalidValue = selectedFilters.some((filter) => {
      const numValue = parseFloat(filter.value);
      return filter.value.trim() === "" || isNaN(numValue);
    });

    if (hasInvalidValue) {
      showErrorAlert("All selected filters must have a valid numerical value.");
      return;
    }

    myAddPillerPayload(selectedFilters);
    // alert(JSON.stringify(selectedFilters, null, 2)); // For debugging
  };

  return (
    <>
      <p className="text-center text-[32px] font-bold mb-3">Fundamental Screener</p>
      <div className="space-y-4 flex sm:flex-row flex-col xl:gap-14 sm:gap-8 lg:gap-10 gap-5 mb-10">
        <div className="flex flex-col gap-8 h-fit w-full">
          <h3 className="font-bold text-lg">Categories</h3>
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 relative mt-0">
            {Object.entries(groupedOptions).map(([category, options]) => (
              <DropdownMenu key={category}>
                <DropdownMenuTrigger asChild>
                  <button className="sm:p-2 p-[5px] bg-[#351F05] rounded-md text-white gap-3 max-w-[200px] flex justify-between !w-full">
                    {category} <ChevronDown />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="max-w-[600px] w-full bg-white max-h-[300px] overflow-y-auto"
                >
                  <div className="space-y-2 px-2 py-1">
                    {options.map((pillar) => {
                      const selected = selectedFilters.find(
                        (f) => f.pillerName === pillar.value
                      );

                      // Determine placeholder based on format
                      const inputPlaceholder =
                        pillar.format === "$"
                          ? "e.g., 1000000 (1M)"
                          : pillar.format === "%"
                          ? "e.g., 15 (%)"
                          : "e.g., 1.5"; // For multiples or counts

                      return (
                        <div
                          key={pillar.value}
                          className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center gap-2 bg-muted/50 rounded p-2"
                        >
                          <div className="flex gap-2 items-start">
                            <Checkbox
                              checked={!!selected}
                              onCheckedChange={() => toggleFilter(pillar.value)}
                            />
                            <div className="text-sm font-medium break-words w-full sm:w-48">
                              {pillar.label}{" "}
                              {/* This `pillar.label` is now correctly pre-formatted */}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <Select
                              value={selected?.comparison || ">"} // Set a default value to avoid uncontrolled component warning
                              onValueChange={(val) =>
                                updateFilter(
                                  pillar.value,
                                  val as ">" | "<",
                                  selected?.value || ""
                                )
                              }
                            >
                              <SelectTrigger className="w-full sm:w-24 h-9">
                                <SelectValue placeholder=">" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value=">">Greater</SelectItem>
                                <SelectItem value="<">Less</SelectItem>
                                <SelectItem value="=">Equal</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              type="number" // Restrict to number input
                              step="any" // Allow decimal numbers
                              placeholder={inputPlaceholder} // Dynamic placeholder for better UX
                              value={selected?.value || ""}
                              className="w-full sm:w-32 h-9"
                              onChange={(e) =>
                                updateFilter(
                                  pillar.value,
                                  selected?.comparison || ">",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              className={`sm:w-[60%] w-full py-1 px-2 text-white ${
                selectedFilters.length < 1 ||
                selectedFilters.some(
                  (f) => f.value.trim() === "" || isNaN(parseFloat(f.value))
                )
                  ? "bg-gray-400 pointer-events-none" // Disable if no filters or any filter has invalid value
                  : "bg-[#351F05]"
              }`}
              onClick={handleSearch}
              disabled={
                selectedFilters.length < 1 ||
                selectedFilters.some(
                  (f) => f.value.trim() === "" || isNaN(parseFloat(f.value))
                )
              } // Also disable button directly
            >
              Update My Fundamentals
            </Button>
          </div>
        </div>
        <div className="!mt-0 w-full">
          <div className="flex justify-between mb-6">
            <h3 className="font-bold text-lg">My Fundamentals</h3>
            <p className="font-semibold text-sm">
              {selectedFilters.length} Fundamentals
            </p>
          </div>
          <div className="flex flex-wrap gap-2 bg-[#FFF8F0] sm:px-4 px-2 sm:py-8 py-3 rounded-md shadow-sm min-h-[150px]">
            {selectedFilters.map((filter) => {
              // Convert "netIcome fifth" to "Net Income (5Yr)"
              const [keyPart, yearPart] = filter.pillerName.split(" ");
              // Use displayLabelMap for the base name, falling back to toTitleCase if not found
              let formattedPillarName =
                displayLabelMap[keyPart] || toTitleCase(keyPart);
              if (yearPart) {
                formattedPillarName = `${formattedPillarName} (${
                  yearLabelMap[yearPart] || toTitleCase(yearPart)
                })`;
              }

              const displayValue =
                filter.format === "$"
                  ? `${filter.value}`
                  : filter.format === "%"
                  ? `${filter.value}`
                  : filter.value;

              return (
                <div
                  key={filter.pillerName}
                  className="h-fit flex items-center bg-[#351F05] text-white rounded-full sm:px-3 px-2 py-1 sm:text-sm text-xs text-nowrap"
                >
                  {formattedPillarName}{" "}
                  {/* Use the already correctly formatted name */}
                  {filter.comparison} {displayValue}
                  {filter.format === "%" && filter.value.trim() !== ""
                    ? "%"
                    : ""}{" "}
                  {/* Add % if applicable and value exists */}
                  <button
                    onClick={() => removeFilter(filter.pillerName)}
                    className="ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}