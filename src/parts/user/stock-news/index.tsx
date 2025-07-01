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
  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);

  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetStockNews(
    symbol.split(".")[0].toUpperCase(),
    pageNumber,
    8
  );

  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);

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
        <Grid gap={4} mb={16} templateColumns="repeat(4, 1fr)">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <SkeletonViewCard />
            </div>
          ))}
        </Grid>
      ) : (
        <Grid gap={4} mb={16} templateColumns="repeat(4, 1fr)">
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
