"use client";
import { useCallback, useEffect, useState } from "react";
import HeaderCard from "@/components/card/header-card";
import StockCard from "@/components/card/stock-card";
import ViewCard from "@/components/card/view-card";
import { IViewCard } from "@/interface/card-view";
import { IStock, IStockData } from "@/interface/stock-view";
import MarketMoveContent from "../market-move";
import TradeDecision from "../trade-decision";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { useAboutMarket, useTrendingAnalysis } from "@/services/blog"; // Consider if these are actually used
import SkeletonViewCard from "@/components/card/skeleton/view";
import StockCardSkeleton from "@/components/card/skeleton/StockCardSkeleton";
import { MouseMoveEffect } from "@/components/mouseEvent";
import { useGetBlogs } from "@/services/blog";

const Home = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [blogsData, setBlogsData] = useState<any>([]); // This is your accumulated data
  const [stockData, setStockData] = useState<IStock[]>([]);

  // Fetch blogs for the current page
  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetBlogs(
    pageNumber,
    4 // Always fetching 4 blogs for this Home component
  );

  // --- MODIFICATION START ---
  useEffect(() => {
    // If we are on the first page, we should reset blogsData completely
    // This ensures that when navigating back to Home, the accumulation starts fresh.
    if (pageNumber === 1) {
      setBlogsData([]); // Clear previous data
    }

    if (getBlogsData?.length > 0) {
      // Basic check for duplicates, assumes blog items have a unique 'id' property
      const newUniqueBlogs = getBlogsData.filter(
        (newBlog: any) => !blogsData.some((existingBlog: any) => existingBlog.id === newBlog.id)
      );
      if (newUniqueBlogs.length > 0) {
        setBlogsData((prev: any) => [...prev, ...newUniqueBlogs]);
      }
    }
  }, [getBlogsData, pageNumber]); // Add pageNumber to dependencies
  // --- MODIFICATION END ---


  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stock/stream/market_performance?leaderType=MostTraded`
    );

    eventSource.onmessage = (event) => {
      const stockPrice = event;
      const parsedData: any = JSON.parse(stockPrice.data);
      const parsedCompleteData: IStockData[] = JSON.parse(parsedData);
      const transformedData: IStock[] = parsedCompleteData
        .slice(0, 4)
        .map((stock: any) => ({
          title: stock.symbol,
          total: stock.price.toFixed(2),
          value: stock.change,
          percent: stock.changesPercentage,
          isProgressive: stock.change > 0,
        }));

      setStockData(transformedData);
    };

    eventSource.onerror = (err) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {/* <MouseMoveEffect color="#22c55e" size={120} opacity={0.15} /> */}
      <header className="sticky top-0 z-10 shadow-lg">
        <Navbar />
      </header>
      <div className="px-4 pb-6 max-w-[1440px] mx-auto">
        <div className="mb-4 flex gap-4 md:gap-8 py-4 md:py-8 flex-col lg:flex-row">
          <div className="h-auto items-center flex bg-white w-full p-8 rounded-[12px]">
            <div className="w-full">
              <p className="mb-4 font-bold leading-[43.2px] md:leading-[50px] lg:leading-[59px] text-[#180E03] text-[30px] sm:text-[36px] md:text-[48px] xl:text-[60px]">
                Learn, observe and move with the market.
              </p>
              <p className="font-normal text-[#6B7280] text-base lg:text-lg">
                Whether you’re a seasoned investor or just starting out, our
                platform provides you with comprehensive tools and resources.
                Explore stock trends, get personalized trading insights, and
                access a wealth of educational content designed to help you make
                informed decisions
              </p>
            </div>
          </div>
          <div className="w-full rounded-[12px] h-auto">
            <Image
              src="/assets/images/card-image.png"
              className="object-cover rounded-[12px] w-full h-full"
              width={716}
              height={546}
              alt="Random snap"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16">
          {stockData.length == 0
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <StockCardSkeleton />
                </div>
              ))
            : stockData?.map((stock, index) => (
                <div key={index}>
                  <StockCard stock={stock} />
                </div>
              ))}
        </div>
        {/* The "Learn About The Market" section (your blogs) */}
        <div className="mb-[64px]">
          <HeaderCard text="Learn About The Market" href="/news" />
          {getBlogsIsLoading && blogsData.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <SkeletonViewCard />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {blogsData.map((trend: any, index: number) => (
                <div key={index}>
                  {/* IMPORTANT: Use a stable unique key if available (e.g., blog.id) */}
                  <ViewCard card={trend} />
                </div>
              ))}
            </div>
          )}
        </div>
        <HeaderCard
          text="Watch the market move in real time."
          linkText="Get started"
          href="#"
        />
        <MarketMoveContent />
        <TradeDecision />
        <Footer />
      </div>
    </div>
  );
};
export default Home;