"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TableComponent } from "@/components/custom-table";
import { MarketMove } from "@/types";
import { cn } from "@/lib/utils";

export interface MarketDataTableProps {
  leaderType: "MostTraded" | "MostGainer" | "MostLoser"; 
}

const MarketDataTable: React.FC<MarketDataTableProps> = ({ leaderType }) => {
  const [stockNewData, setNewStockData] = useState<MarketMove[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stock/stream/market_performance?leaderType=${leaderType}`
    );

    eventSource.onmessage = async (event) => {
      const stockPrice = event;
      const parsedData: any = JSON.parse(stockPrice.data);
      const parsedCompleteData: any[] = JSON.parse(parsedData);

      const transformedDataPromises = parsedCompleteData
        .slice(0, 5)
        .map(async (stock: any) => {
          const symbol = stock.symbol;
          let imageUrl = "/assets/images/card-image.png";

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/stock/info/profile?symbol=${symbol}`
            );

            if (res.ok) {
              const data = await res.json();
              if (data?.result?.[0]?.image) {
                imageUrl = data.result[0].image;
              }
            } else {
              imageUrl = "";
            }
          } catch (error) {
            imageUrl = "";
          }

          return {
            id: symbol,
            url: imageUrl,
            agent: symbol,
            price: stock.price.toFixed(2),
            name: stock.name,
            changeValue: stock.change.toFixed(2),
            changeProgress: stock.change > 0,
            changePercent: stock.changesPercentage.toFixed(2),
            changePercentProgress: stock.change > 0,
          };
        });

      const transformedData: MarketMove[] = await Promise.all(
        transformedDataPromises
      );
      setNewStockData(transformedData);
    };

    eventSource.onerror = (err) => {
      console.error(`EventSource error for ${leaderType}:`, err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [leaderType]);

  const marketMoveLinkFormatter = (record: MarketMove) => {
    return `/user/company/${record.agent}?tab=metrics`;
  };

  const cellRenderers = {
    symbol: (record: MarketMove) => {
      const [imageError, setImageError] = useState(false);

      useEffect(() => {
        setImageError(false);
      }, [record.url]);

      return (
        <div className="flex items-center gap-2 justify-start">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {!imageError && record.url ? (
              <Image
                src={record.url}
                alt={record.agent}
                width={24}
                height={24}
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            )}
          </div>
          <p className="font-semibold text-xs text-[#111928] whitespace-nowrap">
            {record?.agent}
          </p>
        </div>
      );
    },
    price: (item: MarketMove) => (
      <p className="font-semibold text-center whitespace-nowrap">
        {item?.price} $
      </p>
    ),
    change: (record: MarketMove) => (
      <p
        className={`font-normal text-sm text-center whitespace-nowrap ${
          record?.changeProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.changeValue} $
      </p>
    ),
    changePercent: (record: MarketMove) => {
      return (
        <div className="text-center">
          <p
            className={`font-normal text-sm whitespace-nowrap ${
              record?.changePercentProgress
                ? "text-[#0E9F6E]"
                : "text-[#E74694]"
            }`}
          >
            {record?.changePercent} %
          </p>
        </div>
      );
    },
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
    changePercent: "% CHANGE",
  };

  const headerCellClasses = {
    symbol: "text-left",
    price: "text-center",
    change: "text-center",
    changePercent: "text-center",
  };

  return (
    <div className="bg-white pt-4 flex-1 rounded-md shadow-md">
      <TableComponent<MarketMove>
        tableData={stockNewData}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        headerCellClasses={headerCellClasses}
        isLink={true}
        linkFormatter={marketMoveLinkFormatter}
        fixed={false}
      />

      {/* Removed Dialog components entirely */}
    </div>
  );
};

export default MarketDataTable;
