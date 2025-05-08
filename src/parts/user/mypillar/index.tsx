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
import { useAddMyPiller, useGetStockAlphaStat } from "@/services/stock";

// Mocked API data
const apiResponse = {
  statusCode: 200,
  displayMessage: "Success",
  result: {
    marketCap: "2987745469000.00",
    averageShareOutstanding: {
      first: "15343783000.00",
      fifth: "17352119000.00",
      ten: "23013684000.00",
    },
    netIcome: {
      first: "93736000000.00",
      fifth: "57411000000.00",
      ten: "53394000000.00",
    },
    roic: {
      first: "70.14%",
      fifth: "59.26%",
      ten: "44.10%",
    },
    revGrowth: {
      first: "2.021994077514121%",
      fifth: "7.332170089721002",
      ten: "5.281703758121736",
    },
    profitMargin: {
      first: "23.971255769943866%",
      fifth: "20.913611278072235",
      ten: "22.845773698735638",
    },
    freeCashFlowMargin: {
      first: "27.83%",
      fifth: "26.84%",
      ten: "25.77%",
    },
    peRatio: {
      first: "31.87",
      fifth: null,
      ten: null,
    },
    pfcf: {
      first: "27.46",
      fifth: null,
      ten: null,
    },
  },
  errorMessages: null,
};

type PillarFilter = {
  pillerName: string;
  comparison: ">" | "<";
  value: string;
  format: string;
};

type PillarOption = {
  label: string;
  value: string;
  format: string;
  category: string;
};

const formatMap: Record<string, string> = {
  marketCap: "$",
  roic: "%",
  revGrowth: "%",
  profitMargin: "%",
  freeCashFlowMargin: "%",
};

const labelMap: Record<string, string> = {
  first: "1Yr",
  fifth: "5Yr",
  ten: "10Yr",
};

// 💡 Categorize based on key naming
function getCategory(key: string): string {
  if (key.includes("Growth")) return "Growth";
  if (key.includes("Margin") || key.includes("profit")) return "Margins";
  if (key.includes("Cap") || key.includes("pe") || key.includes("pfcf"))
    return "Valuation";
  return "Performance";
}

function generatePillarOptions(result: any): PillarOption[] {
  const options: PillarOption[] = [];

  Object.entries(result).forEach(([key, val]) => {
    if (typeof val === "object" && val !== null) {
      Object.entries(val).forEach(([subKey, subVal]) => {
        if (subVal !== null) {
          const label = `${labelMap[subKey] || subKey} ${key}`.replace(
            /([a-z])([A-Z])/g,
            "$1 $2"
          );
          options.push({
            label,
            value: `${key} ${subKey}`,
            format: formatMap[key] || "",
            category: getCategory(key),
          });
        }
      });
    } else if (val !== null) {
      options.push({
        label: key.replace(/([a-z])([A-Z])/g, "$1 $2"),
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
  useEffect(() => {
    setGetStockAlphaStatFilter({
      symbol: "AAPL",
      period: "annual",
    });
  }, []);
  const { myAddPillerData, myAddPillerIsLoading, myAddPillerPayload } =
    useAddMyPiller((res: { statusCode: number; result: any }) => {});

  useEffect(() => {
    const opts = generatePillarOptions(getStockAlphaStatData);
    setPillarOptions(opts);
    setGroupedOptions(groupPillarOptions(opts));
  }, [getStockAlphaStatData]);

  const updateFilter = (
    pillarKey: string,
    comparison: string,
    inputValue: string
  ) => {
    const format =
      pillarOptions.find((p) => p.value === pillarKey)?.format || "";

    const updated: PillarFilter = {
      pillerName: pillarKey,
      comparison: comparison as ">" | "<",
      value: inputValue,
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
        const newFilter = pillarOptions.find((p) => p.value === pillarKey);
        return newFilter
          ? [
              ...prev,
              {
                pillerName: newFilter.value,
                comparison: ">",
                value: "",
                format: newFilter.format,
              },
            ]
          : prev;
      }
    });
  };

  const handleSearch = () => {
    if (selectedFilters.length !== length) {
      showErrorAlert("You should select exactly 8 filters");
      return;
    }
    myAddPillerPayload(selectedFilters);
    // alert(JSON.stringify(selectedFilters, null, 2));
  };

  return (
    <>
      <p className="text-center text-[32px] font-bold mb-3">Pillar Screener</p>
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
                      return (
                        <div
                          key={pillar.value}
                          className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center gap-2 bg-muted/50 rounded"
                        >
                          <div className="flex gap-2 items-start">
                            <Checkbox
                              checked={!!selected}
                              onCheckedChange={() => toggleFilter(pillar.value)}
                            />
                            <div className="text-sm font-medium break-words w-full sm:w-48">
                              {pillar.label}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <Select
                              value={selected?.comparison || ""}
                              onValueChange={(val) =>
                                updateFilter(
                                  pillar.value,
                                  val,
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
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="1.5"
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
                selectedFilters.length !== length
                  ? "bg-gray-400 pointer-events-none"
                  : "bg-[#351F05]"
              }`}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="!mt-0 w-full">
          <div className="flex justify-between mb-6">
            <h3 className="font-bold text-lg">My Pillars</h3>
            <p className="font-semibold text-sm">
              {selectedFilters.length} / {length} Pillars
            </p>
          </div>
          <div className="flex flex-wrap gap-2 bg-[#FFF8F0] sm:px-4 px-2 sm:py-8 py-3 rounded-md shadow-sm min-h-[150px]">
            {selectedFilters.map((filter) => (
              <div
                key={filter.pillerName}
                className="h-fit flex items-center bg-[#351F05] text-white rounded-full sm:px-3 px-2 py-1 sm:text-sm text-xs text-nowrap"
              >
                {filter.pillerName} {filter.comparison} {filter.value}
                <button
                  onClick={() => removeFilter(filter.pillerName)}
                  className="ml-2"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
