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

  console.log(profileData, "Profile Data in LayoutContent");

  // Determine freeSubscriptionEndDate based on profileData
  const freeSubscriptionEndDate = (() => {
    // If the user is subscribed, or if profileData/result is not available,
    // or if there's no specific freeSubscriptionEndDate in profileData,
    // then the floater should not be shown.
    if (
      profileData?.result?.isSubActive ||
      !profileData?.result?.freeSubscriptionEndDate
    ) {
      return null;
    }
    // If the user is NOT subscribed and freeSubscriptionEndDate exists in profileData, use it.
    return profileData.result.freeSubscriptionEndDate;
  })();

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
        {profileData && ( // Ensure profileData is loaded before rendering
          <FreeSubscriptionFloater
            isSubActive={profileData.result?.isSubActive || false}
            freeSubscriptionEndDate={freeSubscriptionEndDate || ""}
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
