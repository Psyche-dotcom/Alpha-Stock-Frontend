"use client"; // This line should be at the very top of the file

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineStyle,
  ColorType,
  CandlestickSeries, // Make sure these are imported for use as type arguments
  AreaSeries, // Make sure these are imported for use as type arguments
} from "lightweight-charts";
import { LineChart, CandlestickChart } from "lucide-react";

// --- Interfaces ---
interface FmpHistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface AreaChartData {
  time: string;
  value: number;
}

interface ChartDataBundle {
  candlestickData: CandlestickChartData[];
  areaData: AreaChartData[];
}

interface FmpChartProps {
  symbol: string;
}

// --- FmpChart Component ---
function FmpChart({ symbol }: FmpChartProps) {
  // --- Component-level Logs ---
  console.log("FmpChart: Component Rendered.");
  console.log("FmpChart: Symbol received:", symbol);

  // --- Refs ---
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area" | "Candlestick"> | null>(null);

  // --- State ---
  const [chartType, setChartType] = useState<"candlesticks" | "area">("area");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Environment Variable Access ---
  const FMP_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY;

  // --- API Key Check Logs ---
  // console.log(
  //   `[FmpChart] Component Render: NEXT_PUBLIC_FMP_API_KEY value is: ${
  //     FMP_API_KEY ? FMP_API_KEY.substring(0, 5) + "..." : "undefined"
  //   }`
  // );
  // console.log(
  //   `[FmpChart] Component Render: FMP_API_KEY is ${
  //     FMP_API_KEY ? "DEFINED" : "UNDEFINED"
  //   }`
  // );

  // ADDED LOG: Before useCallback definition
  console.log("[FmpChart] Before fetchHistoricalData useCallback definition.");

  // --- fetchHistoricalData Function (Memoized with useCallback) ---
  const fetchHistoricalData = useCallback(
    async (timeframe: string = "daily"): Promise<ChartDataBundle> => {
      // THIS IS THE LINE WE ARE TRYING TO SEE IN THE CONSOLE
      console.log(
        "[FmpChart] === fetchHistoricalData started (Inside useCallback) ==="
      );
      console.log("[FmpChart] fetchHistoricalData: Setting isLoading to true.");
      setIsLoading(true);
      console.log("[FmpChart] fetchHistoricalData: Clearing previous error.");
      setError(null);

      // --- Pre-fetch validation ---
      if (!symbol || typeof symbol !== "string" || symbol.trim() === "") {
        const msg = "[FmpChart] fetchHistoricalData: Invalid symbol provided.";
        setError(msg);
        setIsLoading(false);
        console.error(msg, { symbol });
        return { candlestickData: [], areaData: [] };
      }

      if (!FMP_API_KEY) {
        const msg =
          "FMP API Key is not configured. Please set NEXT_PUBLIC_FMP_API_KEY in your .env.local file.";
        setError(msg);
        setIsLoading(false);
        console.error(`[FmpChart] ${msg}`);
        return { candlestickData: [], areaData: [] };
      }

      console.log(
        `[FmpChart] Fetching data for symbol: ${symbol}, timeframe: ${timeframe}`
      );
      console.log(
        `[FmpChart] FMP_API_KEY loaded within useCallback: ${!!FMP_API_KEY}`
      );

      try {
        console.log(
          "[FmpChart] fetchHistoricalData: Inside try block, before cleanSymbol."
        );
        const cleanedSymbol = symbol.split(".")[0];
        console.log(
          `[FmpChart] fetchHistoricalData: Cleaned symbol: ${cleanedSymbol}`
        );

        let url = "";

        // --- URL Construction ---
        if (timeframe === "daily") {
          const fiveYearsAgo = new Date();
          fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
          const fromDate = fiveYearsAgo.toISOString().split("T")[0];
          const today = new Date().toISOString().split("T")[0];
          url = `https://financialmodelingprep.com/api/v3/historical-price-full/${cleanedSymbol}?from=${fromDate}&to=${today}&apikey=${FMP_API_KEY}`;
        } else {
          // Default to 1-minute historical data if not daily, ensure it's a valid timeframe for FMP
          url = `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${cleanedSymbol}?apikey=${FMP_API_KEY}`;
        }

        console.log(`[FmpChart] FMP API Request URL: ${url}`);

        // --- Fetching data ---
        const response = await fetch(url);
        console.log(`[FmpChart] FMP API Response Status: ${response.status}`);

        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(
            `FMP API Error: ${response.status} ${response.statusText}. Detail: ${errorDetail}`
          );
        }

        const data = await response.json();
        console.log(
          "[FmpChart] Raw FMP API Response Data (partial):",
          JSON.stringify(data, null, 2).substring(0, 500) +
            (JSON.stringify(data).length > 500 ? "..." : "")
        );

        let historicalData: FmpHistoricalPrice[] = [];

        // --- Data Parsing ---
        if (timeframe === "daily") {
          if (
            data &&
            typeof data === "object" &&
            Array.isArray(data.historical)
          ) {
            historicalData = data.historical;
          } else {
            if (Array.isArray(data) && data.length === 0) {
              console.warn(
                `[FmpChart] FMP daily historical API returned empty array for ${symbol}.`
              );
            } else {
              console.error(
                "[FmpChart] FMP daily historical API: Unexpected data format or missing 'historical' array.",
                data
              );
            }
          }
        } else {
          // Intraday historical data
          if (Array.isArray(data)) {
            historicalData = data;
          } else {
            console.error(
              "[FmpChart] FMP intraday historical API: Unexpected data format (not an array).",
              data
            );
          }
        }

        // --- Handle No Data ---
        if (historicalData.length === 0) {
          const warnMsg = `[FmpChart] No historical data found for ${symbol} with timeframe ${timeframe} after parsing.`;
          console.warn(warnMsg);
          setError(`No data available for ${symbol} for the selected period.`);
          return { candlestickData: [], areaData: [] };
        }

        // --- Data Sorting and Formatting ---
        const sortedData = historicalData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const formattedCandlestickData: CandlestickChartData[] = sortedData.map(
          (item) => ({
            time: item.date,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          })
        );

        const formattedAreaData: AreaChartData[] = sortedData.map((item) => ({
          time: item.date,
          value: item.close,
        }));

        console.log(
          `[FmpChart] Formatted Candlestick Data Length: ${formattedCandlestickData.length}`
        );
        console.log(
          `[FmpChart] Formatted Area Data Length: ${formattedAreaData.length}`
        );

        return {
          candlestickData: formattedCandlestickData,
          areaData: formattedAreaData,
        };
      } catch (err: any) {
        // --- Catching errors during fetch/processing ---
        const msg =
          err.message ||
          "An unknown error occurred while fetching and processing data.";
        setError(msg);
        console.error(`[FmpChart] fetchHistoricalData: CAUGHT ERROR:`, err);
        return { candlestickData: [], areaData: [] };
      } finally {
        // --- Finalizing fetch operation ---
        console.log(
          "[FmpChart] fetchHistoricalData: In finally block, setting isLoading to false."
        );
        setIsLoading(false); // Always set loading to false when done
      }
    },
    [symbol, FMP_API_KEY] // Dependencies for useCallback
  );

  // ADDED LOG: After useCallback definition
  console.log("[FmpChart] After fetchHistoricalData useCallback definition.");

  // --- useEffect for Chart Initialization ---
  useEffect(() => {
    // Failsafe 1: Ensure ref is available
    if (!chartContainerRef.current) {
      console.warn(
        "[FmpChart] Chart initialization useEffect: Chart container ref not available yet."
      );
      return;
    }
    // Failsafe 2: Prevent duplicate chart creation
    if (chartRef.current) {
      console.log(
        "[FmpChart] Chart initialization useEffect: Chart already initialized, skipping duplicate creation."
      );
      return;
    }

    console.log("[FmpChart] Initializing chart...");

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#e0e0e0" },
        horzLines: { color: "#e0e0e0" },
      },
      crosshair: {
        mode: 0,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        visible: true,
        borderColor: "#d1d4dc",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    chartRef.current = chart;
    console.log("[FmpChart] Chart initialized successfully.", chartRef.current);

    // --- Resize handling ---
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        const { clientWidth, clientHeight } = chartContainerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          chartRef.current.applyOptions({
            width: clientWidth,
            height: clientHeight,
          });
          console.log(
            `[FmpChart] Chart resize handler: Resized to: ${clientWidth}x${clientHeight}`
          );
        }
      }
    };

    // Failsafe 3: Use ResizeObserver if available, fallback to window resize
    if (typeof ResizeObserver !== "undefined" && chartContainerRef.current) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(chartContainerRef.current);
      console.log("[FmpChart] ResizeObserver attached for chart container.");
      return () => {
        console.log(
          "[FmpChart] Chart initialization useEffect cleanup: Disconnecting ResizeObserver and cleaning up chart."
        );
        resizeObserver.disconnect();
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        }
      };
    } else {
      window.addEventListener("resize", handleResize);
      console.log(
        "[FmpChart] Window resize listener attached (fallback for chart container)."
      );
      return () => {
        window.removeEventListener("resize", handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount

  // --- useEffect for Fetching and Updating Chart Series ---
  useEffect(() => {
    const updateChartSeries = async () => {
      console.log("[FmpChart] updateChartSeries useEffect triggered.");

      // Failsafe 1: Ensure chart is initialized before attempting to update series
      if (!chartRef.current) {
        console.warn(
          "[FmpChart] updateChartSeries: Chart not initialized yet, skipping series update."
        );
        return;
      }

      // Failsafe 2: Ensure symbol is valid before attempting data fetch
      if (!symbol || typeof symbol !== "string" || symbol.trim() === "") {
        console.warn(
          "[FmpChart] updateChartSeries: Invalid symbol for data fetch, skipping."
        );
        setError("Cannot load chart data: Invalid stock symbol.");
        setIsLoading(false);
        return;
      }

      console.log("[FmpChart] Attempting to update chart series...");
      // ADDED LOG: Just before calling fetchHistoricalData
      console.log(
        "[FmpChart] updateChartSeries: Preparing to call fetchHistoricalData..."
      );

      let candlestickData: CandlestickChartData[] = [];
      let areaData: AreaChartData[] = [];

      try {
        // Failsafe 3: Outer try-catch to catch any unexpected synchronous errors
        // or rejections from fetchHistoricalData before its internal catch.
        const dataBundle = await fetchHistoricalData("daily");
        candlestickData = dataBundle.candlestickData;
        areaData = dataBundle.areaData;
        console.log(
          "[FmpChart] fetchHistoricalData has returned successfully."
        );
      } catch (e: any) {
        console.error(
          "[FmpChart] updateChartSeries: Caught error during fetchHistoricalData call:",
          e
        );
        setError(
          e.message || "An unexpected error occurred while fetching chart data."
        );
        setIsLoading(false);
        return;
      }

      // Failsafe 4: Do not proceed if an error was set by fetchHistoricalData or locally
      if (error) {
        // Check error state after async operation completes
        console.warn(
          "[FmpChart] updateChartSeries: Skipping chart update because an error state is active."
        );
        setIsLoading(false); // Ensure loading is off if an error is present
        return;
      }

      // Failsafe 5: Remove existing series if present to avoid duplicates
      if (seriesRef.current) {
        console.log("[FmpChart] updateChartSeries: Removing existing series.");
        chartRef.current.removeSeries(seriesRef.current);
        seriesRef.current = null;
      }

      // --- Add Series Based on Chart Type ---
      if (chartType === "candlesticks") {
        if (candlestickData.length > 0) {
          console.log(
            `[FmpChart] updateChartSeries: Adding CandlestickSeries with ${candlestickData.length} data points.`
          );
          // CORRECTED LINE: Use addSeries and pass CandlestickSeries
          const newSeries = chartRef.current.addSeries(CandlestickSeries, {
            upColor: "#22ab94",
            downColor: "#f7525f",
            borderUpColor: "#22ab94",
            borderDownColor: "#f7525f",
            wickUpColor: "#22ab94",
            wickDownColor: "#f7525f",
          });
          newSeries.setData(candlestickData);
          seriesRef.current = newSeries;
        } else {
          console.warn(
            "[FmpChart] updateChartSeries: No candlestick data available to add."
          );
          setError("No candlestick data available for this symbol or period.");
        }
      } else {
        // Default to area chart
        if (areaData.length > 0) {
          console.log(
            `[FmpChart] updateChartSeries: Adding AreaSeries with ${areaData.length} data points.`
          );
          // CORRECTED LINE: Use addSeries and pass AreaSeries
          const newSeries = chartRef.current.addSeries(AreaSeries, {
            lineColor: "#2962FF",
            topColor: "rgba(41, 98, 255, 0.28)",
            bottomColor: "rgba(41, 98, 255, 0.05)",
            lineStyle: LineStyle.Solid,
          });
          newSeries.setData(areaData);
          seriesRef.current = newSeries;
        } else {
          console.warn(
            "[FmpChart] updateChartSeries: No area chart data available to add."
          );
          setError("No area chart data available for this symbol or period.");
        }
      }

      // --- Fit Chart Content ---
      if (
        chartRef.current &&
        (candlestickData.length > 0 || areaData.length > 0)
      ) {
        console.log(
          "[FmpChart] updateChartSeries: Fitting chart content to data."
        );
        chartRef.current.timeScale().fitContent();
      } else {
        console.log(
          "[FmpChart] updateChartSeries: No valid data received to fit chart content. Chart might remain empty."
        );
      }

      // Ensure loading is off after chart update attempts
      console.log(
        "[FmpChart] updateChartSeries: Finished, setting isLoading to false."
      );
      setIsLoading(false);
    };

    updateChartSeries();
  }, [symbol, chartType, fetchHistoricalData]);

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 text-gray-700 font-semibold text-lg animate-pulse">
        Loading chart data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-red-50 text-red-700 border border-red-300 rounded-md p-4 text-center">
        Error loading chart: {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      {/* Chart Type Toggle Buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-2 bg-white/80 p-1 rounded shadow-md">
        <button
          onClick={() => setChartType("candlesticks")}
          className={`p-2 rounded transition-all duration-200 ${
            chartType === "candlesticks"
              ? "bg-[#351F05] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Show Candlestick Chart"
          title="Show Candlestick Chart"
        >
          <CandlestickChart size={20} />
        </button>
        <button
          onClick={() => setChartType("area")}
          className={`p-2 rounded transition-all duration-200 ${
            chartType === "area"
              ? "bg-[#351F05] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Show Area Chart"
          title="Show Area Chart"
        >
          <LineChart size={20} />
        </button>
      </div>

      {/* Chart Container */}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}

export default memo(FmpChart);
