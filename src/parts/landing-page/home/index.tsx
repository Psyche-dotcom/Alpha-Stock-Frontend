"use client";
import { useEffect, useState } from "react";
import HeaderCard from "@/components/card/header-card";
import StockCard from "@/components/card/stock-card";
import { IStock, IStockData } from "@/interface/stock-view";
import MarketDataTable from "@/components/MarketDataTable";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import StockCardSkeleton from "@/components/card/skeleton/StockCardSkeleton";

const Home = () => {
  const [stockData, setStockData] = useState<IStock[]>([]);

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

  // Determine if this is the root path (Home page)
  const isRootPath =
    typeof window !== "undefined" && window.location.pathname === "/";

  return (
    <div>
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

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-16">
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
        </div> */}

        {/* Market Move Tables Section */}
        <div className="mb-[64px]">
          {/* <HeaderCard
            text="Watch the market move in real time."
            linkText="Get started"
            href="#"
          /> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {" "}
            {/* Responsive grid for tables */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#180E03]">
                Top Traded
              </h2>
              <MarketDataTable leaderType="MostTraded" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#180E03]">
                Top Gainers
              </h2>
              <MarketDataTable leaderType="MostGainer" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#180E03]">
                Top Losers
              </h2>
              <MarketDataTable leaderType="MostLoser" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
export default Home;
