"use client";

import { IMessage } from "@/interface/comment";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { formatDate } from "@/utils";
import {
  ChatIcon,
  DownvoteFilledIcon,
  DownvoteIcon,
  SavedIcon,
  ThumbsIcon,
  ThumbsOutlineIcon,
  UnSavedIcon,
} from "@/utils/icons";
import { useState } from "react";
import {
  useCommunityDownvoteUnDownvote,
  useCommunityLIkeUnlike,
} from "@/services/community";
import { showSuccessAlert } from "@/utils/alert";
interface ICommentProps {
  comment: IMessage;
}

const SavedMessageCard: React.FC<ICommentProps> = ({ comment }) => {
  const [commentLiked, setCommentLiked] = useState<boolean>(
    comment?.isLiked || false
  );

  const [commentDownvoted, setCommentDownvoted] = useState<boolean>(
    comment?.isUnLiked || false
  );

  const [commentSaved, setCommentSaved] = useState<boolean>(
    comment?.isSaved || false
  );

  const { likeUnlikePayload, likeUnlikeIsLoading } = useCommunityLIkeUnlike(
    (res: any) => {
      console.log(res);
      showSuccessAlert(res);
      setCommentLiked((prev) => !prev);
    }
  );

  const { downvoteUndownvoteIsLoading, downvoteUndownvotePayload } =
    useCommunityDownvoteUnDownvote((res: any) => {
      showSuccessAlert(res);
      setCommentDownvoted((prev) => !prev);
    });

  const handleLikeToggle = () => {
    if (likeUnlikeIsLoading) {
      return;
    }
    const payload = {
      messageId: comment?.id,
    };
    likeUnlikePayload(payload);
  };

  const handleDownvoteToggle = () => {
    if (downvoteUndownvoteIsLoading) {
      return;
    }
    const payload = {
      messageId: comment?.id,
    };
    downvoteUndownvotePayload(payload);
  };

  return (
    <Box
      bg="#FFFFFF"
      p={{ base: 3, sm: 4, md: 6 }}
      borderRadius="8px"
      border="1px solid #E5E7EB"
      boxShadow="customLight"
    >
      <Flex alignItems={"center"} gap="8px" mb="11px">
        <Box h="24px" width="24px">
          <Image
            width={24}
            height={24}
            src={comment?.sentByImgUrl || "/assets/images/card-image.png"}
            alt="Avatar blog view"
            className="rounded-full object-cover h-full w-full"
          />
        </Box>
        <Text fontWeight={600} fontSize={14} color="#111928" mr="auto">
          {comment?.senderName}
        </Text>
        <Text fontWeight={400} fontSize={12} color="#6B7280">
          {formatDate(comment?.created)}
        </Text>
      </Flex>
      {comment?.message && (
        <Text fontWeight={400} fontSize={16} color="#6B7280" mb={4}>
          {comment?.message}
        </Text>
      )}
      {comment?.commentImgUrl && (
        <Box mb={4} h={"148px"} w="100%">
          <Image
            width={596}
            height={148}
            alt="Comment post snap"
            src={comment?.commentImgUrl || "/assets/images/card-image"}
            className="object-cover h-full w-full"
          />
        </Box>
      )}
      <Flex
        py="10px"
        ps={{ base: 3, sm: 5 }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" gap={{ base: 1, sm: 3 }}>
          {!commentDownvoted && (
            <Flex
              alignItems={"center"}
              gap="4px"
              cursor={"pointer"}
              onClick={handleLikeToggle}
            >
              <Text
                fontWeight={500}
                fontSize={{ base: 12, sm: 14 }}
                color="#1F2A37"
              >
                {commentLiked ? "Unlike" : "Like"}
              </Text>
              {commentLiked ? (
                <Box
                  color={comment?.isLiked ? "#351F05" : ""}
                  className="flex gap-1 items-center"
                >
                  <ThumbsIcon />
                </Box>
              ) : (
                <Box color={comment?.isLiked ? "#351F05" : ""}>
                  <ThumbsOutlineIcon />
                </Box>
              )}
            </Flex>
          )}
          {!commentLiked && (
            <Flex
              alignItems={"center"}
              gap="4px"
              cursor={"pointer"}
              onClick={handleDownvoteToggle}
            >
              <Text
                fontWeight={500}
                fontSize={{ base: 12, sm: 14 }}
                color="#1F2A37"
              >
                {commentDownvoted ? "UnDownvote" : " Downvote"}
              </Text>
              {commentDownvoted ? (
                <Box color={comment?.isUnLiked ? "#351F05" : ""}>
                  <DownvoteFilledIcon />
                </Box>
              ) : (
                <Box color={comment?.isUnLiked ? "#351F05" : ""}>
                  <DownvoteIcon />
                </Box>
              )}
            </Flex>
          )}
          <Flex
            alignItems={"center"}
            gap="4px"
            cursor={"pointer"}
            // onClick={() => {
            //   if (messageSavedIsLoading) {
            //     return;
            //   }
            //   messageSavedPayload({
            //     messageId: comment?.id,
            //   });
            // }}
          >
            <Text
              fontWeight={500}
              fontSize={{ base: 12, sm: 14 }}
              color="#1F2A37"
            >
              {commentSaved ? "Saved" : "Save"}
            </Text>
            {commentSaved ? <SavedIcon /> : <UnSavedIcon />}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
export default SavedMessageCard;
