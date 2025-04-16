"use client";

import { useUserSession } from "@/app/context/user-context";
import CommentCard from "@/components/card/comment-card";
import CommentSkeleton from "@/components/card/skeleton/comment";
import SingleCardSkeleton from "@/components/card/skeleton/single-view";
import { IComments } from "@/interface/comment";
import {
  useAddComment,
  useBlogLikeUnlike,
  useGetBlog,
  useGetBlogComments,
} from "@/services/blog";
import { formatDate } from "@/utils";
import {
  ArrowRightIcon,
  HomeIcon,
  SendIcon,
  ThumbsIcon,
  ThumbsOutlineIcon,
} from "@/utils/icons";
import { Box, Text, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorAlert, showSuccessAlert } from "@/utils/alert";

const BlogDetails = ({ blogId }: { blogId: string }) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const { profileData, setRedirectModalOpen } = useUserSession();
  const { getBlogData, getBlogError, getBlogIsLoading, getBlogPayload } =
    useGetBlog((res: any) => {});

  const [commentLiked, setCommentLiked] = useState<boolean>(
    getBlogData?.isLiked || false
  );

  const [commentCount, setCommentCount] = useState<number>(
    Number(getBlogData.likeCount || 0)
  );

  const payload = {
    userId: profileData?.result?.id || "",
    blogPostId: blogId,
    perPageSize: pageSize,
  };

  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);
  const {
    getBlogCommentsData,
    getBlogCommentsError,
    getBlogCommentsIsLoading,
    getBlogCommentsPayload,
  } = useGetBlogComments((res: any) => {});

  const { likeUnlikeData, likeUnlikePayload, likeUnlikeIsLoading } =
    useBlogLikeUnlike((res: any) => {
      showSuccessAlert(res);
      setCommentLiked((prev) => !prev);
      setCommentCount((prev) => (commentLiked ? prev - 1 : prev + 1));
    });

  const { addCommentData, addCommentPayload, addCommentIsLoading } =
    useAddComment((res: any) => {
      showSuccessAlert("Comment added successfully");
    });

  useEffect(() => {
    const payload = {
      userId: profileData?.result?.id || "",
      blogPostId: blogId,
    };
    getBlogPayload(payload);
  }, []);

  useEffect(() => {
    getBlogCommentsPayload(payload);
  }, [pageSize, addCommentData]);

  const handleMoreClick = () => {
    if (getBlogCommentsData?.totalPages !== 1) setPageSize((prev) => prev + 5);
  };

  const formSchema = z.object({
    comment: z.string().min(3, {
      message: "Comment must be at least 3 characters.",
    }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    const payload = {
      content: values.comment,
      blogPostId: blogId,
    };
    addCommentPayload(payload);
  }

  const handleReaction = () => {
    if (likeUnlikeIsLoading) {
      return;
    }
    if (!profileData) {
      showErrorAlert("Please login!");
      return;
    }
    const payload = {
      blogPostId: blogId,
    };
    likeUnlikePayload(payload);
  };

  return (
    <Box mt={8}>
      <Flex
        alignItems={"center"}
        gap={4}
        py={"8px"}
        px="16px"
        bg="#351F05"
        mb="16px"
        borderRadius={"8px"}
        width="fit-content"
      >
        <HomeIcon />
        <Text fontWeight={500} fontSize={14} color="#FFF">
          Blog
        </Text>
        <ArrowRightIcon />
        <Text fontWeight={500} fontSize={14} color="#FFF">
          {getBlogData?.title}
        </Text>
      </Flex>
      <Flex gap={{ base: 3, lg: 4 }} flexDir={{ base: "column", md: "row" }}>
        {getBlogIsLoading ? (
          <SingleCardSkeleton />
        ) : (
          <Box
            bg="#fff"
            p={{ base: 4, lg: 6, xl: 8 }}
            borderRadius={"12px"}
            width="100%"
          >
            <Text
              fontWeight={600}
              color="#111928"
              mb="8px"
              fontSize={{ base: "28px", lg: "32px", xl: "36px" }}
              lineHeight={{ base: "42px", md: "48px", xl: "54px" }}
            >
              {getBlogData?.title}
            </Text>
            <Text fontWeight={500} fontSize={14} color="#111928" mb="32px">
              Written by{" "}
              <span className="font-bold">{getBlogData?.publisherName}</span> -{" "}
              {formatDate(
                getBlogData?.publishedDate || "2025-03-07T23:40:33.987571Z"
              )}
            </Text>
            <Box className="flex items-center gap-3 mb-5">
              {commentLiked ? (
                <Flex
                  alignItems={"center"}
                  gap="4px"
                  cursor={"pointer"}
                  onClick={handleReaction}
                >
                  <Text fontWeight={500} fontSize={14} color="#1F2A37">
                    Unlike
                  </Text>
                  <Box color={getBlogData?.isLiked ? "#351F05" : ""}>
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
                  <Text fontWeight={500} fontSize={14} color="#1F2A37">
                    Like
                  </Text>
                  <Box color={getBlogData?.isLiked ? "#351F05" : ""}>
                    <ThumbsOutlineIcon />
                  </Box>
                </Flex>
              )}
              {commentCount || 0}
            </Box>
            <Box mb="32px">
              <Image
                height={501}
                width={896}
                alt="Single blog image"
                src={
                  getBlogData?.blogThumbnailUrl ||
                  "/assets/images/card-image.png"
                }
                className="object-cover"
              />
            </Box>
            <div
              dangerouslySetInnerHTML={{
                __html: getBlogData?.blogContent || "",
              }}
            />
          </Box>
        )}

        <Box>
          {profileData && profileData?.result?.id && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-3 items-start mb-3"
              >
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Type here"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  size="xl"
                  type="submit"
                  className="p-2 px-4 text-xs font-medium rounded-md"
                  disabled={addCommentIsLoading}
                >
                  Send
                </Button>
              </form>
            </Form>
          )}
          {getBlogCommentsIsLoading ? (
            <Flex
              flexDirection={"column"}
              gap={4}
              w={{ base: "100%", md: 472 }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <CommentSkeleton />
                </div>
              ))}
            </Flex>
          ) : (
            <Flex
              flexDirection={"column"}
              gap={4}
              w={{ base: "100%", md: 472 }}
            >
              {getBlogCommentsData?.result?.map(
                (comment: IComments, index: number) => (
                  <CommentCard comment={comment} key={index} isAuth={true} />
                )
              )}
            </Flex>
          )}

          <>
            {getBlogCommentsData?.totalPages > 1 &&
              getBlogCommentsData?.currentPage !==
                getBlogCommentsData?.totalPages && (
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
          </>
        </Box>
      </Flex>
    </Box>
  );
};
export default BlogDetails;
