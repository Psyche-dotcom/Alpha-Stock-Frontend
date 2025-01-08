"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import AreaChartComponent from "@/components/charts/area-graph";
import { ThreeDotsIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
interface DataType {
  id: number;
  username: string;
  fullname: string;
  status: string;
  country?: string;
  subscription?: string;
  date_registered?: string;
  date_joined?: string;
}

const Users = () => {
  const [filter, setFilter] = useState<string>("Failed");
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          USERNAME
        </Text>
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: (
        <Text fontWeight={400} fontSize={14}>
          FULL NAME
        </Text>
      ),
      dataIndex: "fullname",
      key: "fullname",
    },
    ...(filter === "Completed"
      ? [
          {
            title: (
              <Text fontWeight={400} fontSize={14}>
                COUNTRY
              </Text>
            ),
            dataIndex: "country",
            key: "country",
          },
        ]
      : []),
    ...(filter === "Completed"
      ? [
          {
            title: (
              <Text fontWeight={400} fontSize={14}>
                SUBSCRIPTION
              </Text>
            ),
            dataIndex: "subscription",
            key: "subscription",
          },
        ]
      : []),
    ...(filter === "Completed"
      ? [
          {
            title: (
              <Text fontWeight={400} fontSize={12}>
                DATE REGISTERED
              </Text>
            ),
            dataIndex: "date_registered",
            key: "date_registered",
          },
        ]
      : []),

    ...(filter !== "Completed"
      ? [
          {
            title: (
              <Text fontWeight={400} fontSize={12}>
                DATE JOINED
              </Text>
            ),
            dataIndex: "date_joined",
            key: "date_joined",
          },
        ]
      : []),

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
              status === "Completed"
                ? "#DEF7EC"
                : status === "Pending"
                ? "#FCE6C3"
                : status === "Not Started"
                ? "#D7E9FD"
                : "#FDE8E8"
            }
            w="fit-content"
            borderRadius={"8px"}
            color={
              status === "Completed"
                ? "#03543F"
                : status === "Pending"
                ? "#DB961E"
                : status === "Not Started"
                ? "#3090F8"
                : "#9B1C1C"
            }
          >
            {status}
          </Text>
        );
      },
    },
    ...(filter === "Completed"
      ? [
          {
            title: (
              <Text fontWeight={400} fontSize={12}>
                DATE JOINED
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
        ]
      : []),
  ];

  const dataSources = [
    {
      id: 1,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Premium",
      date_registered: "Apr 23 ,2021",
    },
    {
      id: 2,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Pending",
      date_joined: "Apr 23 ,2021",
    },
    {
      id: 3,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Failed",
      date_joined: "Apr 23 ,2021",
    },
    {
      id: 4,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Regular",
      date_registered: "Apr 23 ,2021",
    },
  ];
  const filterBtnList = [
    {
      id: 1,
      status: "Completed",
    },
    {
      id: 2,
      status: "Pending",
    },
    {
      id: 3,
      status: "Not Started",
    },
    {
      id: 4,
      status: "Failed",
    },
  ];
  return (
    <Box>
      <AreaChartComponent />
      <Flex
        mt={8}
        gap={4}
        bg="#fff"
        p="10px"
        borderRadius="8px"
        w="fit-content"
        mb={4}
      >
        {filterBtnList.map((filterBtn, index: number) => (
          <ButtonIcon
            key={index}
            text={filterBtn?.status}
            variant={filter === filterBtn?.status ? "solid" : "ghost"}
            bg={filter === filterBtn?.status ? "#351F05" : ""}
            fontWeight={500}
            color={filter === filterBtn?.status ? "#ffffff" : "#6B7280"}
            fontSize="18px"
            p={filter === filterBtn?.status ? "12px 16px" : "0px"}
          />
        ))}
      </Flex>
      <Table
        className="custom-table"
        dataSource={dataSources}
        columns={columns}
        //   loading={isLoading}
      />
    </Box>
  );
};

export default Users;
