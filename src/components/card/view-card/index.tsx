"use client";

import { IViewCard } from "@/interface/card-view";
import { formatDate } from "@/utils";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
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
    <Link
      passHref
      href={card?.url}
      target="_blank"
    >
      <Box
        borderRadius="12px"
        p={2}
        h={"345px"}
        display={"flex"}
        alignItems={"end"}
        bgImage={`url(${card?.image})`}
        bgSize="cover"
        bgPosition="auto"
        bgRepeat="no-repeat"
      >
        <Box borderRadius={12} p={2.5} w="100%" bg="#FFFFFF">
          <Text color={"#111928"} fontSize={"16px"} fontWeight={600} mb={2.5}>
            {card?.title}
          </Text>
          <Text color={"#6B7280"} fontSize={"12px"} fontWeight={400}>
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
                    alt="Single blog view"
                    className="rounded-full object-cover h-8 w-8"
                  />
                </Box>
                <Text color={"#180E03"} fontSize={"14px"} fontWeight={600}>
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
