import { ISubscription } from "@/types";
import { Box, Text } from "@chakra-ui/react";
interface IPlanProps {
  plan: ISubscription;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const PlanCard: React.FC<IPlanProps> = ({
  plan,
  selectedId,
  setSelectedId,
}) => {
  return (
    <Box
      p={6}
      bg={plan?.id === selectedId ? "#351F05" : "#fff"}
      borderRadius={"8px"}
      w={"100%"}
      onClick={() => setSelectedId(plan?.id || "")}
      cursor={"pointer"}
    >
      <Text
        fontWeight={500}
        fontSize="16px"
        color={plan?.id === selectedId ? "#F9FAFB" : "#111928"}
        mb={2}
      >
        {plan?.name}
      </Text>
      <Text
        fontWeight={700}
        fontSize="14px"
        color={plan?.id === selectedId ? "#F9FAFB" : "#111928"}
        mb={2}
      >
        ${plan?.amount}
      </Text>
      <Text
        fontWeight={500}
        fontSize="14px"
        color={plan?.id === selectedId ? "#D1D5DB" : "#351F05"}
      >
        {plan?.id === selectedId ? "Selected" : "Upgrade Plan"}
      </Text>
    </Box>
  );
};

export default PlanCard;
