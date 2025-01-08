import { IStock } from "@/interface/stock-view";
import { StockFallIcon, StockRiseIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
interface IStockProps {
  stock: IStock;
}

const StockCard: React.FC<IStockProps> = ({ stock }) => {
  return (
    <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={"13px"}
      >
        <Text color={"#111928"} fontSize={20} fontWeight={700}>
          {stock?.title}
        </Text>
        <Text color={"#6B7280"} fontSize={24} fontWeight={600}>
          {stock?.total}
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          color={stock?.isProgressive ? "#0E9F6E" : "#E74694"}
          fontSize={16}
          fontWeight={600}
        >
          {stock?.isProgressive ? "+" : "-"} {stock?.value}({stock?.percent})
        </Text>
        <Box>
          {stock?.isProgressive ? <StockRiseIcon /> : <StockFallIcon />}
        </Box>
      </Box>
    </Box>
  );
};
export default StockCard;
