import HeaderCard from "@/components/card/header-card";
import StockCard from "@/components/card/stock-card";
import ViewCard from "@/components/card/view-card";
import { marketList, stockList, trendingList } from "@/constants";
import { ICardView } from "@/interface/card-view";
import { IStock } from "@/interface/stock-view";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import MarketMove from "../market-move";
import TradeDecision from "../trade-decision";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LinkButton } from "@/components/button/link-button";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";

const Home = () => {
  return (
    <Box>
      <header>
        <Navbar />
      </header>
      <Box mt={4} display="flex" gap={3}>
        <LinkButton
          href={ROUTES.ADMIN.USERS}
          text="Admin Page"
          variant="outline"
          color="#3A2206"
          p="12px 20px"
          border="1px solid #3A2206"
          fontWeight={500}
          w="fit-content"
        />
        <LinkButton
          href={ROUTES.USER.COMPANYINFO}
          text="User Page"
          variant="outline"
          color="#3A2206"
          p="12px 20px"
          border="1px solid #3A2206"
          fontWeight={500}
          w="fit-content"
        />
      </Box>
      <Flex
        gap={{ base: 4, md: 8 }}
        py={{ base: 4, md: 8 }}
        mb={4}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box
          borderRadius={12}
          p={8}
          w="100%"
          bg="#FFFFFF"
          display="flex"
          alignItems={"center"}
          h="auto"
        >
          <Box w="100%">
            <Text
              mb={4}
              fontWeight={700}
              fontSize={{ base: "30px", sm: "36px", md: "48px", xl: "60px" }}
              color="#180E03"
              lineHeight={{ base: "43.2px", md: "50px", lg: "59px" }}
            >
              Learn, observe and move with the market.
            </Text>
            <Text
              fontWeight={400}
              fontSize={{ md: 16, lg: 18 }}
              color="#6B7280"
            >
              Whether you’re a seasoned investor or just starting out, our
              platform provides you with comprehensive tools and resources.
              Explore stock trends, get personalized trading insights, and
              access a wealth of educational content designed to help you make
              informed decisions
            </Text>
          </Box>
        </Box>
        <Box w="100%" borderRadius={"12px"} h="auto">
          <Image
            src="/assets/images/card-image.png"
            className="object-cover rounded-[12px] w-full h-full"
            width={716}
            height={546}
            alt="Random snap"
          />
        </Box>
      </Flex>
      <Grid
        gap={{ base: 2, md: 4 }}
        mb={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
        templateColumns={{
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {stockList.map((stock: IStock, index: number) => (
          <GridItem key={index}>
            <StockCard stock={stock} />
          </GridItem>
        ))}
      </Grid>
      <Box mb={16}>
        <HeaderCard text="Trending Analysis" href="#" />
        <Grid
          gap={{ base: 2, md: 4 }}
          templateColumns={{
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          {trendingList.map((trend: ICardView, index: number) => (
            <GridItem>
              <ViewCard card={trend} />
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Box mb={16}>
        <HeaderCard text="Learn About The Market" href="#" />
        <Grid
          gap={4}
          templateColumns={{
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          {marketList.map((trend: ICardView, index: number) => (
            <GridItem key={index}>
              <ViewCard card={trend} />
            </GridItem>
          ))}
        </Grid>
      </Box>
      <HeaderCard
        text="Watch the market move in real time."
        linkText="Get started"
        href="#"
      />
      <MarketMove />
      <TradeDecision />
      <Footer />
    </Box>
  );
};
export default Home;
