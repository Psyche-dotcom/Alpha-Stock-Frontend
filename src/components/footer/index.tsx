import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
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
      gridTemplateColumns={{ md: "repeat(2, 1fr)" }}
      justifyContent={{ md: "center" }}
      gap={4}
      mt={"103px"}
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        bg="#fff"
        borderRadius={"8px"}
        py={{ base: 4, md: 0 }}
        px={4}
        w="fit-content"
      >
        {footerList.map((footer: IFooter, index: number) => (
          <Link href="#" passHref key={index}>
            <Box key={index}>{footer.icon}</Box>
          </Link>
        ))}
      </Flex>
      <LinkButton
        href={"/terms-and-conditons"}
        text="Terms and Conditions"
        variant="solid"
        bg="#FFFFFF"
        p={4}
        color="#000"
        fontWeight={500}
        w={"fit-content"}
      />
      <LinkButton
        href={"#"}
        text="Report Issue"
        variant="solid"
        bg="#FFFFFF"
        p="16px"
        color="#000"
        fontWeight={500}
        w={"fit-content"}
      />
      <LinkButton
        href={"#"}
        text="support@alphainvestments.com"
        variant="solid"
        bg="#FFFFFF"
        p="16px"
        color="#000"
        fontWeight={500}
        w={"fit-content"}
      />
    </Box>
  );
};

export default Footer;
