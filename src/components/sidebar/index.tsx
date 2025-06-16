"use client";

import { sidebarList } from "@/constants";
import { ISidebar } from "@/interface/sidebar";
import { CompanyIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { LinkButton } from "../button/link-button";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const path = usePathname();

  const [collapseSidebar, setCollapseSidebar] = useState<boolean>(true);
  return (
    <Box
      bg="#ffffff"
      borderRadius={"8px"}
      py={5}
      px={3}
      h="100vh"
      overflowY={"auto"}
    >
      <Box mb={4} display="flex" justifyContent="center">
        <Image
          src="/assets/images/alpha-desktop.png"
          width={100}
          height={60}
          alt="Company logo"
          className="w-full"
        />
      </Box>
      <Flex flexDirection={"column"} gap="16px">
        {sidebarList.map((sidebar: ISidebar, index: number) => (
          <LinkButton
            text={sidebar.title}
            icon={sidebar.icon}
            href={sidebar.path}
            p={4}
            key={index}
            color={path === sidebar.path ? "#351F05" : "#6B7280"}
            fontWeight={500}
            gap={"8px"}
            variant="ghost"
            bg={path === sidebar.path ? "#EBE9E6" : ""}
            border={path === sidebar.path ? "1px solid #351F05" : ""}
            showText={collapseSidebar}
            w={"100%"}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
