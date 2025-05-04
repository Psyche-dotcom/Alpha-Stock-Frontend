"use client";

import { Button } from "@/components/ui/button";
import { searchTab } from "@/constants";
import { useHandlePush } from "@/hooks/handlePush";
import { useSearchParams } from "next/navigation";
import CompanyInfo from "../company-info";
import Metrics from "../metrics";
import Financials from "../financials";
import Fundamentals from "../fundamentals";
import Analyzer from "../analyzer";
import { useUserSession } from "@/app/context/user-context";
import { useEffect } from "react";
interface iProps {
  symbol: string;
}

const Company: React.FC<iProps> = ({ symbol }) => {
  const param = useSearchParams();
  const activeTab = param.get("tab");
  const { handlePush } = useHandlePush();
  const { profileData, setRedirectModalOpen } = useUserSession();
  useEffect(() => {
    if (!profileData?.result?.isSubActive) {
      setRedirectModalOpen(true);
    }
  }, []);
  const renderItem = () => {
    switch (activeTab) {
      // case "company-info":
      //   return <CompanyInfo symbol={symbol} />;
      case "metrics":
        return <Metrics symbol={symbol} />;
      case "financials":
        return <Financials symbol={symbol} />;
      case "fundamentals":
        return <Fundamentals symbol={symbol} />;
      case "stock-analyser":
        return <Analyzer symbol={symbol} />;

      default:
        return <Metrics symbol={symbol} />;
    }
  };

  return (
    <>
      <div className="flex mt-5 max-w-[1440px] mx-auto">
        <div className="flex gap-2 mb-8 bg-white rounded-lg py-2 md:px-4 px-2">
          {searchTab.map((tab, index: number) => (
            <Button
              variant={
                activeTab === "" || tab?.value === activeTab
                  ? "secondary"
                  : "ghost"
              }
              key={index}
              btnText={tab?.title}
              onClick={() =>
                handlePush(`/user/company/${symbol}?tab=${tab.value}`)
              }
              className={`font-normal xl:text-base text-xs lg:text-base sm:text-sm ${
                tab?.value === activeTab
                  ? "bg-[#351F05] text-white py-3 sm:px-4 px-2"
                  : "p-0 text-[#6B7280]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto">{renderItem()}</div>
    </>
  );
};

export default Company;
