import { Box, Text } from "@chakra-ui/react";
import React from "react";
interface IAuthCardProps {}

const AuthCard: React.FC<IAuthCardProps> = () => {
  return (
    <Box borderRadius="12px" padding="32px" bg="#3A2206" h="100%">
      <Text fontSize="32px" fontWeight={700} color="#EBE9E6">
        Take control of the market with the right tools abd accurate insight
      </Text>
    </Box>
  );
};

export default AuthCard;
