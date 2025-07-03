import { IFundamentalCard } from "@/interface/fundamental-card";
import { ActiveIcon, InactiveIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
interface IFundamentalProp {
  fundamental: IFundamentalCard;
}

const FundamentalsCard: React.FC<IFundamentalProp> = ({ fundamental }) => {
  return (
    <Box
      px={4}
      py={2}
      borderRadius="12px"
      bg="#fff"
      minHeight="110px" // Minimum height for the entire card
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxShadow="md" // Added a subtle shadow for better visual separation
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
