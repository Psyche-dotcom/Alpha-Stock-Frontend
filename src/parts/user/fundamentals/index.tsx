"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import FundamentalsCard from "@/components/card/fundamentals-card";
import { FundamentalsList, metricsList } from "@/constants";
import { IButtonFilter } from "@/interface/button-filter";
import { IFundamentalCard } from "@/interface/fundamental-card";
import { InformationIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const Fundamentals: React.FC = () => {
  const [btnFilter, setBtnFilter] = useState<string>("my-pillars");
  const filterBtn = [
    { text: "My Pillars", value: "my-pillars" },
    {
      text: "Alpha Pillars",
      value: "alpha-pillars",
    },
  ];
  return (
    <Box>
      <Box bg={"#fff"} p={4} borderRadius={"12px"} mb={4}>
        <Flex gap={2}>
          {filterBtn.map((filter: IButtonFilter, index: number) => (
            <ButtonIcon
              key={index}
              text={filter?.text}
              variant={filter?.value === btnFilter ? "solid" : "ghost"}
              bg={filter?.value === btnFilter ? "#351F05" : ""}
              fontWeight={500}
              color={filter?.value === btnFilter ? "#ffffff" : "#6B7280"}
              fontSize="12px"
              p={filter?.value === btnFilter ? "12px 16px" : "0px"}
              onClick={() => setBtnFilter(filter?.value)}
            />
          ))}
        </Flex>
      </Box>
      <Flex wrap="wrap" gap={4}>
        {FundamentalsList.map(
          (fundamental: IFundamentalCard, index: number) => (
            <Box
              key={index}
              flexBasis="calc(33.3% - 1rem)"
              maxWidth="calc(33.3% - 1rem)"
              flexGrow={1}
            >
              <FundamentalsCard fundamental={fundamental} />
            </Box>
          )
        )}
      </Flex>
      <Box mt={8} display="flex" gap={4}>
        <Box w="100%">
          <Box borderRadius="12px" bg={"#fff"} mb={4}>
            {metricsList.map((metrics, index: number) => (
              <Box
                p={4}
                border={"1px solid #E5E7EB"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                key={index}
              >
                <Text
                  fontWeight={500}
                  fontSize={16}
                  color="#111928"
                  display="inline-flex"
                  alignItems={"center"}
                >
                  {metrics?.title} <InformationIcon />
                </Text>
                <Text fontWeight={700} fontSize={"16px"} color="#111928">
                  {metrics?.text}
                </Text>
              </Box>
            ))}
          </Box>
          <Box borderRadius="12px" bg={"#fff"} mb={4}>
            {metricsList.map((metrics, index: number) => (
              <Box
                p={4}
                border={"1px solid #E5E7EB"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                key={index}
              >
                <Text
                  fontWeight={500}
                  fontSize={16}
                  color="#111928"
                  display="inline-flex"
                  alignItems={"center"}
                >
                  {metrics?.title} <InformationIcon />
                </Text>
                <Text fontWeight={700} fontSize={"16px"} color="#111928">
                  {metrics?.text}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box w="100%">
          <Box borderRadius="12px" bg={"#fff"} mb={4}>
            {metricsList.map((metrics, index: number) => (
              <Box
                p={4}
                border={"1px solid #E5E7EB"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                key={index}
              >
                <Text
                  fontWeight={500}
                  fontSize={16}
                  color="#111928"
                  display="inline-flex"
                  alignItems={"center"}
                >
                  {metrics?.title} <InformationIcon />
                </Text>
                <Text fontWeight={700} fontSize={"16px"} color="#111928">
                  {metrics?.text}
                </Text>
              </Box>
            ))}
          </Box>
          <Box borderRadius="12px" bg={"#fff"} mb={4}>
            {metricsList.map((metrics, index: number) => (
              <Box
                p={4}
                border={"1px solid #E5E7EB"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                key={index}
              >
                <Text
                  fontWeight={500}
                  fontSize={16}
                  color="#111928"
                  display="inline-flex"
                  alignItems={"center"}
                >
                  {metrics?.title} <InformationIcon />
                </Text>
                <Text fontWeight={700} fontSize={"16px"} color="#111928">
                  {metrics?.text}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Fundamentals;
