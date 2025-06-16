import { Skeleton } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-lg p-5">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>
              <Skeleton className="h-6 w-24 mb-2 rounded-md" />
            </th>
            <th>
              <Skeleton className="h-6 w-24 mb-2 rounded-md" />
            </th>
            <th>
              <Skeleton className="h-6 w-24 mb-2 rounded-md" />
            </th>
            <th>
              <Skeleton className="h-6 w-24 mb-2 rounded-md" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-t">
              <td>
                <Skeleton className="h-6 w-full mb-2 rounded-md flex w-full gap-5" />
              </td>
              <td>
                <Skeleton className="h-6 w-full mb-2 rounded-md flex w-full gap-5" />
              </td>
              <td>
                <Skeleton className="h-6 w-full mb-2 rounded-md flex w-full gap-5" />
              </td>
              <td>
                <Skeleton className="h-6 w-full mb-2 rounded-md flex w-full gap-5" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
