"use client";

import { TableComponent } from "@/components/custom-table";
import { SubscriptionFeature } from "@/types";
import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface IAdminStock {
  selectOption?: string;
  title: string;
  datas: any;
}

const AdminStockAnalyser: React.FC<IAdminStock> = ({
  selectOption,
  title,
  datas,
}) => {
  const cellRenderers = {
    featureName: (record: SubscriptionFeature) => (
      <p className="font-semibold">{record?.featureName}</p>
    ),
    currentState: (record: SubscriptionFeature) => (
      <div className="font-semibold flex items-center justify-center">
        {record?.currentState.toLowerCase() === "false" ? (
          <CancelIcon />
        ) : (
          <SuccessIcon />
        )}
      </div>
    ),
  };

  const columnOrder: (keyof SubscriptionFeature)[] = [
    "featureName",
    "currentState",
  ];

  const columnLabels = {
    featureName: "Feature",
    currentState: "Current State",
  };

  return (
    <Box bg="#fff" borderRadius="8px" pt={4} mb={4}>
      <Text fontWeight={600} fontSize={18} color="#111928" m={4} mt={0}>
        {title}
      </Text>
      <TableComponent<SubscriptionFeature>
        tableData={datas || []}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
      />
    </Box>
  );
};

export default AdminStockAnalyser;
