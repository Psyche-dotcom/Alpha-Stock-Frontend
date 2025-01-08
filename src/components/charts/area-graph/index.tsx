import { Box } from "@chakra-ui/react";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Data {
  month: string;
  pv: number;
}

const data: Data[] = [
  { month: "Jan", pv: 2400 },
  { month: "Feb", pv: 1398 },
  { month: "Mar", pv: 9800 },
  { month: "Apr", pv: 3908 },
  { month: "May", pv: 4800 },
  { month: "Jun", pv: 3800 },
  { month: "Jul", pv: 4300 },
  { month: "Aug", pv: 2400 },
  { month: "Sep", pv: 1398 },
  { month: "Oct", pv: 9800 },
  { month: "Nov", pv: 3908 },
  { month: "Dec", pv: 4800 },
];

const AreaChartComponent: React.FC = () => {
  return (
    <Box borderRadius="8px" bg="#fff" p={8}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#765DFF" />
              <stop offset="48.25%" stopColor="#CFCAFF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="pv"
            fill="url(#gradient1)"
            stroke="#4A3AFF"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AreaChartComponent;
