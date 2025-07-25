"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { marketMoveFilterList } from "@/constants";
import { IButtonFilter2 } from "@/interface/button-filter";
import { MarketMove } from "@/types";
import { ShineIcon } from "@/utils/icons";
import { Plus, Minus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useGetIsWishListAdded } from "@/services/stock";
import { useDeleteWishlist } from "@/services/wishlist";

import AddWishlist from "@/parts/user/profiles/watchlist/add-wishlist";
import DeleteContent from "@/components/delete-content";
import { cn } from "@/lib/utils";
interface MarketMoveContentProps {
  // No props needed if it's self-contained and always behaves the same way
}

const MarketMoveContent: React.FC<MarketMoveContentProps> = () => {
  const [marketFilter, setMarketFilter] = useState<string>("MostTraded");
  const [stockNewData, setNewStockData] = useState<MarketMove[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    getWishlistIsAddedData,
    setWishlistIsAddedFilter,
    refetchGetWishlistIsAdded,
  } = useGetIsWishListAdded({ enabled: !!currentSymbol });

  const { deleteWishlistPayload, deleteWishlistIsLoading } = useDeleteWishlist(
    () => {
      refetchGetWishlistIsAdded();
      setIsDeleteOpen(false);
    }
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stock/stream/market_performance?leaderType=${marketFilter}`
    );

    eventSource.onmessage = async (event) => {
      const parsedData = JSON.parse(event.data);
      const parsedCompleteData = JSON.parse(parsedData);

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

    eventSource.onerror = () => eventSource.close();
    return () => eventSource.close();
  }, [marketFilter]);

  const handleAddClick = (symbol: string) => {
    setCurrentSymbol(symbol);
    setWishlistIsAddedFilter({ symbol });
    setIsAddOpen(true);
  };

  const handleDeleteClick = (symbol: string) => {
    setCurrentSymbol(symbol);
    setWishlistIsAddedFilter({ symbol });
    refetchGetWishlistIsAdded();
    setIsDeleteOpen(true);
  };

  const marketMoveLinkFormatter = (record: MarketMove) => {
    return `/user/company/${record.agent}?tab=metrics`;
  };

  const cellRenderers = {
    name: (record: MarketMove) => {
      const nameWords = record?.name ? record.name.split(" ") : [];
      const shouldWrap = nameWords.length >= 2;

      return (
        <p
          className={cn(
            "font-semibold text-left",
            shouldWrap ? "whitespace-normal break-words" : "whitespace-nowrap"
          )}
        >
          {record?.name}
        </p>
      );
    },
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
      const isInWishlist =
        getWishlistIsAddedData?.wishListId && currentSymbol === record.agent;

      return (
        <div className="flex items-center justify-between px-2">
          <p
            className={`font-normal text-sm whitespace-nowrap ${
              record?.changePercentProgress
                ? "text-[#0E9F6E]"
                : "text-[#E74694]"
            }`}
          >
            {record?.changePercent} %
          </p>
          {/* Removed the isRootPath check here, so the buttons are always present */}
          <div
            className="group relative flex items-center"
            data-no-row-click="true"
            onClick={() =>
              isInWishlist
                ? handleDeleteClick(record.agent)
                : handleAddClick(record.agent)
            }
          >
            {isInWishlist ? (
              <Minus className="h-4 w-4 cursor-pointer" />
            ) : (
              <Plus className="h-4 w-4 cursor-pointer" />
            )}
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-40 whitespace-nowrap">
              {isInWishlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </div>
          </div>
        </div>
      );
    },
  };

  const columnOrder: (keyof MarketMove)[] = [
    "name",
    "symbol",
    "price",
    "change",
    "changePercent",
  ];

  const columnLabels = {
    name: "NAME",
    symbol: "SYMBOL",
    price: "LAST PRICE",
    change: "CHANGE",
    changePercent: "% CHANGE",
  };

  const headerCellClasses = {
    name: "text-left",
    symbol: "text-left",
    price: "text-center",
    change: "text-center",
    changePercent: "text-left",
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
              key={index}
              variant={filter.value === marketFilter ? "secondary" : "ghost"}
              btnText={filter.text}
              onClick={() => setMarketFilter(filter.value)}
              className={`font-medium text-xs ${
                filter.value === marketFilter
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
        headerCellClasses={headerCellClasses}
        isLink={true}
        linkFormatter={marketMoveLinkFormatter}
        fixed={false} // Assuming this table is not fixed width
      />

      <>
        <Dialog open={isAddOpen} onOpenChange={() => setIsAddOpen(false)}>
          <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
            {currentSymbol && (
              <AddWishlist
                symbol={currentSymbol}
                handleSuccess={() => {
                  refetchGetWishlistIsAdded();
                  setIsAddOpen(false);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteOpen} onOpenChange={() => setIsDeleteOpen(false)}>
          <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
            <DeleteContent
              setOpen={() => setIsDeleteOpen(false)}
              header="Remove Stock From Watchlist"
              description="Are you sure you want to delete stock wishlist?"
              handleDelete={() =>
                deleteWishlistPayload({
                  stockwishlistId: getWishlistIsAddedData?.wishListId,
                })
              }
              loading={deleteWishlistIsLoading}
            />
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default MarketMoveContent;
