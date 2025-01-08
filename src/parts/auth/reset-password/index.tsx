"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import AuthCard from "@/components/card/auth-card";
import InputPassword from "@/components/form/FormPassword";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
}

const ResetPassword: React.FC = () => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
            Reset Password
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputPassword
              name="new_password"
              placeholder="New password"
              control={control}
            />
            <InputPassword
              name="confirm_password"
              placeholder="Confirm password"
              control={control}
              mb={8}
            />
            <ButtonIcon
              text="Save"
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
      <AuthCard />
    </Flex>
  );
};

export default ResetPassword;
