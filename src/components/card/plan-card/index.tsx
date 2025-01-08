import { IPlan } from "@/interface/plan";
import { Box, Text } from "@chakra-ui/react";
interface IPlanProps {
  plan: IPlan;
}

const PlanCard: React.FC<IPlanProps> = ({ plan }) => {
  return (
    <Box
      p={6}
      bg={plan?.isSelected ? "#351F05" : "#fff"}
      borderRadius={"8px"}
      w={223}
    >
      <Text
        fontWeight={500}
        fontSize="16px"
        color={plan?.isSelected ? "#F9FAFB" : "#111928"}
        mb={2}
      >
        {plan?.header}
      </Text>
      <Text
        fontWeight={700}
        fontSize="14px"
        color={plan?.isSelected ? "#F9FAFB" : "#111928"}
        mb={2}
      >
        {plan?.price}
      </Text>
      <Text
        fontWeight={500}
        fontSize="14px"
        color={plan?.isSelected ? "#D1D5DB" : "#351F05"}
      >
        {plan?.isSelected ? "Selected" : "Upgrade Plan"}
      </Text>
    </Box>
  );
};

export default PlanCard;
