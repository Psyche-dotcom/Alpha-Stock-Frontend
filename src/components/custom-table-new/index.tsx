"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataItem, ITableProps } from "@/types";
import { Folder } from "lucide-react";
import { ReactNode } from "react";

type CellRenderer<T> = (item: T, column: keyof T) => ReactNode;

// NEW INTERFACE FOR GROUPED HEADER CONFIG
export interface GroupedHeaderConfig<T extends DataItem> {
  historicalDataLabel: string;
  historicalDataColumns: (keyof T)[]; // e.g., ['year1', 'year5', 'year10']
  myAssumptionsLabel: string;
  myAssumptionsColumns: (keyof T)[]; // e.g., ['low', 'medium', 'high']
}

export interface EnhancedTableProps<T extends DataItem> extends ITableProps<T> {
  cellRenderers?: Partial<Record<keyof T, CellRenderer<T>>>;
  columnOrder?: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
  className?: string;
  // NEW OPTIONAL PROP
  groupedHeaderConfig?: GroupedHeaderConfig<T>;
}

export function TableComponentNew<T extends DataItem>({
  tableData,
  currentPage,
  totalPages,
  onPageChange,
  cellRenderers = {},
  columnOrder,
  columnLabels = {},
  className,
  groupedHeaderConfig, // Destructure the new prop
}: EnhancedTableProps<T>) {
  if (tableData.length === 0)
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "50vh" }}
      >
        <div className="text-center">
          <Folder size={60} className="mx-auto mb-4 text-gray-500" />
          <div className="text-lg font-medium text-gray-600">
            No data available
          </div>
        </div>
      </div>
    );

  const columns = columnOrder || (Object.keys(tableData[0]) as (keyof T)[]);

  const formatColumnName = (name: string) => {
    // Check if a specific label is provided and is NOT an empty string
    if (
      columnLabels[name as keyof T] !== undefined &&
      columnLabels[name as keyof T] !== ""
    ) {
      return columnLabels[name as keyof T];
    }
    // If an empty string is explicitly provided, return it to hide the label
    if (columnLabels[name as keyof T] === "") {
      return "";
    }
    // Fallback logic if no label is provided or it's implicitly undefined
    return name.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  };

  const renderCellContent = (item: T, column: keyof T) => {
    if (cellRenderers[column]) {
      // Pass both item and column to the renderer
      return cellRenderers[column]!(item, column);
    }

    return String(item[column]);
  };

  // Calculate colSpan for grouped headers
  const getColSpan = (colsToSpan: (keyof T)[]) => {
    // Count how many of the 'colsToSpan' are actually present in the 'columns' array
    return colsToSpan.filter((col) => columns.includes(col)).length;
  };

  const historicalDataColSpan = groupedHeaderConfig
    ? getColSpan(groupedHeaderConfig.historicalDataColumns)
    : 0;
  const myAssumptionsColSpan = groupedHeaderConfig
    ? getColSpan(groupedHeaderConfig.myAssumptionsColumns)
    : 0;

  return (
    <div className="w-full">
      <div className="overflow-auto">
        <Table>
          <TableHeader className="bg-[#351F05]">
            {/* Conditional rendering for the grouped header row */}
            {groupedHeaderConfig && (
              <TableRow className="border-1 bg-[#351F05]">
                {" "}
                {/* Apply background here */}
                {/* Empty cell for the 'feature' column */}
                <TableHead
                  className={cn(
                    "whitespace-pre py-2 font-semibold text-xs text-white",
                    "pl-6 text-start"
                  )}
                ></TableHead>
                {/* Historical Data Header */}
                {historicalDataColSpan > 0 && (
                  <TableHead
                    colSpan={historicalDataColSpan}
                    className="whitespace-pre py-2 font-semibold text-xs text-white text-center"
                  >
                    {groupedHeaderConfig.historicalDataLabel}
                  </TableHead>
                )}
                {/* My Assumptions Header */}
                {myAssumptionsColSpan > 0 && (
                  <TableHead
                    colSpan={myAssumptionsColSpan}
                    className="whitespace-pre py-2 font-semibold text-xs text-white text-center"
                  >
                    {groupedHeaderConfig.myAssumptionsLabel}
                  </TableHead>
                )}
              </TableRow>
            )}

            {/* Existing row for individual column headers */}
            <TableRow className="border-1">
              {columns.map((column, index) => (
                <TableHead
                  className={cn(
                    "whitespace-pre py-2 font-semibold text-xs bg-[#351F05] text-white",
                    index === 0 ? "pl-6 text-start" : "text-center"
                  )}
                  key={String(column)}
                >
                  {formatColumnName(String(column))}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {tableData.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  "border-b border-[#E5E7EB] cursor-pointer hover:bg-[#EBE9E6]/40",
                  className
                )}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    className={cn("py-2", colIndex === 0 ? "pl-6" : "")}
                    key={String(column)}
                  >
                    {rowIndex === 0 &&
                    (column === "low" ||
                      column === "medium" ||
                      column === "high")
                      ? null
                      : renderCellContent(item, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
