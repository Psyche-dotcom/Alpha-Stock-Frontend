import CommentCard from "@/components/card/comment-card";
import { communityList } from "@/constants";
import { IComment } from "@/interface/comment";
import { Box, Flex } from "@chakra-ui/react";

const CommunityMain = () => {
  return (
    <Box borderRadius="8px" bg="#C2BAB2" p={8} w="100%">
      <Flex flexDirection={"column"} gap={4}>
        {communityList.map((comment: IComment, index: number) => (
          <CommentCard comment={comment} key={index} showOptions={true} />
        ))}
      </Flex>
    </Box>
  );
};

export default CommunityMain;
