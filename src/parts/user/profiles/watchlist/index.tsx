"use client";

import WatchlistCard from "@/components/card/watchlist-card";
import { CompanyStockList } from "@/constants";
import { ICompanyStockCard } from "@/interface/company-stock-card";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditPreference from "./edit-preference";
import DeleteContent from "@/components/delete-content";
interface iProp {}

const Watchlist: React.FC<iProp> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [option, setOption] = useState<string>("edit");
  const renderItem = () => {
    switch (option) {
      case "edit":
        return <EditPreference />;
      case "delete":
        return (
          <DeleteContent
            setOpen={() => setIsOpen(false)}
            header="Delete Preference"
            description="Are you sure you want to delete preference?"
            handleDelete={() => console.log("")}
          />
        );
      default:
        return <EditPreference />;
    }
  };

  return (
    <Box>
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
        {CompanyStockList.map((company: ICompanyStockCard, index: number) => (
          <GridItem key={index}>
            <WatchlistCard
              watchlist={company}
              handleDelete={() => {
                setOption("delete");
                setIsOpen(true);
              }}
              handlePreference={() => {
                setOption("edit");
                setIsOpen(true);
              }}
            />
          </GridItem>
        ))}
      </Grid>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-white p-[2rem] pt-[3.5rem]">
          {renderItem()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Watchlist;
