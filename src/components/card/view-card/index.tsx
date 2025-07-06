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
        h={"345px"}
        display={"flex"}
        alignItems={"end"}
        position="relative" // Crucial for positioning the absolute image
        overflow="hidden" // Ensures the image doesn't overflow rounded corners
        bg="gray.100" // Fallback background color if image fails to load
      >
        {/* Background Image using Next.js Image component */}
        <Image
          src={card?.image || "/assets/images/placeholder-image.png"} // Provide a fallback placeholder image
          alt={card?.title || "Blog post image"}
          fill // Makes the image fill the parent container
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
          style={{
            objectFit: "cover", // NEW: Ensures the image covers the entire area, cropping if necessary
            objectPosition: "center", // Ensures the center of the image is prioritized
            zIndex: 0, // Place image behind content
          }}
          className="absolute inset-0" // Stretch to fill the parent container
          // Optional: Add onError to handle broken image links gracefully
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/images/placeholder-image.png";
            (e.target as HTMLImageElement).style.objectFit = "contain"; // Fallback to contain for placeholder
          }}
        />

        {/* Semi-transparent overlay for text readability */}
        <Box
          position="absolute"
          inset="0"
          bg="linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)" // Gradient overlay
          zIndex={1} // Place overlay above image
          borderRadius="12px" // Match parent border-radius
        />

        {/* Content Box */}
        <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF" zIndex={2}>
          <Text
            color={"#111928"}
            fontSize={"16px"}
            fontWeight={600}
            mb={2.5}
            noOfLines={2} // NEW: Limit title to 2 lines
            overflow="hidden" // Ensures text doesn't overflow
            textOverflow="ellipsis" // Adds "..." if text overflows
          >
            {card?.title}
          </Text>
          <Text
            color={"#6B7280"}
            fontSize={"12px"}
            fontWeight={400}
            noOfLines={1} // NEW: Limit date to 1 line
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatDate(card?.publishedDate)}
          </Text>
          {showAuthor && (
            <Box display={"flex"}>
              <Box
                border="1px solid #614E38"
                borderRadius={"16px"}
                display="flex"
                alignItems={"center"}
                gap={2.5}
                py={"2px"}
                ps={"2px"}
                pe={"8px"}
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
                  color={"#180E03"}
                  fontSize={"14px"}
                  fontWeight={600}
                  noOfLines={1} // NEW: Limit publisher name to 1 line
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