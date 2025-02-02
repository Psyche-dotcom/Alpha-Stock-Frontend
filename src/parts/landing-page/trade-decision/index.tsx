"use client";

import { LinkButton } from "@/components/button/link-button";
import { TableComponent } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { DataItem } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface DataType extends DataItem {
  id: number;
  feature: string;
  yearValue: number;
  yearProgress: boolean;
  yearsValue: number;
  yearsProgress: boolean;
}
const TradeDecision = () => {
  const dataSources = [
    {
      id: 1,
      feature: "GFAI",
      yearValue: 0.03,
      yearProgress: true,

      yearsValue: 0.16,
      yearsProgress: false,
    },
    {
      id: 2,
      feature: "ASML",
      yearValue: 0.03,
      yearProgress: false,

      yearsValue: 0.16,
      yearsProgress: true,
    },
    {
      id: 3,
      feature: "NVDIA",
      yearValue: 0.03,
      yearProgress: true,

      yearsValue: 0.16,
      yearsProgress: true,
    },
    {
      id: 4,
      feature: "LMPG",
      yearValue: 0.03,
      yearProgress: true,

      yearsValue: 0.16,
      yearsProgress: false,
    },
  ];

  const cellRenderers = {
    feature: (item: DataType) => (
      <span className="font-semibold">{item?.feature}</span>
    ),
    year: (record: DataType) => (
      <p
        className={`font-normal text-sm text-center ${
          record?.yearProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.yearProgress ? "+" : "-"} {record?.yearValue}%
      </p>
    ),
    years: (record: DataType) => (
      <p
        className={`font-normal text-sm text-center ${
          record?.yearsProgress ? "text-[#0E9F6E]" : "text-[#E74694]"
        }`}
      >
        {record?.yearsProgress ? "+" : "-"}
        {record?.yearsValue}%
      </p>
    ),
  };

  const columnOrder: (keyof DataType)[] = ["feature", "year", "years"];

  const columnLabels = {
    feature: "FEATURE",
    year: "1 YEAR",
    years: "5 YEARS",
  };

  return (
    <div className="gap-4 lg:gap-8 h-full flex-col lg:flex-row flex">
      <div className="py-5 sm:py-6 md:py-8 lg:py-[64px] xl:py-[84px] rounded-[12px] w-full bg-[#180E03] px-5 sm:px-6 md:px-8">
        <p className="mb-4 font-semibold leading-[43.2px] md:leading-[50px] lg:leading-[59px] text-[#EBE9E6] text-[30px] sm:text-[36px] md:text-[48px] xl:text-[60px]">
          Make informed trade decisions after analysing your ROI
        </p>
        <p className="mb-4 text-[#C2BAB2] text-base lg:text-lg font-normal">
          Using our stock analysis system, you can now predict your return on
          investment on any stock in your portfolio for better investments.
        </p>
        <Button
          asChild
          className="bg-[#EBE9E6] py-3 px-5 text-[#351f05] font-medium w-fit-content"
        >
          <Link href={ROUTES.AUTH.SIGNUP}>Get Started</Link>
        </Button>
      </div>
      <div className="bg-[#A4998C] h-auto flex items-end w-full border border-[351F05] rounded-[12px] pt-4 sm:pt-6 md:pt-8 ps-8">
        <TableComponent<DataType>
          tableData={dataSources}
          cellRenderers={cellRenderers}
          columnOrder={columnOrder}
          columnLabels={columnLabels}
        />
      </div>
    </div>
  );
};

export default TradeDecision;
