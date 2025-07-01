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
import TableSkeleton from "../card/skeleton/table";

type CellRenderer<T> = (item: T, column: keyof T) => ReactNode;

export interface EnhancedTableProps<T extends DataItem> extends ITableProps<T> {
  cellRenderers?: Partial<Record<keyof T, CellRenderer<T>>>;
  columnOrder?: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
  fixed?: boolean; // NEW optional prop
}

export function TableComponent<T extends DataItem>({
  tableData,
  currentPage,
  totalPages,
  onPageChange,
  cellRenderers = {},
  columnOrder,
  columnLabels = {},
  className,
  isLoading = false,
  fixed = false, // default false
}: EnhancedTableProps<T>) {
  const columns = columnOrder || (Object.keys(tableData[0]) as (keyof T)[]);

  if (isLoading) return <TableSkeleton columns={columns} />;

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

  const formatColumnName = (name: string) => {
    const label = columnLabels[name as keyof T];

    if (label === "") return null; // Skip rendering label
    if (label) return label;

    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderCellContent = (item: T, column: keyof T) => {
    if (cellRenderers[column]) {
      return cellRenderers[column]!(item, column);
    }

    return String(item[column]);
  };

  return (
    <div className="w-full">
      <div className="rounded-md overflow-auto">
        <Table className={cn(fixed ? "table-fixed w-full" : "")}>
          <TableHeader className="bg-[#351F05]">
            <TableRow className="border-none">
              {columns.map((column, index) => (
                <TableHead
                  className={cn(
                    "whitespace-pre py-2 font-bold text-xs text-white",
                    index === 0
                      ? cn("pl-6 text-start", fixed ? "w-96" : "")
                      : "text-center"
                  )}
                  key={String(column)}
                >
                  {formatColumnName(String(column)) ?? ""}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={cn("bg-white", className)}>
            {tableData.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b border-[#E5E7EB] cursor-pointer hover:bg-[#EBE9E6]/40"
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    className={cn(
                      "py-2",
                      colIndex === 0 ? cn("pl-6", fixed ? "w-96" : "") : ""
                    )}
                    key={String(column)}
                  >
                    {renderCellContent(item, column)}
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
