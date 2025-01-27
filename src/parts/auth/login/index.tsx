"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import { LinkButton } from "@/components/button/link-button";
import AuthCard from "@/components/card/auth-card";
import InputText from "@/components/form/FormInput";
import InputPassword from "@/components/form/FormPassword";
import { ROUTES } from "@/constants/routes";
import { GoogleIcon } from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <Flex gap={8} py={8}>
      <Box borderRadius={12} p={8} w="100%" bg="#FFFFFF">
        <Text mb={2} fontWeight={800} fontSize={24} color="#111928">
          Welcome Back,
        </Text>
        <Text mb={8} fontWeight={400} fontSize={16} color="#111928">
          Lets get you on track with the right trade insights.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
          />
          <InputPassword
            name="password"
            placeholder="Password"
            control={control}
            mb={1}
          />
          <Box
            display="flex"
            gap="2px"
            alignItems={"center"}
            justifyContent={"end"}
            p="0px"
            mb={8}
          >
            <Text p="0px" fontWeight={500} fontSize={14} color="#6B7280">
              Forgot password?
            </Text>
            <LinkButton
              text="Recover here"
              color="#3A2206"
              href={ROUTES.AUTH.FORGOTPASSWORD}
              variant="ghost"
              p={"0px"}
              fontWeight={700}
              fontSize="14px"
            />
          </Box>
          <ButtonIcon
            text="Sign in"
            bg="#291804"
            variant="solid"
            color="#ffffff"
            w="100%"
            p="10px"
            type="submit"
          />
        </form>
        <Box h={1} w="100%" bg={"#E5E7EB"} my={8}></Box>
        <Text
          p="0px"
          fontWeight={400}
          fontSize={14}
          color="#6B7280"
          mb={8}
          textAlign={"center"}
        >
          Or sign in with
        </Text>
        <ButtonIcon
          variant="outline"
          text="Google"
          icon={<GoogleIcon />}
          color="#6B7280"
          border="1px solid #6B7280"
          gap={9.42}
          w="100%"
        />
        <Box
          display="flex"
          gap="2px"
          alignItems={"center"}
          justifyContent={"center"}
          p="0px"
          mt={8}
        >
          <Text p="0px" fontWeight={500} fontSize={14} color="#6B7280">
            New to the our platform?
          </Text>
          <LinkButton
            text="Sign up here"
            color="#3A2206"
            href={ROUTES.AUTH.SIGNUP}
            variant="ghost"
            p={"0px"}
            fontWeight={700}
            fontSize="14px"
          />
        </Box>
      </Box>
      <Box display={{ base: "none", md: "block" }} h="auto" maxWidth={585}>
        <AuthCard />
      </Box>
    </Flex>
  );
};

export default Login;
