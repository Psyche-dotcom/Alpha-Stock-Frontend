import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaChartBar, FaChartArea, FaChartLine } from "react-icons/fa";
import { GiRadarDish, GiHeatHaze } from "react-icons/gi";
import { BiCandles } from "react-icons/bi";

interface StockData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

interface StockChartSwitcherProps {
  stockData: StockData[];
}

const StockChartSwitcher: React.FC<StockChartSwitcherProps> = ({
  stockData,
}) => {
  const formattedData = stockData.map((item) => ({
    x: item.date,
    y: [item.open, item.high, item.low, item.close],
  }));
  const [chartType, setChartType] = useState("candlestick");

  // Chart Options
  const candlestickOptions = {
    chart: { type: "candlestick", height: 350 },
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: true } },
  };

  const areaOptions = {
    chart: { type: "area", height: 350 },
    xaxis: { type: "datetime", categories: stockData.map((d) => d.date) },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0 },
    },
  };

  const lineOptions = {
    chart: { type: "line", height: 350 },
    xaxis: { type: "datetime", categories: stockData.map((d) => d.date) },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
  };

  const barOptions = {
    chart: { type: "bar", height: 350 },
    xaxis: { type: "datetime", categories: stockData.map((d) => d.date) },
    dataLabels: { enabled: false },
  };
  const radarOptions = {
    chart: { type: "radar", height: 350 },
    xaxis: { categories: stockData.map((d) => d.date) },
    dataLabels: { enabled: false },
  };

  const heatmapOptions = {
    chart: { type: "heatmap", height: 350 },
    xaxis: { type: "datetime", categories: stockData.map((d) => d.date) },
    dataLabels: { enabled: false },
    colorScale: {
      ranges: [{ from: 0, to: 100, color: "#00A100" }],
    },
  };
  return (
    <div className="p-4 space-y-4">
      {/* Switch Button */}
      <div className="flex justify-end space-x-2">
        <button
          className={`px-4 py-2 text-white rounded ${
            chartType === "candlestick" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setChartType("candlestick")}
        >
          <BiCandles />
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${
            chartType === "area" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setChartType("area")}
        >
          <FaChartArea />
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${
            chartType === "line" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setChartType("line")}
        >
          <FaChartLine />
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${
            chartType === "bar" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setChartType("bar")}
        >
          <FaChartBar />
        </button>{" "}
        <button
          className={`px-4 py-2 text-white rounded ${
            chartType === "radar" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setChartType("radar")}
        >
          <GiRadarDish />
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${
            chartType === "heatmap" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setChartType("heatmap")}
        >
          <GiHeatHaze />
        </button>
      </div>

      {/* Render Charts */}
      {chartType === "candlestick" && (
        <Chart
          //@ts-ignore
          options={candlestickOptions}
          series={[{ data: formattedData }]}
          type="candlestick"
          height={350}
        />
      )}
      {chartType === "area" && (
        <Chart
          //@ts-ignore
          options={areaOptions}
          series={[
            { name: "Close Price", data: stockData.map((d) => d.close) },
          ]}
          type="area"
          height={350}
        />
      )}
      {chartType === "line" && (
        <Chart
          //@ts-ignore
          options={lineOptions}
          series={[
            { name: "Close Price", data: stockData.map((d) => d.close) },
          ]}
          type="line"
          height={350}
        />
      )}
      {chartType === "bar" && (
        <Chart
          //@ts-ignore
          options={barOptions}
          series={[{ name: "Volume", data: stockData.map((d) => d.volume) }]}
          type="bar"
          height={350}
        />
      )}
      {chartType === "radar" && (
        <Chart
          //@ts-ignore
          options={radarOptions}
          series={[
            {
              name: "Stock Data",
              data: stockData.map((d) => ({ x: d.date, y: d.close })),
            },
          ]}
          type="radar"
          height={350}
        />
      )}
      {chartType === "heatmap" && (
        <Chart
          //@ts-ignore
          options={heatmapOptions}
          series={[
            {
              name: "Volume",
              data: stockData.map((d) => ({ x: d.date, y: d.volume })),
            },
          ]}
          type="heatmap"
          height={350}
        />
      )}
    </div>
  );
};

export default StockChartSwitcher;
