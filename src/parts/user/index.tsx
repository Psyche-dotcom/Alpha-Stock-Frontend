"use client";

import ViewCard from "@/components/card/view-card";
import { IViewCard } from "@/interface/card-view";
import { Grid, GridItem } from "@chakra-ui/react";
import MarketMoveContent from "../landing-page/market-move";
import { RightArrowLong } from "@/utils/icons";
import { useGetBlogs } from "@/services/blog";
import { useEffect } from "react";
import { useUserSession } from "@/app/context/user-context";
import Link from "next/link";

const User: React.FC = () => {
  const { profileData, setRedirectModalOpen } = useUserSession();
  const { getBlogsData, getBlogsError, getBlogsIsLoading } = useGetBlogs(1, 4);

  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!profileData?.result?.isSubActive) {
      e.preventDefault();
      setRedirectModalOpen(true);
    }
  };

  return (
    <div className="xl:flex xl:gap-4 h-full max-w-[1440px] mx-auto">
      {/* Left Column */}
      <div className="w-full xl:w-1/2">
        <div className="flex gap-4 flex-col md:flex-row xl:flex-col w-auto xl:w-full md:mb-8 mb-4 xl:mb-0">
          {/* Cards Section */}
          <div className="md:mb-8 mb-5 flex sm:flex-row flex-col sm:gap-4 gap-3 flex-1">
            <div className="flex flex-col sm:gap-4 gap-3 sm:h-[215px] h-auto flex-1">
              <Link
                href={"/user/company/aapl?tab=metrics"}
                onClick={(e) => handleClick(e)}
              >
                <div className="border border-[#614E38] pt-[1.75rem] p-6 rounded-[12px] bg-[#351F05] hover:bg-[#351F05]/90 h-auto flex items-end">
                  <h6 className="text-2xl font-semibold text-[#fff] flex items-center gap-4">
                    Fundamentals Toolkit <RightArrowLong />
                  </h6>
                </div>
              </Link>
              <div className="border border-[#614E38] hover:border-[#614E38]/80 hover:shadow-md transition-shadow pt-[1.75rem] p-4 rounded-[12px] bg-white text-[#351F05] hover:text-[#351F05]/60">
                <Link
                  href={"/user/company/aapl?tab=metrics"}
                  onClick={(e) => handleClick(e)}
                >
                  <h6 className="text-base font-semibold flex items-center gap-4 cursor-pointer">
                    Metrics <RightArrowLong />
                  </h6>
                </Link>
                <p className="font-normal text-sm text-[#614E38]">
                  Get visual insights to help inform your next investment strategy.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:gap-4 gap-3 text-[#351F05] hover:text-[#351F05]/60 flex-1">
              <Link
                href={"/user/company/aapl?tab=financials"}
                onClick={(e) => handleClick(e)}
              >
                <div className="border border-[#614E38] hover:border-[#614E38]/80 hover:shadow-md transition-shadow pt-[1.75rem] p-4 rounded-[12px] bg-white">
                  <h6 className="text-base font-semibold flex items-center gap-4">
                    Financials <RightArrowLong />
                  </h6>
                </div>
              </Link>
              <Link
                href={"/user/company/aapl?tab=stock-analyser"}
                onClick={(e) => handleClick(e)}
              >
                <div className="border border-[#614E38] pt-[1.75rem] p-6 rounded-[12px] bg-[#351F05] hover:bg-[#351F05]/90 h-auto flex items-end cursor-pointer">
                  <h6 className="text-2xl font-semibold text-[#fff] flex items-center gap-4">
                    Stock Analyser <RightArrowLong />
                  </h6>
                </div>
              </Link>
            </div>
          </div>

          {/* Market Move Table */}
          <MarketMoveContent />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full xl:w-1/2">
        <Grid
          gap={{ base: 2, md: 4 }}
          templateColumns={{
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          {getBlogsData?.map((trend: any, index: number) => (
            <GridItem key={index}>
              <ViewCard card={trend} isAuth={true} />
            </GridItem>
          ))}
        </Grid>

        <div className="flex items-center justify-center mt-4 cursor-pointer">
          <Link
            href="/user/news"
            className="font-medium rounded-md text-xs bg-[#351F05] text-white py-3 px-4 hover:bg-[#351f05]/80"
          >
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
