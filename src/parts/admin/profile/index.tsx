"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import InputText from "@/components/form/FormInput";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { UploadIcon } from "@/utils/icons";

interface IFormInput {
  email: string;
  password: string;
  fullname: string;
  username: string;
  phonenumber: string;
}

const Profile: React.FC = () => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <Flex
      borderRadius={12}
      bg="#FFFFFF"
      justifyContent={"center"}
      mt={4}
      py={10}
    >
      <Box w="588px" position="relative">
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            width={"96px"}
            height={"96px"}
            borderRadius={"50%"}
            position="relative"
          >
            <Image
              src="/assets/images/card-image.png"
              height={96}
              width={96}
              alt="User profile icon"
              className="object-cover w-full h-full rounded-full"
            />
            <Box
              as="label"
              position="absolute"
              bottom={0}
              right={0}
              bg="white"
              p={2}
              borderRadius="50%"
              cursor="pointer"
            >
              <UploadIcon />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("Selected file:", file);
                    // Handle file upload logic here
                  }
                }}
                style={{ display: "none" }}
              />
            </Box>
          </Box>
        </Box>
        <Text
          mb={2}
          fontWeight={500}
          fontSize={20}
          color="#111928"
          textAlign="center"
        >
          Jacob Louise
        </Text>
        <Text
          mb={"65px"}
          fontWeight={400}
          fontSize={14}
          color="#6B7280"
          textAlign="center"
        >
          Platform Admin
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="fullname"
            placeholder="Fullname"
            control={control}
            rules={{
              required: "Fullname is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid name",
              },
            }}
          />
          <InputText
            name="username"
            placeholder="Username"
            control={control}
            rules={{
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid username",
              },
            }}
          />
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
          <InputText
            name="phonenumber"
            placeholder="Phone number"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            mb={1}
          />
          <Flex gap={8}>
            <ButtonIcon
              text="Cancel"
              variant="outline"
              color="#7B6B58"
              border="1px solid #7B6B58"
              w="87px"
              p="10px"
              type="button"
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
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default Profile;
