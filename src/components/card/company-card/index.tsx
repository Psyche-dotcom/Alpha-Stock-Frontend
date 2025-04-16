import DeleteContent from "@/components/delete-content";
import { ICompanyCard } from "@/interface/stock";
import { useAddStockWishList, useGetIsWishListAdded } from "@/services/stock";
import { useDeleteWishlist } from "@/services/wishlist";
import { StarFillIcon, StarIcon } from "@/utils/icons";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CompanyCard: React.FC<ICompanyCard> = ({
  urlCompanyImg,
  companyName,
  price,
  symbol,
}) => {
  const [isWishListAddedState, setIsWishListAddedState] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { wishListAddData, wishListAddIsLoading, wishListAddPayload } =
    useAddStockWishList((res: { statusCode: number; result: any }) => {
      refetchGetWishlistIsAdded();
    });

  const {
    getWishlistIsAddedData,
    getWishlistIsAddedFilter,
    getWishlistIsAddedIsLoading,
    setWishlistIsAddedFilter,
    refetchGetWishlistIsAdded,
    getWishlistIsAddedError,
  } = useGetIsWishListAdded({ enabled: isWishListAddedState });
  useEffect(() => {
    setWishlistIsAddedFilter({ symbol: symbol });
    setIsWishListAddedState(true);
  }, []);
  const { deleteWishlistData, deleteWishlistIsLoading, deleteWishlistPayload } =
    useDeleteWishlist((res: any) => {
      refetchGetWishlistIsAdded();
      setIsOpen(false);
    });
  const payload = {
    stockwishlistId: getWishlistIsAddedData?.wishListId,
  };
  const renderItem = () => {
    return (
      <DeleteContent
        setOpen={() => setIsOpen(false)}
        header="Remove Stock From Watchlist"
        description="Are you sure you want to delete stock wishlist?"
        handleDelete={() => deleteWishlistPayload(payload)}
        loading={deleteWishlistIsLoading}
      />
    );
  };

  return (
    <Box className="flex-1 py-[10px] px-[17px] bg-white rounded-[12px] mb-2 lg:mb-0">
      <div className="flex items-center gap-[10px] mb-2.5">
        <div className=" rounded-xl p-2 bg-[#291804] ">
          <Image
            src={urlCompanyImg}
            alt="stock symbol"
            className=""
            width={100}
            height={100}
          />
        </div>
        <h2 className="xl:text-[36px] lg:text-[32px] text-[28px] font-bold text-[#111928]">
          {companyName}
        </h2>
      </div>
      <div className="justify-between md:flex items-center">
        <h6 className="font-normal text-xs  mb-2 md:mb-0 text-[#6B7280]">
          ${price} - Real Time Price Currency in USD
        </h6>
        {!getWishlistIsAddedData?.isAdded ? (
          <div
            className="flex item-center gap-2 font-medium text-sm text-[#291804]"
            onClick={() => {
              wishListAddPayload({
                stockSymbol: symbol,
                lowerLimit: Number(price) - 10,
                upperLimit: Number(price) + 10,
              });
            }}
          >
            <StarIcon />
            <p>Add To Watchlist</p>
          </div>
        ) : (
          <div
            className="flex item-center gap-2 font-medium text-sm text-[#291804]"
            onClick={() => setIsOpen(true)}
          >
            <StarFillIcon />
            <p>Remove From Watchlist</p>
          </div>
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
          {renderItem()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CompanyCard;
