import ViewCard from "@/components/card/view-card";
import SingleViewCard from "@/components/card/view-card/single-view-card";
import { trendingList, trendingLists } from "@/constants";
import { ICardView } from "@/interface/card-view";
import { Box, Flex } from "@chakra-ui/react";

const Blog = () => {
  const card = {
    title: "What do members of congress know about these stocks that we don’t?",
    createdAt: "August 2, 2024",
    url: "/assets/images/card-image.png",
  };
  return (
    <Box mt={8}>
      <Flex gap={4} alignItems="stretch" mb={8}>
        <SingleViewCard card={card} />

        <Flex wrap="wrap" gap={4} maxWidth="472px">
          {trendingLists.map((trend: ICardView, index: number) => (
            <Box key={index} flexDirection={"column"} flexGrow={1}>
              <ViewCard card={trend} showAuthor={true} />
            </Box>
          ))}
        </Flex>
      </Flex>
      <Flex wrap="wrap" gap={4} mb={16}>
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
  );
};
export default Blog;
