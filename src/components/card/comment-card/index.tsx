import { IComment } from "@/interface/comment";
import {
  ChatIcon,
  DownvoteIcon,
  SavedIcon,
  ThreeDotsIcon,
  ThumbsIcon,
} from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
interface ICommentProps {
  comment: IComment;
  showOptions?: boolean;
}

const CommentCard: React.FC<ICommentProps> = ({
  comment,
  showOptions = false,
}) => {
  return (
    <Box
      bg="#FFFFFF"
      p={6}
      borderRadius="8px"
      border="1px solid #E5E7EB"
      boxShadow="customLight"
    >
      <Flex alignItems={"center"} gap="8px" mb="11px">
        <Box h="24px" width="24px">
          <Image
            width={24}
            height={24}
            src={comment?.url || "/assets/images/card-image.png"}
            alt="Avatar blog view"
            className="rounded-full object-cover h-full w-full"
          />
        </Box>
        <Text fontWeight={600} fontSize={14} color="#111928">
          {comment?.name}
        </Text>
        <Text fontWeight={400} fontSize={12} color="#6B7280">
          Posted {comment?.createdAt}
        </Text>
      </Flex>
      <Text fontWeight={400} fontSize={16} color="#6B7280" mb={4}>
        Posted {comment?.content}
      </Text>
      {comment?.image && (
        <Box mb={4} h={"148px"} w="100%">
          <Image
            width={596}
            height={148}
            alt="Comment post snap"
            src={comment?.image || "/assets/images/card-image"}
            className="object-cover h-full w-full"
          />
        </Box>
      )}

      <Flex
        py="10px"
        ps={5}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" gap={5}>
          <Flex alignItems={"center"} gap="8px">
            <Text fontWeight={500} fontSize={14} color="#1F2A37">
              Reply
            </Text>
            <ChatIcon />
          </Flex>
          <Flex alignItems={"center"} gap="8px">
            <Text fontWeight={500} fontSize={14} color="#1F2A37">
              Like
            </Text>
            <ThumbsIcon />
          </Flex>
          {showOptions && (
            <>
              <Flex alignItems={"center"} gap="8px">
                <Text fontWeight={500} fontSize={14} color="#1F2A37">
                  Downvote
                </Text>
                <DownvoteIcon />
              </Flex>
              <Flex alignItems={"center"} gap="8px">
                <Text fontWeight={500} fontSize={14} color="#1F2A37">
                  Saved
                </Text>
                <SavedIcon />
              </Flex>
            </>
          )}
        </Box>
        <Box>
          <ThreeDotsIcon />
        </Box>
      </Flex>
    </Box>
  );
};
export default CommentCard;
