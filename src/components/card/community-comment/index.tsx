"use client";

import { IComments } from "@/interface/comment";
import {
  ChatIcon,
  DownvoteFilledIcon,
  DownvoteIcon,
  SavedIcon,
  ThumbsIcon,
  ThumbsOutlineIcon,
  UnSavedIcon,
} from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploadIcon, SendIcon, SmileyIcon } from "@/utils/icons";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formatDate } from "@/utils";
import {
  useCommunityDownvoteUnDownvote,
  useCommunityLIkeUnlike,
  useSaveText,
} from "@/services/community";
import { showSuccessAlert } from "@/utils/alert";
interface ICommentProps {
  comment: IComments;
  showUpload?: boolean;
  refreshChannelMessage?: any;
}

const CommunityCommentCard: React.FC<ICommentProps> = ({
  comment,
  showUpload = true,
  refreshChannelMessage,
}) => {
  const [commentCount, setCommentCount] = useState<number>(
    Number(comment.likeCount || 0)
  );

  const [commentLiked, setCommentLiked] = useState<boolean>(
    comment?.isLiked || false
  );

  const [commentDownvoted, setCommentDownvoted] = useState<boolean>(
    comment?.IsUnliked || false
  );

  const [commentSaved, setCommentSaved] = useState<boolean>(
    comment?.isSaved || false
  );
  const { likeUnlikePayload, likeUnlikeIsLoading } = useCommunityLIkeUnlike(
    (res: any) => {
      showSuccessAlert(res);
      setCommentLiked((prev) => !prev);
    }
  );

  const { downvoteUndownvoteIsLoading, downvoteUndownvotePayload } =
    useCommunityDownvoteUnDownvote((res: any) => {
      showSuccessAlert(res);
      setCommentDownvoted((prev) => !prev);
    });

  const [showReply, setShowReply] = useState<boolean>(false);
  const formSchema = z.object({
    reply: z.string(),
  });
  const { messageSavedIsLoading, messageSavedPayload } = useSaveText(
    (res: any) => {
      showSuccessAlert(res || "");
      setCommentSaved((prev) => !prev);
      refreshChannelMessage();
    }
  );

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {}

  const datas: IComments[] = [
    {
      name: "Babatunde Saheed",
      replyContent: "Hello world!!!",
      commentDate: "",
    },
    {
      name: "Babatunde Saheed",
      replyContent: "Hello world!!!",
      commentDate: "",
    },
    {
      name: "Babatunde Saheed",
      replyContent: "Hello world!!!",
      commentDate: "",
    },
  ];

  const handleLikeToggle = () => {
    if (likeUnlikeIsLoading) {
      return;
    }
    const payload = {
      messageId: comment?.commentId,
    };
    likeUnlikePayload(payload);
  };

  const handleDownvoteToggle = () => {
    if (downvoteUndownvoteIsLoading) {
      return;
    }
    const payload = {
      messageId: comment?.commentId,
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
            src={comment?.userImgUrl || "/assets/images/card-image.png"}
            alt="Avatar blog view"
            className="rounded-full object-cover h-full w-full"
          />
        </Box>
        <Text fontWeight={600} fontSize={14} color="#111928" mr="auto">
          {comment?.name}
        </Text>
        <Text fontWeight={400} fontSize={12} color="#6B7280">
          {formatDate(comment?.commentDate)}
        </Text>
      </Flex>
      {comment?.comment && (
        <Text fontWeight={400} fontSize={16} color="#6B7280" mb={4}>
          {comment?.comment}
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
          <Flex
            alignItems={"center"}
            gap="4px"
            cursor={"pointer"}
            onClick={() => setShowReply(!showReply)}
          >
            <Text
              fontWeight={500}
              fontSize={{ base: 12, sm: 14 }}
              color="#1F2A37"
            >
              Reply
            </Text>
            <ChatIcon />
          </Flex>
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
                <Box color={comment?.IsUnliked ? "#351F05" : ""}>
                  <DownvoteFilledIcon />
                </Box>
              ) : (
                <Box color={comment?.IsUnliked ? "#351F05" : ""}>
                  <DownvoteIcon />
                </Box>
              )}
            </Flex>
          )}
          <Flex
            alignItems={"center"}
            gap="4px"
            cursor={"pointer"}
            onClick={() => {
              if (messageSavedIsLoading) {
                return;
              }
              messageSavedPayload({
                messageId: comment?.commentId,
              });
            }}
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

      {showReply && (
        <Box
          position={"sticky"}
          bottom={0}
          w={"full"}
          bg="white"
          borderRadius={"8px"}
          mt="20px"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-3 items-center"
            >
              {showUpload && (
                <>
                  <Button variant={"ghost"} size="xl">
                    <FileUploadIcon />
                  </Button>
                  <Button variant={"ghost"} size="xl">
                    <SmileyIcon />
                  </Button>
                </>
              )}

              <FormField
                control={form.control}
                name="reply"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Type here ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant={"ghost"} size="xl" type={"submit"}>
                <SendIcon />
              </Button>
            </form>
          </Form>

          <Flex flexDirection={"column"} gap={4} w={{ base: "100%" }}>
            {datas?.map((comment: IComments, index: number) => (
              <Box className="mt-3 ms-5" key={index}>
                <Flex alignItems={"center"} gap="8px" mb="6px">
                  <Box h="24px" width="24px">
                    <Image
                      width={24}
                      height={24}
                      src={
                        comment?.userImgUrl || "/assets/images/card-image.png"
                      }
                      alt="Avatar blog view"
                      className="rounded-full object-cover h-full w-full"
                    />
                  </Box>
                  <Text
                    fontWeight={600}
                    fontSize={14}
                    color="#111928"
                    mr="auto"
                  >
                    {comment?.name}
                  </Text>
                </Flex>
                <Text fontWeight={400} fontSize={16} color="#6B7280">
                  {comment?.replyContent}
                </Text>
              </Box>
            ))}
          </Flex>
          <Box
            display={"flex"}
            justifyContent={"end"}
            textDecoration={"underline"}
            fontSize={"sm"}
            color="#351F05"
            fontWeight={600}
            mt="24px"
            cursor={"pointer"}
            // onClick={handleMoreClick}
          >
            view more comments
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default CommunityCommentCard;
