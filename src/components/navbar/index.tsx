"use client";

import { navbarList } from "@/constants";
import { CompanyIcon, SearchIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { LinkButton } from "../button/link-button";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonIcon } from "../button/button-icon";
import { ROUTES } from "@/constants/routes";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <Box bg="#FFF" py="18.5px" px="16px" borderRadius={"12px"}>
      <Flex alignItems={"center"} gap={"103px"}>
        <Link href={"/"} passHref>
          <CompanyIcon />
        </Link>

        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"8px"}
          me={"auto"}
        >
          {navbarList.map((nav, index) => (
            <Link href={nav.path} key={index} passHref>
              <Box p={4}>{nav.title}</Box>
            </Link>
          ))}
        </Flex>

        <Box w={"100%"} display={"flex"} gap="10px">
          <InputGroup display={"flex"} alignItems={"center"} py="16px" h="42px">
            <InputLeftElement pointerEvents="none" p="12px 16px">
              <SearchIcon />
            </InputLeftElement>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              w="100%"
              h="42px"
              ps="42px"
              border={"1px solid #D1D5DB"}
              borderRadius="8px"
            />
          </InputGroup>
          <ButtonIcon
            icon={<SearchIcon color="#FFF" />}
            p="12px"
            variant="solid"
            bg="#351F05"
          />
        </Box>

        <Box>
          <Flex gap={"16px"} alignItems={"center"}>
            <LinkButton
              href={ROUTES.AUTH.LOGIN}
              text="Login"
              variant="outline"
              color="#3A2206"
              p="12px 20px"
              border="1px solid #3A2206"
              fontWeight={500}
            />
            <LinkButton
              href={ROUTES.AUTH.SIGNUP}
              text="Create Account"
              variant="solid"
              bg="#291804"
              p="12px 20px"
              color="#FFF"
              fontWeight={500}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
