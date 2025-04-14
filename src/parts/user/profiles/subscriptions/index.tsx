"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DownloadIcon } from "@/utils/icons";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditCard from "./edit-card";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { PaymentData } from "@/types";
import { TableComponent } from "@/components/custom-table";
import { Pagination } from "@/components/ui/pagination";
import { useGetPayment } from "@/services/payment";
import { useUserSession } from "@/app/context/user-context";
import { formatDateTime } from "@/utils";
import TableSkeleton from "@/components/table-skeleton";

const Subscriptions = () => {
  const { profileData } = useUserSession();
  const [filter, setFilter] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [option, setOption] = useState<string>("edit");
  const [pageSize, setPageSize] = useState<number>(1);
  const {
    isPaymentLoading,
    paymentData,
    refetchPaymentData,
    setPaymentFilter,
  } = useGetPayment({ enabled: true });

  const renderItem = () => {
    switch (option) {
      case "edit":
        return <EditCard />;
      default:
        return <EditCard />;
    }
  };

  const cellRenderers = {
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
    "paymentId",
    "paymentType",
    "amount",
    "completePaymentTime",
    "subscriptionTypeName",
    "paymentStatus",
    "action",
  ];

  const columnLabels = {
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
      <Grid mb={8} gap={4} gridTemplateColumns={"repeat(3, 1fr)"}>
        <Box borderRadius={"8px"} bg="#fff" overflow={"hidden"}>
          <Text px={6} py={4} color="#351F05" fontWeight={600} fontSize={16}>
            Subscription Information
          </Text>
          <Box p={6} bg={"#351F05"}>
            <Text color="#fff" fontWeight={600} fontSize={24} mb={2}>
              {profileData?.result?.activeSubcriptionName || "Free"} Plan
            </Text>
            <Text color="#fff" fontWeight={600} fontSize={24} mb={2}>
              Expires on 27th March, 2025
            </Text>
            <Flex gap={"16px"} alignItems={"center"}>
              <Link
                href={ROUTES.USER.PLANS}
                className="border border-solid py-[10px] px-5 font-medium text-white rounded-md"
              >
                Change Plan
              </Link>
            </Flex>
          </Box>
        </Box>
      </Grid>
      <Box bg="#fff" pt={4} borderRadius={"12px"}>
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
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
          {renderItem()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Subscriptions;
