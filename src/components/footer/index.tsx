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
    <Box display="flex" justifyContent={"center"} gap={16} mt={"103px"}>
      <Flex
        alignItems={"center"}
        gap={16}
        bg="#fff"
        borderRadius={"12px"}
        p={16}
      >
        {footerList.map((footer: IFooter, index: number) => (
          <Link href="#" passHref key={index}>
            <Box key={index}>{footer.icon}</Box>
          </Link>
        ))}
      </Flex>
      <LinkButton
        href={"#"}
        text="Terms and Conditions"
        variant="solid"
        bg="#FFFFFF"
        p="16px"
        color="#000"
        fontWeight={500}
      />
      <LinkButton
        href={"#"}
        text="Report Issue"
        variant="solid"
        bg="#FFFFFF"
        p="16px"
        color="#000"
        fontWeight={500}
      />
      <LinkButton
        href={"#"}
        text="support@alphainvestments.com"
        variant="solid"
        bg="#FFFFFF"
        p="16px"
        color="#000"
        fontWeight={500}
      />
    </Box>
  );
};

export default Footer;
