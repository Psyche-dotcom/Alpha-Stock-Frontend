import { ICompanyStockCard } from "@/interface/company-stock-card";
import {
  AlarmIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DeletePreferenceIcon,
  MetaIcon,
  StockFallIcon,
  StockRiseIcon,
} from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
interface IWatchlistProp {
  watchlist: ICompanyStockCard;
  handlePreference: () => void;
  handleDelete: () => void;
}

const WatchlistCard: React.FC<IWatchlistProp> = ({
  watchlist,
  handleDelete,
  handlePreference,
}) => {
  return (
    <Box border="1px solid #C2BAB2" px={4} py={2} borderRadius="12px" bg="#fff">
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4}
      >
        <Text color={watchlist?.isProgressive ? "#0E9F6E" : "#E74694"}>
          %{watchlist?.value}
        </Text>
        <Box>
          {watchlist?.isProgressive ? <StockRiseIcon /> : <StockFallIcon />}
        </Box>
      </Box>
      <Box display="flex" justifyContent={"space-between"} mb={4}>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <MetaIcon />
          <h2 className="text-[20px] font-bold text-[#111928]">
            {watchlist?.name}
          </h2>
        </Box>
        <Text color="#6B7280" fontSize="30px" fontWeight={600}>
          ${watchlist?.amount}
        </Text>
      </Box>
      <Box display="flex" justifyContent={"space-between"} mb={4}>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <ArrowUpIcon />
          <h2 className="text-base font-semibold text-[#6B7280]">$180.90</h2>
        </Box>
        <Box className="flex items-center gap-[10px] mb-2.5">
          <ArrowDownIcon />
          <h2 className="text-base font-semibold text-[#6B7280]">$180.90</h2>
        </Box>
      </Box>
      <Box display="flex" justifyContent={"space-between"}>
        <Box
          className="flex items-center gap-[10px] mb-2.5 cursor-pointer"
          onClick={handlePreference}
        >
          <AlarmIcon />
          <h2 className="text-base font-semibold text-[#111928]">
            Edit Preferences
          </h2>
        </Box>
        <Box onClick={handleDelete} className="cursor-pointer">
          <DeletePreferenceIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default WatchlistCard;
