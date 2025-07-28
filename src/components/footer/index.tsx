import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { LinkButton } from "../button/link-button";
import Link from "next/link";

interface IFooter {
  id: number;
  icon: ReactNode;
}

const Footer = () => {
  const footerList = [
    {
      id: 1,
      icon: <FacebookIcon />,
    },
    {
      id: 2,
      icon: <TwitterIcon />,
    },
    {
      id: 3,
      icon: <InstagramIcon />,
    },
    {
      id: 4,
      icon: <TiktokIcon />,
    },
    {
      id: 5,
      icon: <YoutubeIcon />,
    },
  ];

  return (
    <Box
      display={{ base: "grid", lg: "flex" }}
      gridTemplateColumns={{ md: "repeat(4, 1fr)" }}
      justifyContent={{ md: "center" }}
      gap={4}
      mt={{ base: "30px", sm: "60px", lg: "80px" }}
      flexDirection={{ base: "column", sm: "row" }}
      mx={4}
      flexWrap="wrap"
    >
      <Flex
        alignItems={"center"}
        gap={4}
        bg="#fff"
        borderRadius={"8px"}
        py={2}
        px={4}
        w="fit-content"
        minH={4}
      >
        {footerList.map((footer: IFooter, index: number) => (
          <Link href="#" passHref key={index}>
            <Box key={index}>{footer.icon}</Box>
          </Link>
        ))}
      </Flex>
      <LinkButton
        href={"/terms-and-conditions"}
        text="Terms and Conditions"
        variant="solid"
        bg="#FFFFFF"
        px={4}
        py={2}
        color="#000"
        fontWeight={500}
        w={"fit-content"}
      />
      <LinkButton
        href={"#"}
        text="Report Issue"
        variant="solid"
        bg="#FFFFFF"
        px={4}
        py={2}
        color="#000"
        fontWeight={500}
        w={"fit-content"}
      />

      {/* TradingView Disclaimer - Wrapped in a Box for consistent styling */}
      <Box
        bg="#FFFFFF"
        borderRadius={"8px"}
        py={2}
        px={4}
        w="fit-content"
        display="flex"
        alignItems="center"
        minH={4}
      >
        <Text fontSize="sm" fontWeight={500}>
          Charts and Ticker Tape Powered by Tradingview
        </Text>
      </Box>

      {/* <LinkButton
        href={"#"}
        text="support@alphainvestments.com"
        variant="solid"
        bg="#FFFFFF"
        p="16px"
        color="#000"
        fontWeight={500}
        w={"fit-content"}
      /> */}
    </Box>
  );
};

export default Footer;
