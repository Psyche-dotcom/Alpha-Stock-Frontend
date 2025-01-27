"use client";

import { navbarList } from "@/constants";
import { BurgerIcon, CompanyIcon, SearchIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { LinkButton } from "../button/link-button";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonIcon } from "../button/button-icon";
import { ROUTES } from "@/constants/routes";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  return (
    <Box bg="#FFF" py="18.5px" px="16px" borderRadius={"12px"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={{ lg: "4rem", xl: "6rem" }}
      >
        <Link href={"/"} passHref>
          <CompanyIcon />
        </Link>
        <Box
          display={{ base: "none", lg: "flex" }}
          alignItems={"center"}
          gap={{ lg: "4rem", xl: "6rem" }}
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={{ lg: "4px", xl: "8px" }}
            me={"auto"}
          >
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <Box p={4}>{nav.title}</Box>
              </Link>
            ))}
          </Flex>
          <Box display="flex" gap={{ lg: "2rem", xl: "4rem" }}>
            <Box flex={1} display={"flex"} gap="10px">
              <InputGroup
                display={"flex"}
                alignItems={"center"}
                py="16px"
                h="42px"
              >
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
          </Box>
        </Box>
        <Box
          display={{ lg: "none" }}
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <BurgerIcon />
        </Box>
      </Flex>
      {showNavbar && (
        <Box
          display={{ base: "block", lg: "none" }}
          alignItems={"center"}
          gap={{ lg: "4rem", xl: "6rem" }}
          mt={2}
        >
          <Flex flexDir={"column"}>
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <Box p={2} fontSize={18} fontWeight={500}>
                  {nav.title}
                </Box>
              </Link>
            ))}
          </Flex>

          <Box flex={1} display={"flex"} gap="10px" mb={3}>
            <InputGroup
              display={"flex"}
              alignItems={"center"}
              py="16px"
              h="42px"
            >
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
          <Flex gap={"12px"} flexDir="column">
            <LinkButton
              href={ROUTES.AUTH.LOGIN}
              text="Login"
              variant="outline"
              color="#3A2206"
              p="12px 20px"
              border="1px solid #3A2206"
              fontWeight={500}
              w="fit-content"
            />
            <LinkButton
              href={ROUTES.AUTH.SIGNUP}
              text="Create Account"
              variant="solid"
              bg="#291804"
              p="12px 20px"
              color="#FFF"
              fontWeight={500}
              w="fit-content"
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
