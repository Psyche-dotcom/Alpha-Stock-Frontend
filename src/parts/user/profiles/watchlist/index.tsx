import WatchlistCard from "@/components/card/watchlist-card";
import { CompanyStockList } from "@/constants";
import { ICompanyStockCard } from "@/interface/company-stock-card";
import { Box, Flex } from "@chakra-ui/react";

const Watchlist: React.FC = () => {
  return (
    <Flex wrap="wrap" gap={4} bg="#fff" p={4} borderRadius={"12px"}>
      {CompanyStockList.map((company: ICompanyStockCard, index: number) => (
        <Box
          key={index}
          flexBasis="calc(25% - 1rem)"
          maxWidth="calc(25% - 1rem)"
          flexGrow={1}
        >
          <WatchlistCard watchlist={company} />
        </Box>
      ))}
    </Flex>
  );
};

export default Watchlist;
