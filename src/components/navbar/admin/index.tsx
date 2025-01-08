"use client";

import { SearchIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonIcon } from "@/components/button/button-icon";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <Box>
      <Flex justifyContent={"end"}>
        <Box
          display={"flex"}
          gap="10px"
          py={4}
          px={8}
          borderRadius={"12px"}
          bg="#ffffff"
        >
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
      </Flex>
    </Box>
  );
};

export default Navbar;
