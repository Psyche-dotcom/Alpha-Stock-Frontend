"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { LineChart, CandlestickChart } from "lucide-react"; 

function TradingViewWidget({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement | null>(null);
  const [chartType, setChartType] = useState<"candlesticks" | "area">("area");

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = ""; // clear chart before re-render

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.width = "100%";
    widgetDiv.style.height = "100%";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;

    const cleanedSymbol = symbol.split(".")[0];

    const config = {
      symbols: [[cleanedSymbol, `${cleanedSymbol}|1D`]],
      colorTheme: "light",
      isTransparent: false,
      autosize: true,
      chartType: chartType,
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "120m|1M", "all|1M"],
      locale: "en",
      width: "100%",
      height: "100%",
      fontFamily: "Trebuchet MS, Roboto, sans-serif",
      scalePosition: "right",
      scaleMode: "Normal",
      valuesTracking: "1",
      chartOnly: true,
      fontSize: "10",
      hideSymbolLogo: false,
      backgroundColor: "#ffffff",
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
    };

    script.innerHTML = JSON.stringify(config);
    container.current.appendChild(widgetDiv);
    container.current.appendChild(script);
  }, [symbol, chartType]);

  return (
    <div className="relative w-full h-[400px]">
      {/* Toggle Chart Type Icons */}
      <div className="absolute top-2 right-2 z-10 flex gap-2 bg-white/80 p-1 rounded shadow">
        <button
          onClick={() => setChartType("candlesticks")}
          className={`p-1 rounded hover:bg-gray-200 ${
            chartType === "candlesticks" ? "bg-gray-300" : ""
          }`}
        >
          <CandlestickChart size={20} />
        </button>
        <button
          onClick={() => setChartType("area")}
          className={`p-1 rounded hover:bg-gray-200 ${
            chartType === "area" ? "bg-gray-300" : ""
          }`}
        >
          <LineChart size={20} />
        </button>
      </div>

      {/* TradingView Chart Container */}
      <div
        className="tradingview-widget-container w-full h-full"
        ref={container}
      />
    </div>
  );
}

export default memo(TradingViewWidget);
