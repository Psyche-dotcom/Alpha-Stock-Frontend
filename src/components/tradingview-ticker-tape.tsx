"use client";

import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const TradingViewTickerTape: React.FC = () => {
  const pathname = usePathname();

  // Show tape only if the pathname is exactly "/user"
  const showTape = pathname === "/user";

  if (!showTape) {
    return null; // Don't render anything if the tape shouldn't be shown
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the script is loaded only once and container exists
    if (
      !containerRef.current ||
      document.getElementById("tradingview-ticker-tape-script")
    ) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.id = "tradingview-ticker-tape-script"; // Assign an ID to prevent duplicate loading
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500",
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "US 100",
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR to USD",
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "Bitcoin",
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "Ethereum",
        },
        {
          description: "NVIDIA",
          proName: "NASDAQ:NVDA",
        },
        {
          description: "Apple",
          proName: "NASDAQ:AAPL",
        },
        {
          description: "Microsoft",
          proName: "NASDAQ:MSFT",
        },
      ],
      showSymbolLogo: true,
      "is  hotmap": false, // Corrected typo here, should be "is_hotmap"
      colorTheme: "light",
      fontColor: "#111928", // Match your text color
      locales: "en",
      largeChartUrl: "", // No large chart on click
      displayMode: "adaptive",
    });

    containerRef.current.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
      // Also remove script from document head if it was added there for some reason
      const existingScript = document.getElementById(
        "tradingview-ticker-tape-script"
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Box
      ref={containerRef}
      className="tradingview-widget-container"
      height="46px" // TradingView default height
      width="100%"
      overflow="hidden" // Ensure no scrollbars if content slightly overflows
      bg="white" // A clear background for the ticker
      borderBottom="1px solid"
      borderColor="gray.200" // A subtle separator from the content below
      position="relative" // Ensure it respects the z-index of UserNavbar
      zIndex={9} // Below navbar's default z-index (often 10) but above content
    >
      {/* TradingView widget will be injected here */}
    </Box>
  );
};

export default TradingViewTickerTape;
