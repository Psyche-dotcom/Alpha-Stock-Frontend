"use client";

import { ButtonIcon } from "@/components/button/button-icon";
import { IButtonFilter2 } from "@/interface/button-filter";
import Profile from "@/parts/profile";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Watchlist from "./watchlist";
import Subscriptions from "./subscriptions";
import { useUserSession } from "@/app/context/user-context";

const Profiles: React.FC = () => {
  const [btnFilter, setBtnFilter] = useState<string>("profile");
  const filterBtn = [
    { text: "Profile", value: "profile" },
    {
      text: "Watchlist",
      value: "watchlist",
    },
    {
      text: "Subscription",
      value: "subscription",
    },
  ];

  const renderItem = () => {
    switch (btnFilter) {
      case "profile":
        return <Profile />;
      case "watchlist":
        return <Watchlist />;
      case "subscription":
        return <Subscriptions />;
      default:
        return <Profile />;
    }
  };
  const { setRedirectModalOpen } = useUserSession();
  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);
  return (
    <Box>
      <Box bg={"#fff"} p={4} borderRadius={"12px"} mb={4}>
        <Flex gap={2}>
          {filterBtn.map((filter: IButtonFilter2, index: number) => (
            <ButtonIcon
              key={index}
              text={filter?.text}
              variant={filter?.value === btnFilter ? "solid" : "ghost"}
              bg={filter?.value === btnFilter ? "#351F05" : ""}
              fontWeight={500}
              color={filter?.value === btnFilter ? "#ffffff" : "#6B7280"}
              fontSize="12px"
              p={filter?.value === btnFilter ? "12px 16px" : "0px"}
              onClick={() => setBtnFilter(filter?.value)}
            />
          ))}
        </Flex>
      </Box>
      <Box>{renderItem()}</Box>
    </Box>
  );
};
export default Profiles;
