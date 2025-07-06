"use client";

import { useEffect, useState } from "react";
import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { marketMoveFilterList } from "@/constants";
import { IButtonFilter2 } from "@/interface/button-filter";
import { MarketMove } from "@/types"; // Ensure MarketMove extends DataItem and has an 'id' property
import { ShineIcon } from "@/utils/icons";
import { Plus, Minus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetIsWishListAdded } from "@/services/stock";
import { useDeleteWishlist } from "@/services/wishlist";
import AddWishlist from "@/parts/user/profiles/watchlist/add-wishlist";
import DeleteContent from "@/components/delete-content";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from 'react';

const MarketMoveContent = () => {
  const [marketFilter, setMarketFilter] = useState<string>("MostTraded");
  const [stockNewData, setNewStockData] = useState<MarketMove[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  const {
    getWishlistIsAddedData,
    setWishlistIsAddedFilter,
    refetchGetWishlistIsAdded,
  } = useGetIsWishListAdded({
    enabled: !!currentSymbol,
  });

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
      console.log("Parsed Complete Data", parsedCompleteData);

      const transformedDataPromises = parsedCompleteData
        .slice(0, 5) // Limit to first 5 items as per your original code
        .map(async (stock: any) => {
          const symbol = stock.symbol;
          // Default placeholder, which might still be shown if the API doesn't return an image,
          // but the onError will handle if this URL itself is broken.
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
              console.warn(
                `Failed to fetch profile for ${symbol}. Status: ${res.status}`
              );
              // If fetch fails, explicitly set to an empty string or null
              // This helps distinguish between 'no image URL from API' vs 'broken image URL'
              imageUrl = ''; // Set to empty string to trigger fallback in StockLogo
            }
          } catch (error) {
            console.error(`Error fetching profile for ${symbol}:`, error);
            imageUrl = ''; // Set to empty string on network/parsing error
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
    name: (record: MarketMove) => (
      <p className="font-semibold text-left text-blue-600 hover:underline">
        {record?.name}
      </p>
    ),
    logo: (record: MarketMove) => {
      const StockLogo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
        const [imageError, setImageError] = useState(false);

        useEffect(() => {
          setImageError(false); // Reset error state when src changes
        }, [src]);

        // If there's an error OR the src is explicitly empty/null (from API fetch error/no image)
        if (imageError || !src) {
          // Return the placeholder circle without the Image component
          return (
            <div className="flex items-center justify-center w-11 h-11 rounded-full overflow-hidden bg-gray-100">
              {/* Optional: Add a small placeholder icon or text here if desired, e.g., <span className="text-sm text-gray-500">?</span> */}
            </div>
          );
        }

        return (
          <div className="flex items-center justify-center w-11 h-11 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={src}
              alt={alt}
              width={44}
              height={44}
              className="object-cover"
              onError={() => setImageError(true)} // Set error state on image load failure
            />
          </div>
        );
      };

      return <StockLogo src={record.url} alt={record.agent} />;
    },
    symbol: (record: MarketMove) => (
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xs text-center text-[#111928]">
          {record?.agent}
        </p>
      </div>
    ),
    price: (item: MarketMove) => (
      <p className="font-semibold text-center">{item?.price} $</p>
    ),
    change: (record: MarketMove) => (
      <p
        className={`font-normal text-sm text-center ${
          record?.changeProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.changeValue} $
      </p>
    ),
    changePercent: (record: MarketMove) => (
      <p
        className={`font-normal text-sm text-center ${
          record?.changePercentProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.changePercent} %
      </p>
    ),
    w: (record: MarketMove) => {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        return null;
      }

      const isInWishlist =
        getWishlistIsAddedData?.wishListId && currentSymbol === record.agent;

      return (
        <div className="flex justify-end relative">
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
              <Minus className="h-4 w-4 text-red-500 cursor-pointer" />
            ) : (
              <Plus className="h-4 w-4 text-green-600 cursor-pointer" />
            )}

            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-40 whitespace-nowrap">
              {isInWishlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </div>
          </div>
        </div>
      );
    },
  };

  const isRootPath =
    typeof window !== "undefined" && window.location.pathname === "/";

  const columnOrder: (keyof MarketMove)[] = [
    "name",
    "logo",
    "symbol",
    "price",
    "change",
    "changePercent",
  ];

  const columnLabels = {
    name: "NAME",
    logo: "LOGO",
    symbol: "SYMBOL",
    price: "LAST PRICE",
    change: "CHANGE",
    changePercent: "%CHANGE",
    w: "",
  };

  const headerCellClasses = {
    logo: "text-center",
    price: "text-center",
    change: "text-center",
    changePercent: "text-center",
    w: "text-start",
  };

  if (!isRootPath) {
    columnOrder.push("w");
  }

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
      />

      {!isRootPath && (
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

          <Dialog
            open={isDeleteOpen}
            onOpenChange={() => setIsDeleteOpen(false)}
          >
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
      )}
    </div>
  );
};

export default MarketMoveContent;