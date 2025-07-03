"use client";

import React from "react";
import { useUserSession } from "@/app/context/user-context";
import SkeletonViewCard from "@/components/card/skeleton/view";
import ViewCard from "@/components/card/view-card";
import { useGetStockNews } from "@/services/blog";
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IStockComponent } from "@/interface/stock";

const StockNews: React.FC<IStockComponent> = ({ symbol }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [blogsData, setBlogsData] = useState<any>([]);
  const { setRedirectModalOpen } = useUserSession();

  // This useEffect is duplicated, you can remove one
  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);

  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetStockNews(
    symbol.split(".")[0].toUpperCase(),
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
          // Responsive columns: 1 for mobile, 2 for tablet, 3 for small desktop, 4 for large desktop
          templateColumns={{
            base: "repeat(1, 1fr)", // On extra small screens, 1 column
            sm: "repeat(1, 1fr)", // On small screens (e.g., phones), 1 column
            md: "repeat(2, 1fr)", // On medium screens (e.g., tablets), 2 columns
            lg: "repeat(3, 1fr)", // On large screens (e.g., small desktops), 3 columns
            xl: "repeat(4, 1fr)", // On extra large screens (e.g., large desktops), 4 columns
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
          // Responsive columns: 1 for mobile, 2 for tablet, 3 for small desktop, 4 for large desktop
          templateColumns={{
            base: "repeat(1, 1fr)", // On extra small screens, 1 column
            sm: "repeat(1, 1fr)", // On small screens (e.g., phones), 1 column
            md: "repeat(2, 1fr)", // On medium screens (e.g., tablets), 2 columns
            lg: "repeat(3, 1fr)", // On large screens (e.g., small desktops), 3 columns
            xl: "repeat(4, 1fr)", // On extra large screens (e.g., large desktops), 4 columns
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

export default StockNews;