import DeleteContent from "@/components/delete-content";
import { ICompanyCard } from "@/interface/stock";
import { useGetIsWishListAdded } from "@/services/stock";
import { useDeleteWishlist } from "@/services/wishlist";
import { StarFillIcon, StarIcon } from "@/utils/icons";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddWishlist from "@/parts/user/profiles/watchlist/add-wishlist";

const CompanyCard: React.FC<ICompanyCard> = ({
  urlCompanyImg,
  companyName,
  price,
  symbol,
  exchange,
}) => {
  const [isWishListAddedState, setIsWishListAddedState] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);
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
        {/* Fixed size container for the image with a thin black border */}
        <div
          className="rounded-full flex-shrink-0" // Keeps the div itself rounded
          style={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #111928", // This creates the thin black line
            // Removed p-1 and bg-[#111928] completely
          }}
        >
          {!imageError ? (
            <Image
              src={urlCompanyImg}
              alt="stock symbol"
              style={{
                borderRadius: "9999px", // Ensure the image itself is circular
              }}
              width={46} // Reduced to 46px to accommodate the 1px border (48 - 1*2)
              height={46} // Reduced to 46px
              onError={() => setImageError(true)} // Set error state if image fails
            />
          ) : (
            // Fallback content when image fails to load
            <div className="w-[46px] h-[46px] rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
              N/A
            </div>
          )}
        </div>
        <div>
          <h2 className="xl:text-[36px] lg:text-[32px] text-[28px] font-bold text-[#111928]">
            {companyName}
          </h2>
          <p className="text-xs text-[#6B7280]">Market | {exchange}</p>
        </div>
      </div>
      <div className="justify-between md:flex items-center">
        <h6 className="font-normal text-xs mb-2 md:mb-0 text-[#6B7280]">
          Currency in USD
        </h6>
        {!getWishlistIsAddedData?.isAdded ? (
          <div
            className="flex item-center gap-2 font-medium text-sm text-[#291804] cursor-pointer"
            onClick={() => {
              setIsAddOpen(true);
            }}
          >
            <StarIcon />
            <p>Add To Watchlist</p>
          </div>
        ) : (
          <div
            className="flex item-center gap-2 font-medium text-sm text-[#291804] cursor-pointer"
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
      <Dialog open={isAddOpen} onOpenChange={() => setIsAddOpen(false)}>
        <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
          <AddWishlist
            handleSuccess={() => {
              refetchGetWishlistIsAdded();
              setIsAddOpen(false);
            }}
            symbol={symbol}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CompanyCard;
