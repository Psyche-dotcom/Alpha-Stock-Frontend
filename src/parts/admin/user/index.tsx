"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import AreaChartComponent from "@/components/charts/area-graph";
import { TableComponent } from "@/components/custom-table";
import { Pagination } from "@/components/ui/pagination";
import { useGetUsers } from "@/services/user";
import { UserData } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Users = () => {
  const [filter, setFilter] = useState<string>("Failed");
  const [pageSize, setPageSize] = useState<number>(1);
  const per_page_size = 10;
  const { getUsersData, getUsersIsLoading, refetchUsers, setUsersFilter } =
    useGetUsers({ enabled: true });

  const dataSources: UserData[] = [
    {
      id: 1,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Premium",
      date_joined: "Apr 23 ,2021",
      date_registered: "Apr 23 ,2021",
    },
    {
      id: 2,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Pending",
      date_joined: "Apr 23 ,2021",
      date_registered: "Apr 23 ,2021",
    },
    {
      id: 3,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Failed",
      date_joined: "Apr 23 ,2021",
      date_registered: "Apr 23 ,2021",
    },
    {
      id: 4,
      username: "@hungry_boss5",
      fullname: "Marcus Wright",
      status: "Completed",
      country: "USA",
      subscription: "Regular",
      date_joined: "Apr 23 ,2021",
      date_registered: "Apr 23 ,2021",
    },
  ];
  const cellRenderers = {
    fullname: (record: UserData) => (
      <div className="flex gap-2 items-center">
        <div className="h-6 w-6">
          <Image
            src={"/assets/images/card-image.png"}
            alt={"Iser image"}
            width={24}
            height={24}
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <p className="font-semibold text-xs text-[#111928]">
          {record?.fullname}
        </p>
      </div>
    ),
    username: (item: UserData) => (
      <p className="font-semibold text-center">{item?.username}</p>
    ),
    country: (item: UserData) => (
      <p className="font-semibold text-center">{item?.country}</p>
    ),
    subscription: (item: UserData) => (
      <p className="font-semibold text-center">{item?.subscription}</p>
    ),
    status: (item: UserData) => (
      <Text
        py="2px"
        px={"10px"}
        mx={"auto"}
        textAlign={"center"}
        bg={
          item.status === "Completed"
            ? "#DEF7EC"
            : item.status === "Pending"
            ? "#FCE6C3"
            : item.status === "Not Started"
            ? "#D7E9FD"
            : "#FDE8E8"
        }
        w="60%"
        borderRadius={"8px"}
        color={
          item.status === "Completed"
            ? "#03543F"
            : item.status === "Pending"
            ? "#DB961E"
            : item.status === "Not Started"
            ? "#3090F8"
            : "#9B1C1C"
        }
      >
        {item.status}
      </Text>
    ),
  };

  const columnOrder: (keyof UserData)[] = [
    "fullname",
    "username",
    "country",
    "subscription",
    "status",
  ];

  const columnLabels = {
    fullname: "Full Name",
    username: "Username",
    country: "Country",
    subscription: "Subscription",
    ststua: "Status",
  };

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

  useEffect(() => {
    const params = {
      sinceDate: "",
      name: "",
      filter: 0,
    };
    setUsersFilter({ params, per_page_size, page_number: pageSize });
  }, [pageSize]);

  const onPageChange = (page: number) => {
    setPageSize(page);
  };

  console.log(getUsersData);

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
      <TableComponent<UserData>
        tableData={dataSources}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
      />
      <div>
        <Pagination
          currentPage={pageSize}
          totalPages={getUsersData?.totalPages || 0}
          onPageChange={onPageChange}
        />
      </div>
    </Box>
  );
};

export default Users;
