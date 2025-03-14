"use client";

import { ArrowDownIcon, SearchIcon } from "@/utils/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonIcon } from "@/components/button/button-icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <Box>
      <Flex
        justifyContent={"end"}
        bg="#FFF"
        px="16px"
        borderRadius={"12px"}
        mb={8}
        className="sticky z-10 top-0 py-[18.5px]"
      >
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

          <Menu>
            <MenuButton
              py={3}
              px={2}
              rightIcon={<ArrowDownIcon />}
              as={Button}
              border="1px solid #D1D5DB"
            >
              {/* Avatar display on button */}
              <Flex gap="4px" alignItems="center">
                <Box w="30px" h="30px" borderRadius="50%">
                  <Image
                    src="/assets/images/card-image.png"
                    width={30}
                    height={30}
                    alt="Avatar icon"
                    className="rounded-full object-cover w-full h-full"
                  />
                </Box>
                <Box textAlign={"start"}>
                  <Text color="#111928" fontWeight={600} fontSize="12px">
                    Jese Leos
                  </Text>
                  <Text color="#6B7280" fontWeight={400} fontSize="12px">
                    Admin
                  </Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList maxW={"60px"}>
              <MenuItem onClick={() => router.push(ROUTES.ADMIN.PROFILE)}>
                Settings
              </MenuItem>
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
