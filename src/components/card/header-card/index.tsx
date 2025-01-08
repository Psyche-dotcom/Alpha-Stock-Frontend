import { LinkButton } from "@/components/button/link-button";
import { Box, Text } from "@chakra-ui/react";
interface IHeaderProps {
  text: string;
  linkText?: string;
  mb?: number;
  href?: string;
}

const HeaderCard: React.FC<IHeaderProps> = ({
  text,
  linkText = "See more",
  mb = 4,
  href = "#",
}) => {
  return (
    <Box
      borderRadius={12}
      p={4}
      w="100%"
      bg="#FFFFFF"
      border="1px solid #C2BAB2"
      display="flex"
      alignItems={"center"}
      justifyContent={"space-between"}
      mb={mb}
    >
      <Text mb={2} fontWeight={700} fontSize={24} color="#111928">
        {text}
      </Text>
      <LinkButton
        href={href}
        text={linkText}
        variant="outline"
        color="#351F05"
        p="8px 12px"
        border="1px solid #351F05"
        fontWeight={500}
        fontSize="12px"
      />
    </Box>
  );
};

export default HeaderCard;
