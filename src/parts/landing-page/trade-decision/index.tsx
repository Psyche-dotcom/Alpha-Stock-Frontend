"use client";

import { LinkButton } from "@/components/button/link-button";
import { ROUTES } from "@/constants/routes";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  id: number;
  feature: string;
  year: {
    value: number;
    isProgressive: boolean;
  };
  years: {
    percent: number;
    isProgressive: boolean;
  };
}
const TradeDecision = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          FEATURE
        </Text>
      ),
      dataIndex: "feature",
      key: "id",
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          1 YEAR
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record: DataType) => {
        return (
          <Text
            fontWeight={400}
            fontSize={14}
            color={record?.year?.isProgressive ? "#0E9F6E" : "#E74694"}
          >
            {record?.year?.isProgressive ? "+" : "-"} {record?.year?.value}%
          </Text>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          5 YEARS
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record: DataType) => {
        return (
          <Text
            fontWeight={400}
            fontSize={14}
            color={record?.years?.isProgressive ? "#0E9F6E" : "#E74694"}
          >
            {record?.years?.isProgressive ? "+" : "-"}
            {record?.years?.percent}%
          </Text>
        );
      },
    },
  ];

  const dataSources = [
    {
      id: 1,
      feature: "GFAI",
      year: {
        value: 0.03,
        isProgressive: true,
      },
      years: {
        percent: 0.16,
        isProgressive: false,
      },
    },
    {
      id: 2,
      feature: "ASML",
      year: {
        value: 0.02,
        isProgressive: false,
      },
      years: {
        percent: 0.1,
        isProgressive: true,
      },
    },
    {
      id: 3,
      feature: "NVDIA",
      year: {
        value: 0.17,
        isProgressive: true,
      },
      years: {
        percent: 0.32,
        isProgressive: true,
      },
    },
    {
      id: 4,
      feature: "LMPG",
      year: {
        value: 0.17,
        isProgressive: true,
      },
      years: {
        percent: 0.01,
        isProgressive: true,
      },
    },
  ];

  return (
    <Flex
      gap={{ base: 4, lg: 8 }}
      h="100%"
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Box
        py={{ base: 5, sm: 6, md: 8, lg: "64px", xl: "84px" }}
        bg="#180E03"
        px={{ base: 5, sm: 6, md: 8 }}
        borderRadius="12px"
        w="100%"
      >
        <Text
          mb={4}
          fontWeight={600}
          color="#EBE9E6"
          fontSize={{ base: "30px", sm: "36px", md: "48px", xl: "60px" }}
          lineHeight={{ base: "43.2px", md: "50px", lg: "59px" }}
        >
          Make informed trade decisions after analysing your ROI
        </Text>
        <Text
          fontWeight={400}
          fontSize={{ md: 16, lg: 18 }}
          color="#C2BAB2"
          mb={4}
        >
          Using our stock analysis system, you can now predict your return on
          investment on any stock in your portfolio for better investments.
        </Text>
        <LinkButton
          href={ROUTES.AUTH.SIGNUP}
          text="Get Started"
          variant="solid"
          bg="#EBE9E6"
          p="12px 20px"
          color="#351F05"
          fontWeight={500}
          w={"fit-content"}
        />
      </Box>
      <Box
        bg="#A4998C"
        pt={{ base: 4, sm: 6, md: 8 }}
        borderRadius={"12px"}
        ps={8}
        border="1px solid #351F05"
        w="100%"
        display={"flex"}
        alignItems={"end"}
        h={"auto"}
      >
        <Table
          className="custom-table w-full"
          dataSource={dataSources}
          columns={columns}
          //   loading={isLoading}
          pagination={false}
        />
      </Box>
    </Flex>
  );
};

export default TradeDecision;
