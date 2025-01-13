import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface ILinkButton {
  href: string;
  text: string;
  variant?: string;
  bg?: string;
  p?: string | number;
  color?: string;
  border?: string;
  fontWeight?: number;
  fontSize?: string;
  icon?: ReactNode;
  gap?: number | string;
  showText?: boolean;
  w?: string | number;
}
const LinkButton: FC<ILinkButton> = ({
  href,
  text,
  variant,
  bg,
  p,
  color,
  border,
  fontWeight = 500,
  fontSize = "16px",
  gap,
  icon,
  showText = true,
  w = "100%",
}) => {
  return (
    <Link href={href} passHref>
      <Button
        variant={variant}
        bg={variant === "outline" ? "transparent" : bg}
        border={border}
        borderRadius={"8px"}
        fontSize={fontSize}
        p={p}
        color={color}
        fontWeight={fontWeight}
        _hover={{
          bg: variant && `${bg}CC`,
          color: variant && `${color}CC`,
          borderColor: border && `${color}CC`,
        }}
        transition="all 0.3s ease"
        display={"flex"}
        justifyContent={"start"}
        alignContent={"center"}
        gap={gap}
        w={w}
      >
        {icon && <Box color={color}>{icon}</Box>}
        {showText && <Text>{text}</Text>}
      </Button>
    </Link>
  );
};

export { LinkButton };
