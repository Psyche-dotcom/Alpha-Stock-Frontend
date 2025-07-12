"use client"; // Important: This component uses useRouter, so it must be a client component.

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataItem, ITableProps } from "@/types"; // Ensure DataItem has `id?: string | number;`
import { Folder } from "lucide-react";
import { ReactNode } from "react";
import TableSkeleton from "../card/skeleton/table";
import { useRouter } from "next/navigation"; // NEW: Import useRouter
import React from 'react'; // NEW: Import React for event types

type CellRenderer<T> = (item: T, column: keyof T) => ReactNode;

// NEW: Add a type for header cell classes (if not already present in your actual code)
type HeaderCellClasses<T> = Partial<Record<keyof T, string>>;


export interface EnhancedTableProps<T extends DataItem> extends ITableProps<T> {
  cellRenderers?: Partial<Record<keyof T, CellRenderer<T>>>;
  columnOrder?: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
  fixed?: boolean;
  // NEW: Add headerCellClasses prop (if not already present)
  headerCellClasses?: HeaderCellClasses<T>;
  // NEW: Optional boolean to make rows clickable
  isLink?: boolean;
  // NEW: Optional function to get the link for a row
  linkFormatter?: (item: T) => string;
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
  fixed = false,
  // NEW: Include headerCellClasses in destructuring
  headerCellClasses = {},
  // NEW: Include isLink and linkFormatter in destructuring
  isLink = false,
  linkFormatter,
}: EnhancedTableProps<T>) {
  const router = useRouter(); // NEW: Initialize useRouter

  // Determine columns: use provided order, or keys from first data item if available
  // Fallback to empty array if tableData is empty to prevent errors
  const columns = columnOrder || (tableData.length > 0 ? (Object.keys(tableData[0]) as (keyof T)[]) : []);

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

    if (label === "") return null;
    if (label) return label;

    // Fallback to formatting the key
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderCellContent = (item: T, column: keyof T) => {
    if (cellRenderers[column]) {
      return cellRenderers[column]!(item, column);
    }

    // Handle potential null/undefined values gracefully
    const value = item[column];
    return value !== null && value !== undefined ? String(value) : '';
  };

  // NEW: Function to stop propagation for elements inside a cell that shouldn't trigger row click
  const stopPropagationWrapper = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if the clicked element or any of its parents has a specific data attribute
    // or is a common interactive element like a button, link, or input.
    if (
      target.closest('[data-no-row-click="true"]') || // Custom attribute to prevent row click
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('select')
    ) {
      e.stopPropagation();
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-md overflow-auto">
        <Table className={cn(
            "md:table",
            "block sm:min-w-[700px]",
            fixed ? "table-fixed w-full" : "min-w-fit",
        )}>
          <TableHeader className="bg-[#351F05]">
            <TableRow className="border-none">
              {columns.map((column, index) => (
                <TableHead
                  className={cn(
                    "whitespace-pre py-2 font-bold text-xs text-white",
                    index === 0
                      ? cn("pl-6 text-start", fixed ? "w-96" : "")
                      : "text-center", // Default text-center for other headers
                    "", // Minimum width for all header cells to prevent squishing
                    headerCellClasses[column] // Apply custom header class from props
                  )}
                  key={String(column)}
                >
                  {formatColumnName(String(column)) ?? ""}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={cn("bg-white", className)}>
            {tableData.map((item, rowIndex) => {
              // NEW: Determine the key for the row. Prefer `item.id` if available, otherwise use `rowIndex`.
              // Ensure your DataItem type has an `id` property for stable keys.
              const rowKey = (item as DataItem).id !== undefined ? (item as DataItem).id : rowIndex;

              // NEW: Handler for row click
              const handleRowClick = () => {
                if (isLink && linkFormatter) {
                  const link = linkFormatter(item);
                  if (link) {
                    router.push(link);
                  }
                }
              };

              return (
                <TableRow
                  key={rowKey} // Use the more stable rowKey
                  className={cn(
                    "border-b border-[#E5E7EB]",
                    // NEW: Apply cursor and hover styles only if it's a link
                    isLink ? "cursor-pointer hover:bg-[#EBE9E6]/40 transition-colors duration-150" : ""
                  )}
                  // NEW: Add onClick handler to the row if it's a link
                  onClick={isLink ? handleRowClick : undefined}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      className={cn(
                        "py-2",
                        // Conditional padding for the first column
                        colIndex === 0
                          ? cn("pl-6", fixed ? "w-96" : "")
                          : "px-1", // Default horizontal padding for other cells
                        "", // Minimum width for all cells

                        // NEW: Specific text alignment for numeric/change columns
                        column === 'price' || column === 'change' || column === 'changePercent' ? 'text-center' : '',
                      )}
                      key={String(column)}
                      // NEW: Add click handler to individual cells to stop propagation
                      // for elements that should not trigger row navigation.
                      onClick={isLink ? stopPropagationWrapper : undefined}
                    >
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}