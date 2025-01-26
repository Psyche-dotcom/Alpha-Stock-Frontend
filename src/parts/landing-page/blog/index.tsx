import ViewCard from "@/components/card/view-card";
import SingleViewCard from "@/components/card/view-card/single-view-card";
import { trendingList, trendingLists } from "@/constants";
import { ICardView } from "@/interface/card-view";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

const Blog = () => {
  const card = {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  };
  return (
    <Box mt={8}>
      <Flex
        gap={4}
        alignItems="stretch"
        mb={8}
        flexDir={{ base: "column", md: "row" }}
      >
        <SingleViewCard card={card} />

        <Flex
          gap={4}
          width={{ md: "20rem", lg: "25rem", xl: "29.5rem" }}
          flexDirection={{ base: "column", sm: "row", md: "column" }}
        >
          {trendingLists.map((trend: ICardView, index: number) => (
            <Box key={index} flexGrow={1}>
              <ViewCard card={trend} showAuthor={true} />
            </Box>
          ))}
        </Flex>
      </Flex>
      <Grid
        gap={{ base: 2, md: 4 }}
        mb={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
        templateColumns={{
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {trendingList.map((trend: ICardView, index: number) => (
          <GridItem key={index}>
            <ViewCard card={trend} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
export default Blog;
