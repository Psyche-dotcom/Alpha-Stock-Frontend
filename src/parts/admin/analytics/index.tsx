"use client";

import { useAdminSession } from "@/app/context/admin-context";
import { ButtonIcon } from "@/components/button/button-icon";
import AreaChartComponent from "@/components/charts/area-graph";
import { TableComponent } from "@/components/custom-table";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { useGetAllPayments } from "@/services/payment";
import { PaymentData } from "@/types";
import { formatDateTime } from "@/utils";
import { DownloadIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
interface DataType {
  id: number;
  username: string;
  fullname: string;
  status: string;
  country: string;
  subscription: string;
  transaction_date: string;
  type: string;
}

const TransactionsAnalytics = () => {
  const [filter, setFilter] = useState<number>(0);
  const { profileData } = useAdminSession();
  const [pageSize, setPageSize] = useState<number>(1);
  const {
    isPaymentLoading,
    paymentData,
    refetchPaymentData,
    setPaymentFilter,
  } = useGetAllPayments({ enabled: true });

  const cellRenderers = {
    name: (record: PaymentData) => (
      <p className="font-semibold text-xs text-[#111928]">
        {record?.firstName + " " + record?.lastName}
      </p>
    ),
    paymentId: (record: PaymentData) => (
      <p className="font-semibold text-xs text-[#111928]">{record?.id}</p>
    ),
    paymentType: (record: PaymentData) => (
      <p className="font-semibold text-xs text-[#111928]">
        {record?.paymentType}
      </p>
    ),

    completePaymentTime: (record: PaymentData) => (
      <p className="font-semibold text-center">
        {formatDateTime(record?.completePaymentTime || "0001-01-01T00:00:00")}
      </p>
    ),
    subscriptionTypeName: (record: PaymentData) => (
      <p className="font-semibold text-center">
        {record?.subscriptionTypeName}
      </p>
    ),

    amount: (record: PaymentData) => (
      <p className="font-semibold text-center">{record?.amount}</p>
    ),

    paymentStatus: (record: PaymentData) => (
      <Text py="2px" px={"10px"} w="fit-content" borderRadius={"8px"}>
        {record?.paymentStatus}
      </Text>
    ),
    action: () => (
      <Box>
        <DownloadIcon />
      </Box>
    ),
  };

  const columnOrder: (keyof PaymentData)[] = [
    "name",
    "paymentId",
    "paymentType",
    "amount",
    "completePaymentTime",
    "subscriptionTypeName",
    "paymentStatus",
    "action",
  ];

  const columnLabels = {
    name: "Name",
    paymentId: "Payment Id",
    amount: "Amount",
    paymentType: "Payment Type",
    datePaid: "Date Paid",
    subscriptionTypeName: "Subscription Type",
    paymentStatus: "Payment Status",
    downloadInvoice: "Doenload Invoice",
  };

  const filterBtnList = [
    {
      id: 1,
      text: "All",
      value: 0,
    },
    {
      id: 2,
      text: "Successful",
      value: 1,
    },

    {
      id: 3,
      text: "Failed",
      value: 2,
    },
  ];

  const onPageChange = (page: number) => {
    setPageSize(page);
  };

  useEffect(() => {
    if (profileData) {
      setPaymentFilter({
        perPageSize: 10,
        pageNumber: pageSize,
        user_id: profileData?.result?.id,
      });
    }
  }, [pageSize, profileData]);

  return (
    <Box>
      <AreaChartComponent />
      <Box bg="#fff" mt={5} pt={4} borderRadius={"12px"}>
        {/* <div className="flex gap-3 bg-white rounded-md px-3 mb-4">
          {filterBtnList.map((_, index: number) => (
            <Button
              variant={_?.value === filter ? "secondary" : "ghost"}
              key={index}
              btnText={_?.text}
              onClick={() => setFilter(_?.value)}
              className={`font-medium text-sm ${
                _?.value === filter
                  ? "bg-[#351F05] text-white py-2 px-4"
                  : "p-0 text-[#6B7280]"
              }`}
            />
          ))}
        </div> */}
        {isPaymentLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <TableComponent<PaymentData>
              tableData={paymentData?.payments || []}
              cellRenderers={cellRenderers}
              columnOrder={columnOrder}
              columnLabels={columnLabels}
            />
            {paymentData?.totalPages > 0 && (
              <div className="px-5">
                <Pagination
                  currentPage={paymentData?.currentPage}
                  totalPages={paymentData?.totalPages || 0}
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

export default TransactionsAnalytics;
