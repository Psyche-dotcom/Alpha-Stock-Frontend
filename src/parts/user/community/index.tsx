"use client";

import { Box } from "@chakra-ui/react";
import CommunityLeftContent from "./left-content";
import CommunityMain from "./main";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useMediaSize from "@/hooks/use-mediasize";
import { useUserSession } from "@/app/context/user-context";

const Community = () => {
  const isAbove768 = useMediaSize(768);
  const { isOpen, setIsOpen } = useUserSession();

  useEffect(() => {
    if (isAbove768) {
      setIsOpen(false);
    }
  }, [isAbove768]);
  return (
    <Box
      display="flex"
      gap={4}
      overflowY={"auto"}
      my={4}
      justifyContent={"end"}
    >
      <div className="md:block hidden">
        <CommunityLeftContent />
      </div>
      <Box
        flex="1"
        marginLeft={{ base: "16px", md: "280px", lg: "349px" }}
        justifySelf={"end"}
      >
        <CommunityMain />
      </Box>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent
          className={`left-0 w-[20rem] h-screen overflow-y-auto bg-white p-[2rem] pt-[3.5rem]`}
        >
          <CommunityLeftContent />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Community;
