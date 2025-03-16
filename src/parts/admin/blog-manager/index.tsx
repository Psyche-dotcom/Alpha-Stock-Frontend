"use client";

import { LinkButton } from "@/components/button/link-button";
import { TableComponent } from "@/components/custom-table";
import { DateFilter } from "@/components/filter/date-filter";
import { InputFilter } from "@/components/filter/input-filter";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { ROUTES } from "@/constants/routes";
import { useGetBlogs } from "@/services/blog";
import { BlogData } from "@/types";
import { formatDateTime } from "@/utils";
import { ThreeDotsIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
interface DataType {
  id: number;
  publisher: string;
  title: string;
  status: string;
  readers?: string;
  published_date?: string;
}

const BlogManager = () => {
  const [blogsData, setBlogsData] = useState<any>([]);
  const [date, setDate] = useState<Date | any>();
  const [name, setName] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const { getBlogsData, getBlogsError, getBlogsIsLoading, getBlogsPayload } =
    useGetBlogs((res: any) => {});

  useEffect(() => {
    const payload = {
      pageNumber: pageSize,
      perPageSize: 10,
      category: "All",
      status: filterStatus,
      userId: "",
      sinceDate: date,
      search: name,
    };

    getBlogsPayload(payload);
  }, [pageSize, date, name, filterStatus]);

  useEffect(() => {
    if (getBlogsData?.result?.length > 0) {
      setBlogsData(getBlogsData);
    }
  }, [getBlogsData]);

  const cellRenderers = {
    publisherName: (record: BlogData) => (
      <p className="font-semibold text-xs text-[#111928]">
        {record?.publisherName}
      </p>
    ),
    title: (record: BlogData) => (
      <p className="font-semibold text-xs text-[#111928]">{record?.title}</p>
    ),
    createdOn: (record: BlogData) => (
      <p className="font-semibold text-center">
        {formatDateTime(record?.publishedDate || "0001-01-01T00:00:00")}
      </p>
    ),
    status: (record: BlogData) => (
      <Text
        py="2px"
        px={"10px"}
        bg={
          status === "Published"
            ? "#DEF7EC"
            : status === "Pending"
            ? "#FDF6B2"
            : "#F3F4F6"
        }
        w="fit-content"
        borderRadius={"8px"}
        color={
          status === "Published"
            ? "#03543F"
            : status === "Pending"
            ? "#723B13"
            : "#111928"
        }
      >
        {record?.status}
      </Text>
    ),
    action: () => (
      <Box>
        <ThreeDotsIcon />
      </Box>
    ),
  };

  const columnOrder: (keyof BlogData)[] = [
    "publisherName",
    "title",
    "createdOn",
    "status",
    "action",
  ];

  const columnLabels = {
    publisherName: "Publisher Name",
    title: "Title",
    createdOn: "Creaded On",
    status: "Status",
    action: "Action",
  };

  const onPageChange = (page: number) => {
    setPageSize(page);
  };

  const filterBtnList = [
    {
      status: "All",
    },
    {
      status: "Published",
    },
    {
      status: "Archived",
    },
    {
      status: "Decline",
    },
  ];

  return (
    <Box>
      <LinkButton
        href={ROUTES.ADMIN.CREATEBLOG}
        text="+ Create Blog"
        variant="outline"
        color="#3A2206"
        p="12px 20px"
        border="1px solid #3A2206"
        fontWeight={500}
        w={"fit-content"}
      />
      <Box bg="#fff" mt={6} borderRadius={"12px"}>
        <Box m={4} pt={4}>
          <Text fontWeight={600} fontSize="18px" color="#111928">
            Articles
          </Text>
        </Box>
        <div className="flex items-center gap-4 mt-5 pb-5">
          <div className="flex gap-3 bg-white rounded-md px-3 py-1">
            {filterBtnList.map((_, index: number) => (
              <Button
                variant={_?.status === filterStatus ? "secondary" : "ghost"}
                key={index}
                btnText={_?.status}
                onClick={() => setFilterStatus(_?.status)}
                className={`font-medium text-sm ${
                  _?.status === filterStatus
                    ? "bg-[#351F05] text-white py-2 px-4"
                    : "p-0 text-[#6B7280]"
                }`}
              />
            ))}
          </div>
          <InputFilter setQuery={setName} placeholder="Search by article" />
          <DateFilter date={date} setDate={setDate} />
        </div>
        {getBlogsIsLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <TableComponent<BlogData>
              tableData={getBlogsData?.result || []}
              cellRenderers={cellRenderers}
              columnOrder={columnOrder}
              columnLabels={columnLabels}
            />
            {blogsData?.totalPages > 0 && (
              <div className="px-5">
                <Pagination
                  currentPage={blogsData?.currentPage}
                  totalPages={blogsData?.totalPages || 0}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlogManager;
