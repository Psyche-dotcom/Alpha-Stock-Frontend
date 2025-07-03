"use client";

import { useEffect, useState } from "react";
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

const MarketMoveContent = () => {
  const [marketFilter, setMarketFilter] = useState<string>("MostTraded");
  const [stockNewData, setNewStockData] = useState<MarketMove[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      const parsedCompleteData = JSON.parse(parsedData);
      const transformedData: MarketMove[] = parsedCompleteData
        .slice(0, 5)
        .map((stock: any) => ({
          id: stock.symbol,
          url: "/assets/images/card-image.png",
          agent: stock.symbol,
          price: stock.price.toFixed(2),
          name: stock.name,
          changeValue: stock.change.toFixed(2),
          changeProgress: stock.change > 0,
          changePercent: stock.changesPercentage.toFixed(2),
          changePercentProgress: stock.change > 0,
        }));

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
    refetchGetWishlistIsAdded(); // Ensure data is fresh
    setIsDeleteOpen(true);
  };

  const cellRenderers = {
    name: (record: MarketMove) => (
      <p
        className="font-semibold text-left text-blue-600 hover:underline cursor-pointer"
        onClick={() =>
          (window.location.href = `/user/company/${record.agent}?tab=metrics`)
        }
      >
        {record?.name}
      </p>
    ),
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
    watchlist: (record: MarketMove) => {
      // Check if current path is root. If so, return null to hide content.
      // This is a client-side check.
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
        return null;
      }

      const isInWishlist =
        getWishlistIsAddedData?.wishListId && currentSymbol === record.agent;

      return (
        <div className="flex justify-end pr-4 relative">
          <div
            className="group relative flex items-center"
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

            {/* Tooltip - shifted to the LEFT */}
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-40 whitespace-nowrap">
              {isInWishlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </div>
          </div>
        </div>
      );
    },
  };

  // Dynamically build columnOrder and columnLabels based on URL
  // This uses window.location.pathname which is only available on client side.
  const isRootPath = typeof window !== 'undefined' && window.location.pathname === '/';

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
    changePercent: "%CHANGE",
    watchlist: "", // This label will only be used if watchlist is pushed to columnOrder
  };

  // Add 'watchlist' column only if not on the root path
  if (!isRootPath) {
    columnOrder.push("watchlist");
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
      />

      {/* Dialogs - only render if not on the root path */}
      { !isRootPath && (
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
      )}
    </div>
  );
};

export default MarketMoveContent;