"use client";

import { IViewCard } from "@/interface/card-view";
import { formatDate } from "@/utils";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IViewProps {
  card: IViewCard;
  showAuthor?: boolean;
  isAuth?: boolean;
}

const ViewCard: React.FC<any> = ({
  card,
  showAuthor = false,
  isAuth = false,
}) => {
  return (
    <Link passHref href={card?.url} target="_blank">
      <Box
        borderRadius="12px"
        p={2}
        h="345px"
        display="flex"
        alignItems="end"
        position="relative"
        overflow="hidden"
        bg="gray.100"
      >
        {/* Background Image that stretches 100% */}
        <Image
          src={card?.image || "/assets/images/placeholder-image.png"}
          alt={card?.title || "Blog post image"}
          fill
          sizes="100vw"
          style={{
            objectFit: "fill", // Stretch to fill card completely (even if distorted)
            objectPosition: "center",
            zIndex: 0,
          }}
          className="absolute inset-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/assets/images/placeholder-image.png";
            target.style.objectFit = "fill";
          }}
        />
        
        {/* Content Box (over image) */}
        <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF" zIndex={2}>
          <Text
            color="#111928"
            fontSize="16px"
            fontWeight={600}
            mb={2.5}
            noOfLines={2}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {card?.title}
          </Text>
          <Text
            color="#6B7280"
            fontSize="12px"
            fontWeight={400}
            noOfLines={1}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatDate(card?.publishedDate)}
          </Text>

          {showAuthor && (
            <Box display="flex">
              <Box
                border="1px solid #614E38"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                gap={2.5}
                py="2px"
                ps="2px"
                pe="8px"
                mt={2.5}
                bg="#EBE9E6"
              >
                <Box h="32px" w="32px">
                  <Image
                    width={32}
                    height={32}
                    src={
                      card?.publisherImgUrl || "/assets/images/card-image.png"
                    }
                    alt="Publisher avatar"
                    className="rounded-full object-cover h-8 w-8"
                  />
                </Box>
                <Text
                  color="#180E03"
                  fontSize="14px"
                  fontWeight={600}
                  noOfLines={1}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {card?.publisher || "Jeffrey"}
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default ViewCard;
