"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import AuthCard from "@/components/card/auth-card";
import InputText from "@/components/form/FormInput";
import { ROUTES } from "@/constants/routes";
import { useHandlePush } from "@/hooks/handlePush";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { handlePush } = useHandlePush();
  const { handleSubmit, control } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
    handlePush(ROUTES.AUTH.RESETPASSWORD);
  };

  return (
    <Flex gap={8} py={8} h={"100vh"}>
      <Box
        borderRadius={12}
        p={8}
        w="100%"
        bg="#FFFFFF"
        display="flex"
        alignItems={"center"}
        h="100%"
      >
        <Box w="100%">
          <Text mb={2} fontWeight={700} fontSize={24} color="#111928">
            Forgot Password
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText
              name="email"
              placeholder="Recovery mail"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              mb={8}
            />
            <ButtonIcon
              text="Send Recovery Link"
              bg="#291804"
              variant="solid"
              color="#ffffff"
              w="100%"
              p="10px"
              type="submit"
            />
          </form>
        </Box>
      </Box>
      <Box display={{ base: "none", md: "block" }} h="auto" maxWidth={585}>
        <AuthCard />
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
