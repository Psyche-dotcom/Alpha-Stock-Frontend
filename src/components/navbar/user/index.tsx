"use client";

import { userNavbarList } from "@/constants";
import { SearchIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { ButtonIcon } from "@/components/button/button-icon";
import Image from "next/image";

const UserNavbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <Box bg="#FFF" py="18.5px" px="16px" borderRadius={"12px"} mb={8}>
      <Flex alignItems={"center"} justifyContent="space-between">
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"8px"}
          me={"auto"}
        >
          {userNavbarList.map((nav, index) => (
            <Link href={nav.path} key={index} passHref>
              <Box p={2} fontSize="14px" fontWeight={500}>
                {nav.title}
              </Box>
            </Link>
          ))}
        </Flex>
        <Box w={"611px"} gap={8} display={"flex"} alignItems="center">
          <Box display={"flex"} gap="10px" flex={1}>
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

          <Flex gap={"8px"} alignItems={"center"}>
            <Box w={"48px"} h={"48px"} borderRadius={"50%"}>
              <Image
                src="/assets/images/card-image.png"
                width={48}
                height={48}
                alt="Avatar icon"
                className="rounded-full object-cover w-full h-full"
              />
            </Box>
            <Box>
              <Text color={"#111928"} fontWeight={600} fontSize={"16px"}>
                Jese Leos
              </Text>
              <Text color={"#6B7280"} fontWeight={400} fontSize={"14px"}>
                320 PTS
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserNavbar;
