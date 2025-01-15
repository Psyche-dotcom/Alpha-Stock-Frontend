"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { DownloadIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useState } from "react";
interface DataType {
  id: number;
  name: string;
  plan: string;
  status: string;
  duration: number;
  amount: number;
  date_paid: string;
}

const Subscriptions = () => {
  const [filter, setFilter] = useState<string>("all");
  const dataSources = [
    {
      id: 1,
      name: "OVIA",
      plan: "Free",
      status: "Completed",
      date_paid: "Apr 23 ,2021",
      duration: 2,
      amount: 12.78,
    },
    {
      id: 2,
      name: "OVIA",
      plan: "Standard",
      status: "Failed",
      date_paid: "Apr 23 ,2021",
      duration: 2,
      amount: 12.78,
    },
    {
      id: 3,
      name: "OVIA",
      plan: "Free",
      status: "Completed",
      date_paid: "Apr 23 ,2021",
      duration: 2,
      amount: 12.78,
    },
    {
      id: 4,
      name: "OVIA",
      plan: "Free",
      status: "Completed",
      date_paid: "Apr 23 ,2021",
      duration: 2,
      amount: 12.78,
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          INVOICE
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record) => {
        return (
          <Flex gap={2} alignItems={"center"}>
            <Box h="24px" w="24px">
              <Image
                src={"/assets/images/card-image.png"}
                alt={"CPmany picture"}
                width={24}
                height={24}
                className="rounded-full object-cover h-full w-full"
              />
            </Box>
            <Text fontWeight={600} fontSize={12} color="#111928">
              {record.name}
            </Text>
          </Flex>
        );
      },
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          PLAN
        </Text>
      ),
      dataIndex: "plan",
      key: "plan",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          DATE PAID
        </Text>
      ),
      dataIndex: "date_paid",
      key: "date_paid",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          DURATION(MONTHS)
        </Text>
      ),
      dataIndex: "duration",
      key: "duration",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          AMOUNT PAYED($)
        </Text>
      ),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          STATUS
        </Text>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Text
            py="2px"
            px={"10px"}
            bg={status === "Completed" ? "#DEF7EC" : "#FDE8E8"}
            w="fit-content"
            borderRadius={"8px"}
            color={status === "Completed" ? "#03543F" : "#9B1C1C"}
          >
            {status}
          </Text>
        );
      },
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          DOWNLOAD INVOICE
        </Text>
      ),
      dataIndex: "id",
      key: "id",
      render: () => {
        return (
          <Box>
            <DownloadIcon />
          </Box>
        );
      },
    },
  ];

  const filterBtnList = [
    {
      id: 1,
      text: "All",
      value: "all",
    },
    {
      id: 2,
      text: "Successful",
      value: "successful",
    },

    {
      id: 3,
      text: "Failed",
      value: "failed",
    },
  ];

  return (
    <Box>
      <Flex mb={8} gap={4}>
        <Box borderRadius={"8px"} bg="#fff" overflow={"hidden"}>
          <Text px={6} py={4} color="#351F05" fontWeight={600} fontSize={16}>
            Subscription Information
          </Text>
          <Box p={6} bg={"#351F05"}>
            <Text color="#fff" fontWeight={600} fontSize={24} mb={2}>
              Billing Information
            </Text>
            <Text color="#fff" fontWeight={600} fontSize={24} mb={2}>
              Expires on 27th March, 2025
            </Text>
            <Flex gap={"16px"} alignItems={"center"}>
              <ButtonIcon
                text="Change Plan"
                variant="outline"
                color="#fff"
                p="10px 20px"
                border="1px solid #fff"
                fontWeight={500}
              />
              <ButtonIcon
                text="Create Account"
                variant="solid"
                bg="#fff"
                p="10px 20px"
                color="#291804"
                fontWeight={500}
              />
            </Flex>
          </Box>
        </Box>
        <Box borderRadius={"8px"} bg="#fff" overflow={"hidden"}>
          <Text px={6} py={4} color="#351F05" fontWeight={600} fontSize={16}>
            Billing Information
          </Text>
          <Box p={6} bg={"#351F05"}>
            <Flex mb={5} gap={1}>
              <Text
                py="22.9px"
                px="9px"
                bg="#fff"
                borderRadius={"8px"}
                color="#351F05"
              >
                VISA
              </Text>
              <Box>
                <Text color="#fff" fontWeight={600} fontSize={24} mb={2}>
                  **** **** **** 8930
                </Text>
                <Text color="#fff" fontWeight={600} fontSize={16}>
                  Expires Sept, 2027
                </Text>
              </Box>
            </Flex>
            <ButtonIcon
              text="Edit Payment Method"
              variant="solid"
              bg="#fff"
              p="10px 20px"
              color="#291804"
              fontWeight={500}
              w="100%"
            />
          </Box>
        </Box>
      </Flex>
      <Box bg="#fff" pt={4} borderRadius={"12px"}>
        <Box px={4}>
          <Flex w="fit-content" mb={4}>
            {filterBtnList.map((filterBtn, index: number) => (
              <ButtonIcon
                key={index}
                text={filterBtn?.text}
                variant={filter === filterBtn?.value ? "solid" : "ghost"}
                bg={filter === filterBtn?.value ? "#351F05" : ""}
                fontWeight={500}
                color={filter === filterBtn?.value ? "#ffffff" : "#6B7280"}
                fontSize="14px"
                p={"12px"}
                onClick={() => setFilter(filterBtn.value)}
              />
            ))}
          </Flex>
        </Box>
        <Table
          className="custom-table"
          dataSource={dataSources}
          columns={columns}
          //   loading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Subscriptions;
