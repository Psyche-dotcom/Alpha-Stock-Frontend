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
  const { profileData } = useUserSession();
  const { getBlogsData, getBlogsError, getBlogsIsLoading, getBlogsPayload } =
    useGetBlogs((res: any) => {});

  useEffect(() => {
    const payload = {
      pageNumber: 1,
      perPageSize: 4,
      category: "All",
      status: "Published",
      userId: profileData?.results?.id || "",
      sinceDate: "",
      search: "",
    };
    getBlogsPayload(payload);
  }, [profileData?.results?.id]);

  return (
    <div className="xl:flex gap-4 h-full">
      <div className="flex-1">
        <div className="flex gap-4 flex-col md:flex-row xl:flex-col w-full md:mb-8 mb-4 xl:mb-0">
          <div className="mb-8 flex gap-4 h-ful md:h-auto flex-1">
            <div className="flex flex-col gap-4 h-[215px]">
              <div className="border border-[#614E38] pt-[1.75rem] p-6 rounded-[12px] bg-[#351F05] h-auto flex items-end">
                <Link href={"/user/company/aapl?tab=company-info"}>
                  <h6 className="text-2xl font-semibold text-[#fff] flex items-center gap-4">
                    Fundamentals Toolkit <RightArrowLong />
                  </h6>
                </Link>
              </div>
              <div className="border border-[#614E38] pt-[1.75rem] p-4 rounded-[12px] bg-white">
                <Link href={"/user/company/aapl?tab=metrics"}>
                  <h6 className="text-base font-semibold text-[#351F05] flex items-center gap-4">
                    Metrics <RightArrowLong />
                  </h6>
                </Link>
                <p className="font-normal text-sm text-[#614E38]">
                  Get visual insights to help inform your next investment
                  strategy.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-[#614E38] pt-[1.75rem] p-4 rounded-[12px] bg-white">
                <Link href={"/user/company/aapl?tab=financials"}>
                  <h6 className="text-base font-semibold text-[#351F05] flex items-center gap-4">
                    FInancials <RightArrowLong />
                  </h6>
                </Link>
              </div>
              <div className="border border-[#614E38] pt-[1.75rem] p-6 rounded-[12px] bg-[#351F05] h-auto flex items-end">
                <h6 className="text-2xl font-semibold text-[#fff] flex items-center gap-4">
                  Stock Analyser <RightArrowLong />
                </h6>
              </div>
            </div>
          </div>
          <MarketMoveContent />
        </div>
      </div>
      <div className="flex-1">
        <Grid
          gap={{ base: 2, md: 4 }}
          templateColumns={{
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          {getBlogsData?.result?.map((trend: IViewCard, index: number) => (
            <GridItem key={index}>
              <ViewCard card={trend} isAuth={true} />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default User;
