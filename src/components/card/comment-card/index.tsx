"use client";

import { IComments } from "@/interface/comment";
import {
  ChatIcon,
  DownvoteIcon,
  SavedIcon,
  ThreeDotsIcon,
  ThumbsIcon,
  ThumbsOutlineIcon,
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
import { useEffect, useState } from "react";
import { formatDate } from "@/utils";
import {
  useAddCommentReply,
  useCommentLIkeUnlike,
  useGetBlogCommentsComment,
} from "@/services/blog";
import InnerCommentSkeleton from "../skeleton/inner-comment";
import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
interface ICommentProps {
  comment: IComments;
  showOptions?: boolean;
  showUpload?: boolean;
  isAuth?: boolean;
}

const CommentCard: React.FC<ICommentProps> = ({
  comment,
  showOptions = false,
  showUpload = false,
  isAuth = false,
}) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [commentCount, setCommentCount] = useState<number>(
    Number(comment.likeCount || 0)
  );
  const [commentLiked, setCommentLiked] = useState<boolean>(
    comment?.isLiked || false
  );

  const {
    getBlogCommentsCommentData,
    getBlogCommentsCommentIsLoading,
    getBlogCommentsCommentPayload,
    getBlogCommentsCommentError,
  } = useGetBlogCommentsComment((res: any) => {});

  const payload = {
    pageNumber: 1,
    commentId: comment?.commentId,
    perPageSize: pageSize,
  };

  const {
    addCommentReplyData,
    addCommentReplyIsLoading,
    addCommentReplyPayload,
  } = useAddCommentReply((res: any) => {
    showSuccessAlert("Reply successfully submitted");
  });

  const { likeUnlikeData, likeUnlikePayload, likeUnlikeIsLoading } =
    useCommentLIkeUnlike((res: any) => {
      showSuccessAlert(res);
      setCommentLiked((prev) => !prev);
      setCommentCount((prev) => (commentLiked ? prev - 1 : prev + 1));
    });

  const formSchema = z.object({
    reply: z.string(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: "",
    },
  });

  useEffect(() => {
    if (showReply) {
      getBlogCommentsCommentPayload(payload);
    }
  }, [pageSize, showReply, addCommentReplyData]);

  const handleMoreClick = () => {
    if (getBlogCommentsCommentData?.totalPages !== 1)
      setPageSize((prev) => prev + 5);
  };

  async function onSubmit(values: FormSchemaType) {
    const payload = {
      content: values.reply,
      commentId: comment?.commentId,
    };
    addCommentReplyPayload(payload);
  }

  const handleReaction = () => {
    if (likeUnlikeIsLoading) {
      return;
    }
    if (!isAuth) {
      showErrorAlert("Please login!");
      return;
    }
    const payload = {
      commentId: comment?.commentId,
    };
    likeUnlikePayload(payload);
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
      <Text fontWeight={400} fontSize={16} color="#6B7280" mb={4}>
        {comment?.comment}
      </Text>
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
        <Box display="flex" gap={3}>
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
          {commentLiked ? (
            <Flex
              alignItems={"center"}
              gap="4px"
              cursor={"pointer"}
              onClick={handleReaction}
            >
              <Text
                fontWeight={500}
                fontSize={{ base: 12, sm: 14 }}
                color="#1F2A37"
              >
                Unlike
              </Text>
              <Box color={comment?.isLiked ? "#351F05" : ""}>
                <ThumbsIcon />
              </Box>
            </Flex>
          ) : (
            <Flex
              alignItems={"center"}
              gap="4px"
              cursor={"pointer"}
              onClick={handleReaction}
            >
              <Text
                fontWeight={500}
                fontSize={{ base: 12, sm: 14 }}
                color="#1F2A37"
              >
                Like
              </Text>
              <Box color={comment?.isLiked ? "#351F05" : ""}>
                <ThumbsOutlineIcon />
              </Box>
            </Flex>
          )}
          {commentCount}
          {showOptions && (
            <>
              <Flex alignItems={"center"} gap="4px" cursor={"pointer"}>
                <Text fontWeight={500} fontSize={14} color="#1F2A37">
                  Downvote
                </Text>
                <DownvoteIcon />
              </Flex>
              <Flex alignItems={"center"} gap="4px" cursor={"pointer"}>
                <Text fontWeight={500} fontSize={14} color="#1F2A37">
                  Saved
                </Text>
                <SavedIcon />
              </Flex>
            </>
          )}
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
          {isAuth && (
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

                <Button
                  variant={"ghost"}
                  size="xl"
                  type={"submit"}
                  disabled={addCommentReplyIsLoading}
                >
                  <SendIcon />
                </Button>
              </form>
            </Form>
          )}
          {getBlogCommentsCommentIsLoading ? (
            <Flex
              flexDirection={"column"}
              gap={4}
              w={{ base: "100%", md: 472 }}
            >
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                  <InnerCommentSkeleton />
                </div>
              ))}
            </Flex>
          ) : (
            <Flex flexDirection={"column"} gap={4} w={{ base: "100%" }}>
              {getBlogCommentsCommentData?.result?.map(
                (comment: IComments, index: number) => (
                  <Box className="mt-3 ms-5">
                    <Flex alignItems={"center"} gap="8px" mb="6px">
                      <Box h="24px" width="24px">
                        <Image
                          width={24}
                          height={24}
                          src={
                            comment?.userImgUrl ||
                            "/assets/images/card-image.png"
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
                )
              )}
            </Flex>
          )}
          {getBlogCommentsCommentData?.totalPages > 1 &&
            getBlogCommentsCommentData?.currentPage !==
              getBlogCommentsCommentData?.totalPages && (
              <Box
                display={"flex"}
                justifyContent={"end"}
                textDecoration={"underline"}
                fontSize={"sm"}
                color="#351F05"
                fontWeight={600}
                mt="24px"
                cursor={"pointer"}
                onClick={handleMoreClick}
              >
                view more comments
              </Box>
            )}
        </Box>
      )}
    </Box>
  );
};
export default CommentCard;
