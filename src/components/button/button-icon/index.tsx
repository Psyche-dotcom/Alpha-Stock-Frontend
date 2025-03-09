import { Box, Button, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IButtonIcon {
  icon?: ReactNode;
  variant?: string;
  bg?: string;
  p?: string;
  color?: string;
  border?: string;
  fontWeight?: number;
  text?: string;
  w?: string;
  gap?: number;
  type?: "button" | "submit" | "reset";
  fontSize?: string;
  flexDirection?: "row" | "row-reverse";
  onClick?: () => void;
  disabled?: boolean;
}
const ButtonIcon: FC<IButtonIcon> = ({
  variant,
  bg,
  p,
  color,
  border,
  fontWeight,
  icon,
  text,
  gap,
  w,
  type = "button",
  fontSize,
  flexDirection = "row",
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      bg={variant === "outline" ? "transparent" : bg}
      border={variant === "outline" ? border : ""}
      borderRadius={"8px"}
      p={p}
      onClick={onClick}
      color={color}
      fontWeight={fontWeight}
      fontSize={fontSize}
      _hover={{
        bg: variant && `${bg}CC`,
        color: variant && `${color}CC`,
        borderColor: border && `${color}CC`,
      }}
      transition="all 0.3s ease"
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      gap={gap}
      w={w}
      flexDirection={flexDirection}
      disabled={disabled}
    >
      {icon && <Box>{icon}</Box>}
      <Text>{text}</Text>
    </Button>
  );
};

export { ButtonIcon };
