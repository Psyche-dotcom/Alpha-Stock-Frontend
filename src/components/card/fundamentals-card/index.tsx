"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ActiveIcon, InactiveIcon } from "@/utils/icons";

// Assuming IFundamentalCard is defined in "@/interface/fundamental-card"
interface IFundamentalCard {
  header: string;
  amount: string | number;
  isActive: boolean;
}

interface IFundamentalProp {
  fundamental: IFundamentalCard;
  // Added onCardClick prop to handle the click event
  onCardClick: (fundamental: IFundamentalCard) => void;
}

const FundamentalsCard: React.FC<IFundamentalProp> = ({ fundamental, onCardClick }) => {
  return (
    <Box
      px={4}
      py={2}
      borderRadius="12px"
      bg="#fff"
      minHeight="100px" // Minimum height for the entire card
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxShadow="md" // Added a subtle shadow for better visual separation
      className="cursor-pointer hover:shadow-lg transition-shadow" // Added Tailwind classes for cursor and hover effect
      onClick={() => onCardClick(fundamental)} // Added onClick handler
    >
      <h2 className="text-base font-medium text-[#111928] mb-2">
        {fundamental?.header}
      </h2>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text color="#111928" fontWeight={700}>
          {fundamental?.amount}
        </Text>
        <Box>{fundamental?.isActive ? <ActiveIcon /> : <InactiveIcon />}</Box>
      </Box>
    </Box>
  );
};

export default FundamentalsCard;
