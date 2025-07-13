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
        p={0}
        minH="250px" // Changed h to minH
        display="flex"
        flexDirection="column"
        overflow="hidden"
        bg="gray.100"
      >
        {/* Image at the Top */}
        <Box
          position="relative"
          width="100%"
          height="180px"
          overflow="hidden"
          borderTopRadius="12px"
        >
          <Image
            src={card?.image || "/assets/images/placeholder-image.png"}
            alt={card?.title || "Blog post image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-t-[12px]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/assets/images/placeholder-image.png";
              target.style.objectFit = "cover";
            }}
          />
        </Box>

        {/* Content Box (underneath the image) */}
        <Box
          // Removed flex="1"
          p={2.5}
          w="100%"
          bg="#FFFFFF"
          display="flex"
          flexDirection="column"
          // Removed justifyContent="space-between"
          borderBottomRadius="12px"
        >
          <Box>
            {" "}
            {/* Wrapper for title and date */}
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
          </Box>

          {showAuthor && (
            <Box mt={2.5}>
              {" "}
              {/* Margin top to separate from date, keeping consistent spacing */}
              <Box
                border="1px solid #614E38"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                gap={2.5}
                py="2px"
                ps="2px"
                pe="8px"
                bg="#EBE9E6"
                width="fit-content"
              >
                <Box h="32px" w="32px" borderRadius="full" overflow="hidden">
                  <Image
                    width={32}
                    height={32}
                    src={
                      card?.publisherImgUrl || "/assets/images/card-image.png"
                    }
                    alt="Publisher avatar"
                    className="object-cover h-8 w-8"
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