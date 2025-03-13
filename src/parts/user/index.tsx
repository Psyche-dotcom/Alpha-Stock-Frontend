import ViewCard from "@/components/card/view-card";
import { marketList } from "@/constants";
import { IViewCard } from "@/interface/card-view";
import { Grid, GridItem } from "@chakra-ui/react";
import MarketMoveContent from "../landing-page/market-move";
import { RightArrowLong } from "@/utils/icons";

const User: React.FC = () => {
  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1">
        <div className="mb-8 flex gap-4">
          <div className="flex flex-col gap-4 h-[215px]">
            <div className="border border-[#614E38] pt-[1.75rem] p-6 rounded-[12px] bg-[#351F05] h-auto flex items-end">
              <h6 className="text-2xl font-semibold text-[#fff] flex items-center gap-4">
                Fundamentals Toolkit <RightArrowLong />
              </h6>
            </div>
            <div className="border border-[#614E38] pt-[1.75rem] p-4 rounded-[12px] bg-white">
              <h6 className="text-base font-semibold text-[#351F05] flex items-center gap-4">
                Metrics <RightArrowLong />
              </h6>
              <p className="font-normal text-sm text-[#614E38]">
                Get visual insights to help inform your next investment
                strategy.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border border-[#614E38] pt-[1.75rem] p-4 rounded-[12px] bg-white">
              <h6 className="text-base font-semibold text-[#351F05] flex items-center gap-4">
                FInancials <RightArrowLong />
              </h6>
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
      <div className="flex-1">
        <Grid
          gap={{ base: 2, md: 4 }}
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          {marketList.map((trend: IViewCard, index: number) => (
            <GridItem key={index}>
              <ViewCard card={trend} />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default User;
