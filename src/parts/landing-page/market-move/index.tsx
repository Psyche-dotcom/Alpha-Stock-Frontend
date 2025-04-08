"use client";

import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { marketMoveFilterList } from "@/constants";
import { IButtonFilter2 } from "@/interface/button-filter";
import { IStock, IStockData } from "@/interface/stock-view";
import { MarketMove } from "@/types";
import { ShineIcon } from "@/utils/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

const MarketMoveContent = () => {
  const [marketFilter, setMarketFilter] = useState<string>("MostTraded");
  const [stockNewData, setNewStockData] = useState<MarketMove[]>([]);
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stock/stream/market_performance?leaderType=${marketFilter}`
    );

    eventSource.onmessage = (event) => {
      const stockPrice = event;
      const parsedData: any = JSON.parse(stockPrice.data);
      const parsedCompleteData: IStockData[] = JSON.parse(parsedData);
      const transformedData: MarketMove[] = parsedCompleteData
        .slice(0, 5)
        .map((stock: any) => ({
          id: stock.symbol,
          url: "/assets/images/card-image.png",
          agent: stock.symbol,
          price: stock.price.toFixed(2),
          changeValue: stock.change,
          changeProgress: stock.change > 0,
          changePercent: stock.changesPercentage,
          changePercentProgress: stock.change > 0,
        }));

      setNewStockData(transformedData);
    };

    eventSource.onerror = (err) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [marketFilter]);

  const cellRenderers = {
    symbol: (record: MarketMove) => (
      <div className="flex gap-2 items-center">
        <div className="h-6 w-6">
          <Image
            src={record?.url || "/assets/images/card-image.png"}
            alt={record?.agent}
            width={24}
            height={24}
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <p className="font-semibold text-xs text-[#111928]">{record?.agent}</p>
      </div>
    ),
    price: (item: MarketMove) => (
      <p className="font-semibold text-center">{item?.price}</p>
    ),
    change: (record: MarketMove) => (
      <p
        className={`font-normal text-sm text-center ${
          record?.changeProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.changeProgress ? "+" : "-"} {record?.changeValue}
      </p>
    ),
    changePercent: (record: MarketMove) => (
      <p
        className={`font-normal text-sm text-center ${
          record?.changePercentProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.changePercentProgress ? "+" : "-"}
        {record?.changePercent}
      </p>
    ),
  };

  const columnOrder: (keyof MarketMove)[] = [
    "symbol",
    "price",
    "change",
    "changePercent",
  ];

  const columnLabels = {
    symbol: "SYMBOL",
    price: "LAST PRICE",
    change: "CHANGE",
    changePercent: "%CHANGE",
  };

  return (
    <div className="bg-white pt-4 flex-1 rounded-md">
      <div className="mb-4 mx-4">
        <div className="flex items-center mb-4 gap-3">
          <ShineIcon />
          <p className="font-normal text-xs text-[#6B7280]">
            U.S. markets are open till 6:00 PM
          </p>
        </div>
        <div className="flex gap-2">
          {marketMoveFilterList.map((filter: IButtonFilter2, index: number) => (
            <Button
              variant={filter?.value === marketFilter ? "secondary" : "ghost"}
              key={index}
              btnText={filter?.text}
              onClick={() => setMarketFilter(filter?.value)}
              className={`font-medium text-xs ${
                filter?.value === marketFilter
                  ? "bg-[#351F05] text-white py-3 px-4"
                  : "p-0 text-[#6B7280]"
              }`}
            />
          ))}
        </div>
      </div>
      <TableComponent<MarketMove>
        tableData={stockNewData}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
      />
    </div>
  );
};

export default MarketMoveContent;
