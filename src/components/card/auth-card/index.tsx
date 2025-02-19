import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
interface IAuthCardProps {}

const AuthCard: React.FC<IAuthCardProps> = () => {
  return (
    <Box
      borderRadius="12px"
      padding="32px"
      bg="#3A2206"
      h="100%"
      flexDir={"column"}
      display={"flex"}
    >
      <Text fontSize="32px" fontWeight={700} color="#EBE9E6">
        Take control of the market with the right tools abd accurate insight
      </Text>
      <Box
        borderRadius={"1.5rem"}
        p={"10px"}
        w={"20.875rem"}
        justifySelf={"end"}
        bg="white"
        mt="auto"
        alignSelf={"end"}
      >
        <Text fontSize={"18px"} fontWeight={600} color="#111928" mb="10px">
          Risk comes from not knowing what you are doing.
        </Text>
        <Box display={"flex"} gap={3}>
          <Box>
            <Image
              width={48}
              height={48}
              alt="Authoor image"
              src="/assets/images/card-image.png"
              className="h-12 w-12 rounded-full"
            />
          </Box>
          <Box>
            <Text fontSize={"16px"} fontWeight={600} color="#111928" mb="6px">
              Warren Buffet
            </Text>
            <Text fontSize={"14px"} fontWeight={400} color="#6B7280">
              Oracle Of Omaha
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthCard;
