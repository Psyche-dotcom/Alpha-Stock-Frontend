"use client";

import CommentCard from "@/components/card/comment-card";
import CommentSkeleton from "@/components/card/skeleton/comment";
import SingleCardSkeleton from "@/components/card/skeleton/single-view";
import { IComments } from "@/interface/comment";
import { useGetBlog, useGetBlogComments } from "@/services/blog";
import { formatDate } from "@/utils";
import { ArrowRightIcon, HomeIcon } from "@/utils/icons";
import { Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogDetails = ({ blogId }: { blogId: string }) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const { getBlogData, getBlogError, getBlogIsLoading, getBlogPayload } =
    useGetBlog((res: any) => {});
  const {
    getBlogCommentsData,
    getBlogCommentsError,
    getBlogCommentsIsLoading,
    getBlogCommentsPayload,
  } = useGetBlogComments((res: any) => {});

  useEffect(() => {
    const payload = {
      userId: "",
      blogPostId: blogId,
    };
    getBlogPayload(payload);
  }, []);

  useEffect(() => {
    const payload = {
      userId: "",
      blogPostId: blogId,
      perPageSize: pageSize,
    };
    getBlogCommentsPayload(payload);
  }, [pageSize]);
  console.log(getBlogCommentsData);
  const handleMoreClick = () => {
    if (getBlogCommentsData?.totalPages !== 1) setPageSize((prev) => prev + 5);
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
                  <CommentCard comment={comment} key={index} />
                )
              )}
            </Flex>
          )}
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
        </Box>
      </Flex>
    </Box>
  );
};
export default BlogDetails;
