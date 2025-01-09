"use client";

import { ThreeDotsIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
interface DataType {
  id: number;
  publisher: string;
  title: string;
  status: string;
  readers?: string;
  published_date?: string;
}

const BlogManager = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          PUBLISHERS
        </Text>
      ),
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          TITLE
        </Text>
      ),
      dataIndex: "title",
      key: "title",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          READERS
        </Text>
      ),
      dataIndex: "readers",
      key: "readers",
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          PUBLISHED ON
        </Text>
      ),
      dataIndex: "published_date",
      key: "published_date",
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
            {status}
          </Text>
        );
      },
    },

    {
      title: (
        <Text fontWeight={400} fontSize={12}>
          ACTION
        </Text>
      ),
      dataIndex: "id",
      key: "id",
      render: () => {
        return (
          <Box>
            <ThreeDotsIcon />
          </Box>
        );
      },
    },
  ];

  const dataSources = [
    {
      id: 1,
      publisher: "@hungry_boss5",
      title:
        "What do members of congress know about these stocks that we don’t?",
      status: "Pending",
      readers: "USA",
      published_date: "Apr 23 ,2021",
    },
    {
      id: 2,
      publisher: "@hungry_boss5",
      title:
        "What do members of congress know about these stocks that we don’t?",
      status: "Archived",
      readers: "USA",
      published_date: "Apr 23 ,2021",
    },
    {
      id: 3,
      publisher: "@hungry_boss5",
      title:
        "What do members of congress know about these stocks that we don’t?",
      status: "Published",
      readers: "USA",
      published_date: "Apr 23 ,2021",
    },
    {
      id: 4,
      publisher: "@hungry_boss5",
      title:
        "What do members of congress know about these stocks that we don’t?",
      status: "Pending",
      readers: "USA",
      published_date: "Apr 23 ,2021",
    },
  ];

  return (
    <Box bg="#fff" borderRadius={"8px"} pt={4} mt={4}>
      <Box m={4} mt={0}>
        <Text fontWeight={600} fontSize="18px" color="#111928">
          Articles
        </Text>
      </Box>
      <Table
        className="custom-table"
        dataSource={dataSources}
        columns={columns}
        //   loading={isLoading}
      />
    </Box>
  );
};

export default BlogManager;
