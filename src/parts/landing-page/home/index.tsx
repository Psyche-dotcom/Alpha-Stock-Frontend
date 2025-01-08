import HeaderCard from "@/components/card/header-card";
import StockCard from "@/components/card/stock-card";
import ViewCard from "@/components/card/view-card";
import { marketList, stockList, trendingList } from "@/constants";
import { ICardView } from "@/interface/card-view";
import { IStock } from "@/interface/stock-view";
import { Box, Flex, Text } from "@chakra-ui/react";
import MarketMove from "../market-move";
import TradeDecision from "../trade-decision";

const Home = () => {
  return (
    <Box>
      <Flex gap={8} py={8} h={"75vh"} mb={4}>
        <Box
          borderRadius={12}
          p={8}
          w="100%"
          bg="#FFFFFF"
          display="flex"
          alignItems={"center"}
          h="100%"
        >
          <Box w="100%">
            <Text mb={4} fontWeight={700} fontSize={60} color="#180E03">
              Learn, observe and move with the market.
            </Text>
            <Text fontWeight={400} fontSize={18} color="#6B7280">
              Whether you’re a seasoned investor or just starting out, our
              platform provides you with comprehensive tools and resources.
              Explore stock trends, get personalized trading insights, and
              access a wealth of educational content designed to help you make
              informed decisions
            </Text>
          </Box>
        </Box>
        <Box
          bgImage={`url("/assets/images/card-image.png")`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          w="100%"
          borderRadius={"12px"}
        ></Box>
      </Flex>
      <Flex wrap="wrap" gap={4} mb={16}>
        {stockList.map((stock: IStock, index: number) => (
          <Box
            key={index}
            flexBasis="calc(25% - 1rem)"
            maxWidth="calc(25% - 1rem)"
            flexGrow={1}
          >
            <StockCard stock={stock} />
          </Box>
        ))}
      </Flex>
      <Box mb={16}>
        <HeaderCard text="Trending Analysis" href="#" />
        <Flex wrap="wrap" gap={4}>
          {trendingList.map((trend: ICardView, index: number) => (
            <Box
              key={index}
              flexBasis="calc(25% - 1rem)"
              maxWidth="calc(25% - 1rem)"
              flexGrow={1}
            >
              <ViewCard card={trend} />
            </Box>
          ))}
        </Flex>
      </Box>
      <Box mb={16}>
        <HeaderCard text="Learn About The Market" href="#" />
        <Flex wrap="wrap" gap={4}>
          {marketList.map((trend: ICardView, index: number) => (
            <Box
              key={index}
              flexBasis="calc(25% - 1rem)"
              maxWidth="calc(25% - 1rem)"
              flexGrow={1}
            >
              <ViewCard card={trend} />
            </Box>
          ))}
        </Flex>
      </Box>
      <HeaderCard
        text="Watch the market move in real time."
        linkText="Get started"
        href="#"
      />
      <MarketMove />
      <TradeDecision />
    </Box>
  );
};
export default Home;
