"use client";

import { useUserSession } from "@/app/context/user-context";
import SkeletonViewCard from "@/components/card/skeleton/view";
import ViewCard from "@/components/card/view-card";
import { useGetBlogs } from "@/services/blog";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Blog = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [blogsData, setBlogsData] = useState<any>([]);
  const { setRedirectModalOpen } = useUserSession();

  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);

  // Fetch blogs for the current page
  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetBlogs(
    pageNumber,
    8
  );

  // Append new blogs when data loads
  useEffect(() => {
    if (getBlogsData?.length > 0) {
      setBlogsData((prev: any) => [...prev, ...getBlogsData]);
    }
  }, [getBlogsData]);

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  return (
    <Box mt={8} className="max-w-[1440px] mx-auto">
      {getBlogsIsLoading && blogsData.length === 0 ? (
        <Grid
          gap={4}
          mb={16}
          // Responsive columns for skeleton cards
          templateColumns={{
            base: "repeat(1, 1fr)", // 1 column on extra small and small screens
            md: "repeat(2, 1fr)", // 2 columns on medium screens (tablets)
            lg: "repeat(3, 1fr)", // 3 columns on large screens (small desktops)
            xl: "repeat(4, 1fr)", // 4 columns on extra large screens (large desktops)
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <SkeletonViewCard />
            </div>
          ))}
        </Grid>
      ) : (
        <Grid
          gap={4}
          mb={16}
          // Responsive columns for actual blog cards
          templateColumns={{
            base: "repeat(1, 1fr)", // 1 column on extra small and small screens
            md: "repeat(2, 1fr)", // 2 columns on medium screens (tablets)
            lg: "repeat(3, 1fr)", // 3 columns on large screens (small desktops)
            xl: "repeat(4, 1fr)", // 4 columns on extra large screens (large desktops)
          }}
        >
          {blogsData.map((blog: any, index: number) => (
            <GridItem key={index}>
              <ViewCard card={blog} isAuth={true} />
            </GridItem>
          ))}
        </Grid>
      )}

      {/* Load More Button */}
      <Box textAlign="center" mb={8}>
        <Button
          onClick={handleLoadMore}
          isLoading={getBlogsIsLoading}
          disabled={getBlogsIsLoading}
          bg="#351F05"
          color="white"
          _hover={{ bg: "#351f05cc" }} // 80% opacity on hover
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
};

export default Blog;
