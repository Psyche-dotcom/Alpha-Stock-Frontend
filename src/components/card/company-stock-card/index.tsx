import { ICompanyStockCard } from "@/interface/company-stock-card";
import { MetaIcon, StockFallIcon, StockRiseIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
interface ICompanyStockProp {
  company: ICompanyStockCard;
}

const CompanyStockCard: React.FC<ICompanyStockProp> = ({ company }) => {
  return (
    <Box border="1px solid #C2BAB2" px={4} py={2} borderRadius="12px">
      <Box display="flex" justifyContent={"space-between"}>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <MetaIcon />
          <h2 className="text-[20px] font-bold text-[#111928]">
            {company?.name}
          </h2>
        </Box>
        <Text color="#6B7280" fontSize="30px" fontWeight={600}>
          ${company?.amount}
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text color={company?.isProgressive ? "#0E9F6E" : "#E74694"}>
          %{company?.value}
        </Text>
        <Box>
          {company?.isProgressive ? <StockRiseIcon /> : <StockFallIcon />}
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyStockCard;
