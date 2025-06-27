"use client";

import { useAdminSession } from "@/app/context/admin-context";
import { useUserSession } from "@/app/context/user-context";
import { IDropdown } from "@/interface/dropdown";
import { ArrowDownIcon, ArrowUpIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
interface IDropdownProps {
  header: string;
  itemList?: IDropdown[];
  mb?: number;
  count?: number;
  roleType: string;
}

const DropdownComponent: React.FC<IDropdownProps> = ({
  header,
  itemList,
  mb,
  count,
  roleType,
}) => {
  const {
    setIsOpen,
    setSelectedChannel,
    selectedChannel,
    setShowSavedMessages,
  } = roleType == "User" ? useUserSession() : useAdminSession();
  const [collapseCommunity, setCollapseCommunity] = useState<boolean>(false);

  return (
    <Box mb={mb} className="w-full cursor-pointer">
      <Box
        bg="#ffffff"
        color="#111928"
        border="1px solod #E5E7EB"
        borderRadius="8px"
        w={"100%"}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        onClick={() => setCollapseCommunity(!collapseCommunity)}
        px={5}
        py={4}
      >
        <Text fontWeight={500} fontSize="16px">
          {header}
          {count && (
            <span className="bg-[#F3F4F6] px-[10px] py-[2px] ms-[2px]">
              {count}
            </span>
          )}
        </Text>
        {collapseCommunity ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Box>
      {collapseCommunity && (
        <Box
          bg="white"
          boxShadow="lg"
          borderRadius="4px"
          borderTop="2px"
          borderColor={"#111928"}
        >
          {itemList?.map((item: any, index: number) => (
            <Box
              px={8}
              py={4}
              display="flex"
              justifyContent={"space-between"}
              key={index}
              onClick={() => {
                setShowSavedMessages("community");
                setSelectedChannel(item?.roomid);
                setIsOpen(false);
              }}
            >
              <Text
                className={`${
                  selectedChannel == item?.roomid ? "font-bold" : ""
                }`}
              >
                {item?.text}
              </Text>
              {item?.count && (
                <Box
                  bg="#C2BAB2"
                  borderRadius={"6px"}
                  px="10px"
                  py="2px"
                  color="#201303"
                >
                  {item?.count}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DropdownComponent;
