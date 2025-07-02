"use client";

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineStyle,
  ColorType,
  CandlestickSeries,
  AreaSeries,
} from "lightweight-charts";
import { LineChart, CandlestickChart } from "lucide-react";

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

function FmpChart({ symbol }: FmpChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area" | "Candlestick"> | null>(null);

  const [chartType, setChartType] = useState<"candlesticks" | "area">("area");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FMP_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY;

  const fetchHistoricalData = useCallback(
    async (timeframe: string = "daily"): Promise<ChartDataBundle> => {
      setIsLoading(true);
      setError(null);

      console.log(`[FmpChart] Fetching data for symbol: ${symbol}, timeframe: ${timeframe}`);
      console.log(`[FmpChart] FMP_API_KEY loaded: ${!!FMP_API_KEY}`);

      if (!FMP_API_KEY) {
        const msg = "FMP API Key is not configured. Please set NEXT_PUBLIC_FMP_API_KEY in your .env.local file.";
        setError(msg);
        setIsLoading(false);
        console.error(`[FmpChart] ${msg}`);
        return { candlestickData: [], areaData: [] };
      }

      try {
        const cleanedSymbol = symbol.split(".")[0];
        let url = "";

        if (timeframe === "daily") {
          const fiveYearsAgo = new Date();
          fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
          const fromDate = fiveYearsAgo.toISOString().split('T')[0];
          const today = new Date().toISOString().split('T')[0];
          url = `https://financialmodelingprep.com/api/v3/historical-price-full/${cleanedSymbol}?from=${fromDate}&to=${today}&apikey=${FMP_API_KEY}`;
        } else {
          url = `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${cleanedSymbol}?apikey=${FMP_API_KEY}`;
        }

        console.log(`[FmpChart] FMP API Request URL: ${url}`);

        const response = await fetch(url);
        console.log(`[FmpChart] FMP API Response Status: ${response.status}`);

        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(
            `FMP API Error: ${response.status} ${response.statusText}. Detail: ${errorDetail}`
          );
        }

        const data = await response.json();
        console.log("[FmpChart] Raw FMP API Response Data (partial):",
          JSON.stringify(data, null, 2).substring(0, 500) + (JSON.stringify(data).length > 500 ? "..." : "")
        );

        let historicalData: FmpHistoricalPrice[] = [];

        if (timeframe === "daily") {
          if (data && typeof data === 'object' && Array.isArray(data.historical)) {
            historicalData = data.historical;
          } else {
            if (Array.isArray(data) && data.length === 0) {
                 console.warn(`[FmpChart] FMP daily historical API returned empty array for ${symbol}.`);
            } else {
                console.error("[FmpChart] FMP daily historical API: Unexpected data format or missing 'historical' array.", data);
            }
          }
        } else {
          if (Array.isArray(data)) {
            historicalData = data;
          } else {
            console.error("[FmpChart] FMP intraday historical API: Unexpected data format (not an array).", data);
          }
        }

        if (historicalData.length === 0) {
            console.warn(`[FmpChart] No historical data found for ${symbol} with timeframe ${timeframe} after parsing.`);
            setError(`No historical data available for ${symbol} for the selected period.`);
            return { candlestickData: [], areaData: [] };
        }

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

        console.log(`[FmpChart] Formatted Candlestick Data Length: ${formattedCandlestickData.length}`);
        console.log(`[FmpChart] Formatted Area Data Length: ${formattedAreaData.length}`);
        
        return {
          candlestickData: formattedCandlestickData,
          areaData: formattedAreaData,
        };
      } catch (err: any) {
        const msg = err.message || "An unknown error occurred while fetching and processing data.";
        setError(msg);
        console.error(`[FmpChart] Error in fetchHistoricalData:`, err);
        return { candlestickData: [], areaData: [] };
      } finally {
        setIsLoading(false);
      }
    },
    [symbol, FMP_API_KEY]
  );

  useEffect(() => {
    if (!chartContainerRef.current) {
      console.log("[FmpChart] Chart container ref not available yet for initialization.");
      return;
    }
    if (chartRef.current) {
        console.log("[FmpChart] Chart already initialized, skipping duplicate creation.");
        return;
    }

    console.log("[FmpChart] Initializing chart...");

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

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        const { clientWidth, clientHeight } = chartContainerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
            chartRef.current.applyOptions({
                width: clientWidth,
                height: clientHeight,
            });
            console.log(`[FmpChart] Chart resized to: ${clientWidth}x${clientHeight}`);
        }
      }
    };

    if (typeof ResizeObserver !== 'undefined' && chartContainerRef.current) {
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(chartContainerRef.current);
        console.log("[FmpChart] ResizeObserver attached.");
        return () => {
            console.log("[FmpChart] Disconnecting ResizeObserver and cleaning up chart.");
            resizeObserver.disconnect();
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
            }
        };
    } else {
        window.addEventListener("resize", handleResize);
        console.log("[FmpChart] Window resize listener attached (fallback).");
        return () => {
            window.removeEventListener("resize", handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
            }
        };
    }
  }, []);

  useEffect(() => {
    const updateChartSeries = async () => {
      if (!chartRef.current) {
        console.warn("[FmpChart] Chart not initialized yet, skipping series update.");
        return;
      }

      console.log("[FmpChart] Attempting to update chart series...");
      const { candlestickData, areaData } = await fetchHistoricalData("daily");

      if (error) {
          console.warn("[FmpChart] Skipping chart update because an error state is active.");
          return;
      }
      
      if (seriesRef.current) {
        console.log("[FmpChart] Removing existing series.");
        chartRef.current.removeSeries(seriesRef.current);
        seriesRef.current = null;
      }

      if (chartType === "candlesticks") {
        if (candlestickData.length > 0) {
          console.log(`[FmpChart] Adding CandlestickSeries with ${candlestickData.length} data points.`);
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
          console.warn("[FmpChart] No candlestick data available to add.");
          setError("No candlestick data available for this symbol.");
        }
      } else {
        if (areaData.length > 0) {
          console.log(`[FmpChart] Adding AreaSeries with ${areaData.length} data points.`);
          const newSeries = chartRef.current.addSeries(AreaSeries, {
            lineColor: "#2962FF",
            topColor: "rgba(41, 98, 255, 0.28)",
            bottomColor: "rgba(41, 98, 255, 0.05)",
            lineStyle: LineStyle.Solid,
          });
          newSeries.setData(areaData);
          seriesRef.current = newSeries;
        } else {
          console.warn("[FmpChart] No area chart data available to add.");
          setError("No area chart data available for this symbol.");
        }
      }

      if (chartRef.current && (candlestickData.length > 0 || areaData.length > 0)) {
        console.log("[FmpChart] Fitting chart content to data.");
        chartRef.current.timeScale().fitContent();
      } else {
        console.log("[FmpChart] No valid data received to fit chart content. Chart might remain empty.");
      }
    };

    updateChartSeries();
  }, [symbol, chartType, fetchHistoricalData, error]);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 text-gray-700">
        Loading chart data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-red-50 text-red-700 border border-red-300 rounded-md p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      <div className="absolute top-2 right-2 z-10 flex gap-2 bg-white/80 p-1 rounded shadow">
        <button
          onClick={() => setChartType("candlesticks")}
          className={`p-1 rounded hover:bg-gray-200 ${
            chartType === "candlesticks" ? "bg-gray-300" : ""
          }`}
          aria-label="Show Candlestick Chart"
          title="Show Candlestick Chart"
        >
          <CandlestickChart size={20} />
        </button>
        <button
          onClick={() => setChartType("area")}
          className={`p-1 rounded hover:bg-gray-200 ${
            chartType === "area" ? "bg-gray-300" : ""
          }`}
          aria-label="Show Area Chart"
          title="Show Area Chart"
        >
          <LineChart size={20} />
        </button>
      </div>

      <div
        ref={chartContainerRef}
        className="w-full h-full"
      />
    </div>
  );
}

export default memo(FmpChart);