"use client";

import AreaChartComponent from "@/components/charts/area-graph";
import { TableComponent } from "@/components/custom-table";
import DeleteContent from "@/components/delete-content";
import { DateFilter } from "@/components/filter/date-filter";
import { InputFilter } from "@/components/filter/input-filter";
import SuspendContent from "@/components/suspend-content";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import UserDetails from "@/components/user-content";
import { useDeleteUser, useGetUsers, useGetUsersStats } from "@/services/user";
import { UserData } from "@/types";
import { DeleteIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { EditIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Users = () => {
  const [filter, setFilter] = useState<number>(0);
  const [date, setDate] = useState<Date | any>();
  const [name, setName] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(1);
  const [option, setOption] = useState<string>("suspend");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | undefined>(undefined);

  const per_page_size = 10;
  const { getUsersData, getUsersIsLoading, refetchUsers, setUsersFilter } =
    useGetUsers({ enabled: true });
  const { deleteUserData, deleteUserIsLoading, deleteUserPayload } =
    useDeleteUser((res: any) => {
      refetchUsers();
      setIsOpen(false);
    });
  const { isUserStatsFetching, userStatsData, isUserStatsLoading } =
    useGetUsersStats();

  const cellRenderers = {
    fullname: (record: UserData) => (
      <div className="flex gap-2 items-center">
        <div className="h-6 w-6">
          <Image
            src={record?.profilePicture || "/assets/images/card-image.png"}
            alt={"Iser image"}
            width={24}
            height={24}
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <p className="font-semibold text-xs text-[#111928]">
          {record?.firstName + " " + record?.lastName}
        </p>
      </div>
    ),

    email: (record: UserData) => (
      <p className="font-semibold text-center">{record?.email}</p>
    ),

    activeSubcriptionName: (record: UserData) => (
      <p className="font-semibold text-center">
        {record?.activeSubcriptionName}
      </p>
    ),

    isSubActive: (record: UserData) => (
      <Text
        py="2px"
        px={"10px"}
        mx={"auto"}
        textAlign={"center"}
        bg={record?.isSubActive ? "#DEF7EC" : "#FDE8E8"}
        w="60%"
        borderRadius={"8px"}
        color={record.isSubActive ? "#03543F" : "#9B1C1C"}
      >
        {record.isSubActive ? "Active" : "Inactive"}
      </Text>
    ),
    isEmailConfirmed: (record: UserData) => (
      <Text
        py="2px"
        px={"10px"}
        mx={"auto"}
        textAlign={"center"}
        bg={record.isEmailConfirmed ? "#DEF7EC" : "#FDE8E8"}
        borderRadius={"8px"}
        color={record.isEmailConfirmed ? "#03543F" : "#9B1C1C"}
      >
        {record.isEmailConfirmed ? "Active" : "Inactive"}
      </Text>
    ),
    action: (record: UserData) => (
      <div className="flex items-center gap-3">
        <div
          onClick={() => {
            setOption("view");
            setUser(record);
            setIsOpen(true);
          }}
        >
          <EyeIcon size={20} />
        </div>
        <div
          onClick={() => {
            setOption("suspend");
            setUser(record);
            setIsOpen(true);
          }}
        >
          <EditIcon size={20} />
        </div>
        <div
          onClick={() => {
            setOption("delete");
            setUser(record);
            setIsOpen(true);
          }}
        >
          <DeleteIcon />
        </div>
      </div>
    ),
  };

  const columnOrder: (keyof UserData)[] = [
    "fullname",
    "email",
    "activeSubcriptionName",
    "isSubActive",
    "isEmailConfirmed",
    "action",
  ];

  const columnLabels = {
    fullname: "Full Name",
    email: "Email",
    activeSubcriptionName: "Subscription Name",
    isSubActive: "Subscription Status",
    isEmailConfirmed: "Status",
    action: "Action",
  };

  const filterBtnList = [
    {
      id: 0,
      status: "All",
    },
    {
      id: 1,
      status: "Active",
    },
    {
      id: 2,
      status: "Unverified",
    },
    {
      id: 3,
      status: "Suspended",
    },
  ];

  useEffect(() => {
    const params = {
      sinceDate: (date && date.toISOString().split("T")[0]) || "",
      name,
      filter,
    };
    setUsersFilter({ params, per_page_size, page_number: pageSize });
  }, [pageSize, filter, name, date]);

  const onPageChange = (page: number) => {
    setPageSize(page);
  };

  const handleDelete = () => {
    deleteUserPayload(user?.email);
  };

  const renderItem = () => {
    switch (option) {
      case "suspend":
        return (
          <SuspendContent
            email={user?.email || ""}
            username={user?.userName || ""}
            isSuspended={user?.isSuspendUser || false}
            setOpen={() => setIsOpen(false)}
            handleSuccess={refetchUsers}
          />
        );
      case "delete":
        return (
          <DeleteContent
            setOpen={() => setIsOpen(false)}
            header="Delete User"
            description={`Are you sure you want to delete ${
              user?.userName || ""
            }?`}
            handleDelete={handleDelete}
            loading={deleteUserIsLoading}
          />
        );
      case "view":
        return <UserDetails user={user} setClose={() => setIsOpen(false)} />;
      default:
        return (
          <SuspendContent
            email={user?.email || ""}
            username={user?.userName || ""}
            isSuspended={user?.isSuspendUser || false}
            setOpen={() => setIsOpen(false)}
            handleSuccess={refetchUsers}
          />
        );
    }
  };

  return (
    <Box>
      <AreaChartComponent data={userStatsData?.userStatistics || []} />
      <div className="flex items-center gap-4 my-5">
        <div className="flex gap-2 bg-white rounded-md px-3 py-1">
          {filterBtnList.map((_, index: number) => (
            <Button
              variant={_?.id === filter ? "secondary" : "ghost"}
              key={index}
              btnText={_?.status}
              onClick={() => setFilter(_?.id)}
              className={`font-medium text-xs ${
                _?.id === filter
                  ? "bg-[#351F05] text-white py-2 px-4"
                  : "p-0 text-[#6B7280]"
              }`}
            />
          ))}
        </div>
        <InputFilter
          setQuery={setName}
          placeholder="Search by name, username"
        />
        <DateFilter date={date} setDate={setDate} />
      </div>
      {getUsersIsLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <TableComponent<UserData>
            tableData={getUsersData?.user || []}
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
        </>
      )}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent
          className={`${
            option === "view"
              ? "right-0 p-8 w-[35.56rem] h-screen overflow-y-auto"
              : "left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]"
          } bg-white p-[2rem] pt-[3.5rem]`}
        >
          {renderItem()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Users;
