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
interface iProps {
  symbol: string;
}

const Company: React.FC<iProps> = ({ symbol }) => {
  const param = useSearchParams();
  const activeTab = param.get("tab");
  const { handlePush } = useHandlePush();

  const renderItem = () => {
    switch (activeTab) {
      case "company-info":
        return <CompanyInfo symbol={symbol} />;
      case "metrics":
        return <Metrics />;
      case "financials":
        return <Financials symbol={symbol} />;
      case "fundamentals":
        return <Fundamentals />;
      case "stock-analyser":
        return <Analyzer />;

      default:
        return <CompanyInfo symbol={symbol} />;
    }
  };

  return (
    <>
      <div className="flex">
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
      <div>{renderItem()}</div>
    </>
  );
};

export default Company;
