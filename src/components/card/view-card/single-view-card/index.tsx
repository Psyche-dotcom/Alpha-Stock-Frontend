import { IViewCard } from "@/interface/card-view";
import { formatDate } from "@/utils";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
interface IViewProps {
  card: IViewCard;
}

const SingleViewCard: React.FC<IViewProps> = ({ card }) => {
  return (
    <Box
      borderRadius="12px"
      p={2}
      display={"flex"}
      alignItems={"end"}
      bgImage={`url(${card?.blogThumbnailUrl})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      flex={1}
    >
      <Box
        borderRadius={12}
        p={2.5}
        w="100%"
        bg="#FFFFFF"
        maxWidth="702px"
        mt={{ base: "217px", md: "0px" }}
      >
        <Text
          color={"#111928"}
          fontSize={{ base: "28px", lg: "32px", xl: "36px" }}
          fontWeight={600}
          mb={2.5}
          lineHeight={{ base: "42px", md: "48px", xl: "54px" }}
        >
          {card?.title}
        </Text>
        <Text color={"#6B7280"} fontSize={"12px"} fontWeight={400}>
          {formatDate(card?.publishedDate)}
        </Text>
        <Box display={"flex"}>
          <Box
            border="1px solid #614E38"
            borderRadius={"16px"}
            display="flex"
            alignItems={"center"}
            gap={2.5}
            p={"2px"}
            mt={2.5}
            bg="#EBE9E6"
            maxWidth={"702px"}
          >
            <Box h="32px" width="32px">
              <Image
                width={32}
                height={32}
                src={card?.publisherImgUrl || "/assets/images/card-image.png"}
                alt="Single blog view"
                className="rounded-full object-cover h-full w-full"
              />
            </Box>
            <Text color={"#180E03"} fontSize={"14px"} fontWeight={600}>
              {card?.publisherName}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SingleViewCard;
