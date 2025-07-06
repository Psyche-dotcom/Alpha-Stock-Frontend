"use client";

import WatchlistCard from "@/components/card/watchlist-card";
import { IWatchlistData } from "@/interface/company-stock-card";
import { Box, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditPreference from "./edit-preference";
import DeleteContent from "@/components/delete-content";
import { useDeleteWishlist, useGetWishlist } from "@/services/wishlist";
import WishlistSkeleton from "@/components/card/skeleton/wish-list";
interface iProp {}

const Watchlist: React.FC<iProp> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [option, setOption] = useState<string>("edit");
  const [watchlistId, setWatchlistId] = useState<string>("");
  const [selectedWatchlist, setSelectedWatchlist] =
    useState<IWatchlistData | null>(null);
  const {
    getWishlistData,
    getWishlistIsLoading,
    setWishlistFilter,
    refetchWishlist,
  } = useGetWishlist();
  const { deleteWishlistData, deleteWishlistIsLoading, deleteWishlistPayload } =
    useDeleteWishlist((res: any) => {
      refetchWishlist();
      setIsOpen(false);
    });
  const payload = { stockwishlistId: watchlistId };
  const renderItem = () => {
    switch (option) {
      case "edit":
        return (
          <EditPreference
            id={watchlistId}
            refetchWishlist={refetchWishlist}
            setIsOpen={setIsOpen}
            selectedWatchlist={selectedWatchlist}
          />
        );
      case "delete":
        return (
          <DeleteContent
            setOpen={() => setIsOpen(false)}
            header="Delete Preference"
            description="Are you sure you want to delete preference?"
            handleDelete={() => deleteWishlistPayload(payload)}
            loading={deleteWishlistIsLoading}
          />
        );
      default:
        return (
          <EditPreference
            id={watchlistId}
            refetchWishlist={refetchWishlist}
            setIsOpen={setIsOpen}
            selectedWatchlist={selectedWatchlist}
          />
        );
    }
  };

  if (getWishlistIsLoading) {
    return (
      <Grid
        gap={4}
        bg="#fff"
        p={4}
        borderRadius={"12px"}
        mb={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <WishlistSkeleton key={index} />
        ))}
      </Grid>
    );
  }
  if (getWishlistData.length < 1) {
    return (
      <Box className="flex flex-col justify-center items-center h-[50vh] text-center bg-white rounded-lg max-w-[1440px] mx-auto">
        <Icon boxSize={10} color="gray.400" mb={4} />
        <Text fontSize="lg" fontWeight="semibold" color="gray.500">
          Oops! No watchlist
        </Text>
      </Box>
    );
  }
  return (
    <Box className="max-w-[1440px] mx-auto">
      <Grid
        gap={4}
        bg="#fff"
        p={4}
        borderRadius={"12px"}
        mb={{ base: 4, sm: 6, md: 8, lg: 12, xl: 16 }}
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        {getWishlistData.map((company: IWatchlistData, index: number) => (
          <GridItem key={index}>
            <WatchlistCard
              watchlist={company}
              handleDelete={() => {
                setWatchlistId(company.id);
                setOption("delete");
                setIsOpen(true);
              }}
              handlePreference={() => {
                setWatchlistId(company.id);
                setOption("edit");
                setIsOpen(true);
                setSelectedWatchlist(company);
              }}
            />
          </GridItem>
        ))}
      </Grid>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
          {renderItem()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Watchlist;
