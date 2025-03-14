"use client";

import SingleCardSkeleton from "@/components/card/skeleton/single-view";
import SkeletonViewCard from "@/components/card/skeleton/view";
import ViewCard from "@/components/card/view-card";
import SingleViewCard from "@/components/card/view-card/single-view-card";
import { Pagination } from "@/components/ui/pagination";
import { IViewCard } from "@/interface/card-view";
import { useGetBlogs } from "@/services/blog";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Blog = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [blogsData, setBlogsData] = useState<any>([]);

  const { getBlogsData, getBlogsError, getBlogsIsLoading, getBlogsPayload } =
    useGetBlogs((res: any) => {});
  const splitArray = () => {
    if (blogsData?.result && blogsData?.result?.length > 0) {
      const firstBlog = blogsData?.result[0];
      const SecondBlog = blogsData?.result.slice(1, 3);
      const thirdBlog = blogsData?.result.slice(3);

      return { firstBlog, SecondBlog, thirdBlog };
    }
    return { firstBlog: null, SecondBlog: [], thirdBlog: [] };
  };

  const { firstBlog, SecondBlog, thirdBlog } = splitArray();

  useEffect(() => {
    const payload = {
      pageNumber: pageNumber,
      perPageSize: 7,
      category: "All",
      status: "Published",
      userId: "",
      sinceDate: "",
      search: "",
    };
    getBlogsPayload(payload);
  }, [pageNumber]);

  useEffect(() => {
    if (getBlogsData?.result?.length > 0) {
      setBlogsData(getBlogsData);
    }
  }, [getBlogsData]);

  const onPageChange = (page: number) => {
    setPageNumber(page);
  };

  return (
    <Box mt={8}>
      <Flex
        gap={4}
        alignItems="stretch"
        mb={8}
        flexDir={{ base: "column", md: "row" }}
      >
        {getBlogsIsLoading ? (
          <SingleCardSkeleton />
        ) : (
          <SingleViewCard card={firstBlog} isAuth={true} />
        )}

        <Flex
          gap={4}
          width={{ md: "20rem", lg: "25rem", xl: "29.5rem" }}
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "column",
          }}
        >
          {getBlogsIsLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <Box key={index} flexGrow={1}>
                  <SkeletonViewCard />
                </Box>
              ))
            : SecondBlog.map((trend: IViewCard, index: number) => (
                <Box key={index} flexGrow={1}>
                  <ViewCard card={trend} showAuthor={true} isAuth={true} />
                </Box>
              ))}
        </Flex>
      </Flex>
      {getBlogsIsLoading ? (
        <Grid
          gap={{ base: 2, md: 4 }}
          mb={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
          templateColumns={{
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <SkeletonViewCard />
            </div>
          ))}
        </Grid>
      ) : (
        <Grid
          gap={{ base: 2, md: 4 }}
          mb={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {thirdBlog.map((trend: IViewCard, index: number) => (
            <GridItem key={index}>
              <ViewCard card={trend} isAuth={true} />
            </GridItem>
          ))}
        </Grid>
      )}
      <div>
        <Pagination
          currentPage={pageNumber}
          totalPages={blogsData?.totalPages || 0}
          onPageChange={onPageChange}
        />
      </div>
    </Box>
  );
};
export default Blog;
