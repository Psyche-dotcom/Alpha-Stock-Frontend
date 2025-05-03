import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils";

interface TableSkeletonProps {
  columns: any;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#FAFAFA]">
          <TableRow className="border-none">
            {columns.map((column: any, index: any) => (
              <TableHead
                key={column}
                className={cn(
                  "py-4 font-bold text-xs text-[#111827]",
                  index === 0 ? "pl-4" : ""
                )}
              >
                {capitalizeFirstLetter(column)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((_: any, colIndex: number) => (
                <TableCell
                  key={colIndex}
                  className={colIndex === 0 ? "pl-4" : ""}
                >
                  <Skeleton
                    className={`${
                      colIndex === 0 ? "w-[200px]" : "max-w-[120px]"
                    } h-8 w-full`}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
