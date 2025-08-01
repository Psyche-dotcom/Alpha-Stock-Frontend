"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import UserNavbar from "@/components/navbar/user";
import { useUserSession } from "@/app/context/user-context";
import RedirectContent from "@/components/redirect-modal";
import Footer from "@/parts/user/user_main_footer";
import TradingViewTickerTape from "@/components/tradingview-ticker-tape";
import ImageBackground from "@/components/image-background";
import FreeSubscriptionFloater from "@/components/FreeSubscriptionFloater";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { profileData } = useUserSession();

  // Get the free subscription end date directly from profileData
  const freeSubscriptionEndDate =
    profileData?.result?.freeSubcriptionEndDate || null;

  return (
    <Box className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <ImageBackground />
      {/* Foreground Content */}
      <Box className="relative z-10">
        <UserNavbar />
        {/* TradingView Ticker Tape below the navbar */}
        <TradingViewTickerTape />

        {/* Free Plan Floater - Rendered here */}
        {profileData && freeSubscriptionEndDate && (
          <FreeSubscriptionFloater
            freeSubscriptionEndDate={freeSubscriptionEndDate}
          />
        )}

        <Box className="px-4 md:px-6 lg:px-8 mt-6">{children}</Box>
        <RedirectContent />
        <Footer />
      </Box>
    </Box>
  );
};

export default LayoutContent;
