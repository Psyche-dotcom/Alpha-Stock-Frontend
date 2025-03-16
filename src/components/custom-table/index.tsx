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

export interface EnhancedTableProps<T extends DataItem> extends ITableProps<T> {
  cellRenderers?: Partial<Record<keyof T, CellRenderer<T>>>;
  columnOrder?: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
}

export function TableComponent<T extends DataItem>({
  tableData,
  currentPage,
  totalPages,
  onPageChange,
  cellRenderers = {},
  columnOrder,
  columnLabels = {},
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
    return (
      columnLabels[name as keyof T] ||
      name.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
      })
    );
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
        <Table>
          <TableHeader className="bg-[#EBE9E6]">
            <TableRow className="border-none">
              {columns.map((column, index) => (
                <TableHead
                  className={cn(
                    "py-4 font-bold text-xs text-[#6B7280]",
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
                className="border-b border-[#E5E7EB] cursor-pointer hover:bg-[#EBE9E6]/40"
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    className={cn("py-4 ", colIndex === 0 ? "pl-6" : "")}
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
