"use client";

import SkeletonViewCard from "@/components/card/skeleton/view";
import ViewCard from "@/components/card/view-card";
import { useGetBlogs } from "@/services/blog";
import { Box, Grid, GridItem, Button, Text, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Blog = () => {
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [blogsData, setBlogsData] = useState<any>([]); // This is your accumulated data
  const [hasMoreBlogs, setHasMoreBlogs] = useState<boolean>(true);

  // Fetch blogs for the current page
  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetBlogs(
    pageNumber,
    pageSize
  );

  useEffect(() => {
    if (pageNumber === 1) {
      setBlogsData([]); // Clear any previous accumulated data
    }
    
    if (getBlogsData) {
      // Check if getBlogsData is not null/undefined
      if (getBlogsData.length > 0) {
        console.log(
          "Appending new blogs. Current blogsData length:",
          blogsData.length,
          "New blogs length:",
          getBlogsData.length
        );
        setBlogsData((prev: any) => [...prev, ...getBlogsData]);
      } else {
        console.log("getBlogsData is empty for page", pageNumber);
      }

      // If the number of blogs fetched is less than the page size, it means there are no more blogs
      // This logic is crucial for `hasMoreBlogs`.
      if (getBlogsData.length < pageSize) {
        setHasMoreBlogs(false);
        console.log("Set hasMoreBlogs to false (less than pageSize)");
      } else {
        setHasMoreBlogs(true); // Reset to true if a full page was received, indicating more might exist
        console.log("Set hasMoreBlogs to true (full page received)");
      }
    }
  }, [getBlogsData, pageSize]); // pageSize is a stable prop, but it's good to include if it could theoretically change

  const handleLoadMore = () => {
    console.log("Load More clicked. Incrementing pageNumber.");
    setPageNumber((prev) => prev + 1);
  };

  return (
    <Box mt={8} className="max-w-[1440px] mx-auto">
      {/* Conditional rendering based on loading state and data presence */}
      {getBlogsIsLoading && blogsData.length === 0 ? (
        // --- Scenario 1: Initial Loading (show skeletons) ---
        // This runs if:
        //   1. getBlogsIsLoading is TRUE (meaning useGetBlogs is active)
        //   2. AND blogsData.length is 0 (meaning no data has been accumulated yet)
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
        // --- Scenario 2: No Data After Loading (show "No Stock News") ---
        // This runs if:
        //   1. blogsData.length is 0 (meaning no data was ever added to the state)
        //   2. AND getBlogsIsLoading is FALSE (meaning the fetching process has completed)
        <Center py={20}>
          <Text fontSize="xl" fontWeight="bold" color="gray.500">
            No Stock News Available
          </Text>
        </Center>
      ) : (
        // --- Scenario 3: Data Available (show blog cards) ---
        // This is the desired state if data is present.
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
              <ViewCard card={blog} isAuth={true} />{" "}
              {/* Assuming 'blog' is the correct prop name */}
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
