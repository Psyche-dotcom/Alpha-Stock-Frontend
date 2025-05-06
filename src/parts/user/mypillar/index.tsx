"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

interface Pillar {
  pillerName: string;
  comparison: string;
  format: string;
  value: string;
  label: string;
}

interface Category {
  name: string;
  items: Pillar[];
}

const PillarScreener = () => {
  // Mock categories data
  const [categories] = useState<Category[]>([
    {
      name: "Popular Metrics",
      items: [
        {
          label: "EYrs FCF > 1.70",
          pillerName: "eyrsFCF",
          comparison: ">",
          format: "",
          value: "1.70",
        },
        {
          label: "EYrs Price to FCF < 1.80",
          pillerName: "eyrsPriceToFCF",
          comparison: "<",
          format: "",
          value: "1.80",
        },
      ],
    },
    {
      name: "Income Statement",
      items: [
        {
          label: "Revenue Growth > 5%",
          pillerName: "revGrowth",
          comparison: ">",
          format: "%",
          value: "5",
        },
        {
          label: "Net Income < $150M",
          pillerName: "netIncome",
          comparison: "<",
          format: "$",
          value: "150000000",
        },
      ],
    },
  ]);

  const [selectedPillars, setSelectedPillars] = useState<Pillar[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const handleCategoryToggle = (index: number) => {
    setExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePillarSelect = (pillar: Pillar) => {
    if (selectedPillars.length >= 8) return;
    if (!selectedPillars.find((p) => p.pillerName === pillar.pillerName)) {
      setSelectedPillars((prev) => [...prev, pillar]);
    }
  };

  const handlePillarRemove = (pillarName: string) => {
    setSelectedPillars((prev) =>
      prev.filter((p) => p.pillerName !== pillarName)
    );
  };

  const handleSubmit = async () => {
    const payload = selectedPillars.map((pillar) => ({
      pillerName: pillar.pillerName,
      comparison: pillar.comparison,
      format: pillar.format,
      value: pillar.value,
    }));

    try {
      // Replace with actual API call
      const response = await fetch("/api/screener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      // Handle response
    } catch (error) {
      console.error("Error submitting pillars:", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Pillar Screener
      </Text>

      <Accordion allowMultiple index={expandedCategories}>
        {categories.map((category, index) => (
          <AccordionItem key={category.name} border="none" mb={4}>
            <AccordionButton
              onClick={() => handleCategoryToggle(index)}
              className="hover:bg-gray-50 rounded-lg p-3"
            >
              <Box flex="1" textAlign="left" fontWeight="semibold">
                {category.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <VStack align="stretch" spacing={3}>
                {category.items.map((item) => (
                  <Button
                    key={item.pillerName}
                    variant="outline"
                    onClick={() => handlePillarSelect(item)}
                    isDisabled={selectedPillars.length >= 8}
                    className="justify-start"
                  >
                    {item.label}
                  </Button>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Box mt={8}>
        <Text fontWeight="semibold" mb={4}>
          My Pillars ({selectedPillars.length}/8)
        </Text>

        <HStack spacing={2} wrap="wrap">
          {selectedPillars.map((pillar) => (
            <Tag
              key={pillar.pillerName}
              variant="subtle"
              colorScheme="blue"
              borderRadius="full"
              py={2}
              px={4}
            >
              <TagLabel>{pillar.label}</TagLabel>
              <TagCloseButton
                onClick={() => handlePillarRemove(pillar.pillerName)}
              />
            </Tag>
          ))}
        </HStack>
      </Box>

      <Button
        mt={8}
        colorScheme="blue"
        isDisabled={selectedPillars.length !== 8}
        onClick={handleSubmit}
      >
        Search Companies
      </Button>
    </div>
  );
};

export default PillarScreener;
