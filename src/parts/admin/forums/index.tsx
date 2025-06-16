"use client";

import { CommunityData } from "@/types";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateForum from "./create-forum";
import EditForum from "./edit-forum";
import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import CreateCategory from "./create-category";
import { Card, CardContent } from "@/components/ui/card";
import { InputFilter } from "@/components/filter/input-filter";
import { useGetChannel } from "@/services/community";
const Forums: React.FC = () => {
  const [option, setOption] = useState<string>("create");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [tableData, setTableData] = useState<CommunityData[]>([]);
  const {
    getChannelData,
    getChannelIsLoading,
    setChannelFilter,
    refetchChannel,
  } = useGetChannel();
  const cellRenderers = {
    channelName: (record: CommunityData) => (
      <p className="font-semibold text-start">{record?.channelName}</p>
    ),
    category: (record: CommunityData) => (
      <p className="font-semibold text-center">{record?.category}</p>
    ),
    moderator: (record: CommunityData) => (
      <p className="font-semibold text-center">{record?.moderator}</p>
    ),
    action: (record: CommunityData) => (
      <div className="flex items-center gap-3 justify-center">
        <div
          onClick={() => {
            setOption("edit");
            setIsOpen(true);
          }}
        >
          <EditIcon size={20} />
        </div>
      </div>
    ),
  };

  useEffect(() => {
    const tableDataFUll: CommunityData[] = getChannelData?.map((item: any) => ({
      channelName: item?.name,
      category: item?.category?.name,
      moderator:
        item.createdByUser?.firstName + " " + item.createdByUser?.lastName,
    }));

    setTableData(tableDataFUll);
  }, [getChannelData]);

  const columnOrder: (keyof CommunityData)[] = [
    "channelName",
    "category",
    "moderator",
    "action",
  ];

  const columnLabels = {
    channelName: "Channel Name",
    category: "Category",
    moderator: "Moderator",
    action: "Action",
  };

  const renderItem = () => {
    switch (option) {
      case "create-channel":
        return <CreateForum />;
      case "create-category":
        return <CreateCategory setIsOpen={setIsOpen} />;
      case "edit":
        return <EditForum />;
      default:
        return <CreateForum />;
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            setOption("create-category");
            setIsOpen(true);
          }}
          className="font-semibold px-5"
        >
          Create Category
        </Button>
        <Button
          onClick={() => {
            setOption("create-channel");
            setIsOpen(true);
          }}
          variant={"outline"}
          className="border border-[#291804] font-semibold px-5"
        >
          Create Channel
        </Button>
      </div>
      <Card className="bg-white mt-4">
        <CardContent className="p-0 py-4">
          <div className="mb-4 mx-4">
            <InputFilter
              setQuery={setSearch}
              placeholder="Search by category, moderator"
            />
          </div>
          <TableComponent<CommunityData>
            tableData={tableData || []}
            cellRenderers={cellRenderers}
            columnOrder={columnOrder}
            columnLabels={columnLabels}
          />
        </CardContent>
      </Card>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-white p-[1.5rem] pt-[2rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              {option === "create-channel"
                ? "Create Channel"
                : option === "edit"
                ? "Edit Channel"
                : "Create Category"}
            </DialogTitle>
          </DialogHeader>
          {renderItem()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Forums;
