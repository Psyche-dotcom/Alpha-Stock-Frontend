"use client";

import { useUserSession } from "@/app/context/user-context";
import SkeletonViewCard from "@/components/card/skeleton/view";
import ViewCard from "@/components/card/view-card";
import { useGetBlogs } from "@/services/blog";
import { Box, Grid, GridItem, Button, Text, Center } from "@chakra-ui/react"; // Import Text and Center
import { useEffect, useState } from "react";

const Blog = () => {
  const pageSize = 8; // Define page size for clarity
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [blogsData, setBlogsData] = useState<any>([]);
  const [hasMoreBlogs, setHasMoreBlogs] = useState<boolean>(true); // State to control "Load More" button visibility
  const { setRedirectModalOpen } = useUserSession();

  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);

  // Fetch blogs for the current page
  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetBlogs(
    pageNumber,
    pageSize
  );

  // Append new blogs when data loads and determine if there are more pages
  useEffect(() => {
    if (getBlogsData) { // Check if getBlogsData is not null/undefined
      if (getBlogsData.length > 0) {
        setBlogsData((prev: any) => [...prev, ...getBlogsData]);
      }
      // If the number of blogs fetched is less than the page size, it means there are no more blogs
      if (getBlogsData.length < pageSize) {
        setHasMoreBlogs(false);
      } else {
        setHasMoreBlogs(true); // Reset to true if a full page was received, indicating more might exist
      }
    }
  }, [getBlogsData, pageSize]);

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  return (
    <Box mt={8} className="max-w-[1440px] mx-auto">
      {/* Conditional rendering based on loading state and data presence */}
      {getBlogsIsLoading && blogsData.length === 0 ? (
        // Show skeleton cards when initially loading and no data is present
        <Grid
          gap={4}
          mb={16}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index}>
              <SkeletonViewCard />
            </div>
          ))}
        </Grid>
      ) : blogsData.length === 0 && !getBlogsIsLoading ? (
        // Show "No Stock News Available" message if no blogs are found after loading
        <Center py={20}>
          <Text fontSize="xl" fontWeight="bold" color="gray.500">
            No Stock News Available
          </Text>
        </Center>
      ) : (
        // Show actual blog cards when data is available
        <Grid
          gap={4}
          mb={16}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          {blogsData.map((blog: any, index: number) => (
            <GridItem key={index}>
              <ViewCard card={blog} isAuth={true} />
            </GridItem>
          ))}
        </Grid>
      )}

      {/* Load More Button - only show if hasMoreBlogs is true and there's at least one blog */}
      {hasMoreBlogs && blogsData.length > 0 && (
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
      )}
    </Box>
  );
};

export default Blog;
