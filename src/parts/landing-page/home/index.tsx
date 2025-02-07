import HeaderCard from "@/components/card/header-card";
import StockCard from "@/components/card/stock-card";
import ViewCard from "@/components/card/view-card";
import { marketList, stockList, trendingList } from "@/constants";
import { ICardView } from "@/interface/card-view";
import { IStock } from "@/interface/stock-view";
import MarketMoveContent from "../market-move";
import TradeDecision from "../trade-decision";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="mt-4 flex gap-3">
        <Button
          asChild
          variant="outline"
          className="font-medium py-3 px-5 border border-[#3A2206] text-[#3A2206] w-fit-content"
        >
          <Link passHref href={ROUTES.ADMIN.USERS}>
            Admin Page
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="font-medium py-3 px-5 border border-[#3A2206] text-[#3A2206] w-fit-content"
        >
          <Link passHref href={ROUTES.USER.COMPANYINFO}>
            User Page
          </Link>
        </Button>
      </div>
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
        {stockList.map((stock: IStock, index: number) => (
          <div key={index}>
            <StockCard stock={stock} />
          </div>
        ))}
      </div>
      <div className="mb-[64px]">
        <HeaderCard text="Trending Analysis" href="#" />
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {marketList.map((trend: ICardView, index: number) => (
            <div key={index}>
              <ViewCard card={trend} />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-[64px]">
        <HeaderCard text="Learn About The Market" href="#" />
        <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {marketList.map((trend: ICardView, index: number) => (
            <div key={index}>
              <ViewCard card={trend} />
            </div>
          ))}
        </div>
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
  );
};
export default Home;
