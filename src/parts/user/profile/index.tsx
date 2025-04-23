"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { UploadIcon } from "@/utils/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateSchemaType, updateDetailsSchema } from "@/schemas";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputForm from "@/components/form/InputForm";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { useUpdateProfile } from "@/services/profile";
import Storage from "@/utils/storage";
import { capitalizeFirstLetter } from "@/utils";
import { ApiResponse } from "@/types";
import { showSuccessAlert } from "@/utils/alert";
import { useUserSession } from "@/app/context/user-context";
import { Button } from "@/components/ui/button";
import { useUploadUserProfile } from "@/services/user";

const UserProfile: React.FC = () => {
  const { profileData } = useUserSession();
  const role = Storage.get("role") as string | undefined;
  const [fileObject, setFileObject] = useState<File | null>(null);
  const formattedRole = role?.toLowerCase() || "";
  const { updateProfileIsLoading, updateProfilePayload } = useUpdateProfile(
    (res: ApiResponse) => {
      showSuccessAlert(res?.result);
      window.location.reload();
    }
  );
  const { uploadData, uploadIsLoading, uploadFile } = useUploadUserProfile(
    (res: any) => {}
  );
  const form = useForm<UpdateSchemaType>({
    resolver: zodResolver(updateDetailsSchema),
    defaultValues: {
      email: profileData?.result?.email || "",
      firstName: profileData?.result?.firstName || "",
      lastName: profileData?.result?.lastName || "",
      userName: profileData?.result?.userName || "",
      phoneNumber: profileData?.result?.phoneNumber || "",
      country: profileData?.result?.country || "",
    },
  });

  async function onSubmit(values: UpdateSchemaType) {
    updateProfilePayload({
      payload: values,
      email: profileData?.result?.email,
    });
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileObject(file);
    }
  };
  useEffect(() => {
    if (fileObject) {
      uploadFile(fileObject, profileData?.result?.email);
    }
  }, [fileObject]);

  return (
    <Flex
      borderRadius={12}
      bg="#FFFFFF"
      justifyContent={"center"}
      mt={4}
      py={10}
      className="max-w-[1440px] mx-auto"
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
              src={
                fileObject
                  ? URL.createObjectURL(fileObject)
                  : profileData?.result?.profilePicture ||
                    "/assets/images/card-image.png"
              }
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
                onChange={handleFileChange}
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
          {profileData?.result?.firstName + " " + profileData?.result?.lastName}
        </Text>
        {formattedRole !== "user" && (
          <Text
            mb={"65px"}
            fontWeight={400}
            fontSize={14}
            color="#6B7280"
            textAlign="center"
          >
            Platform {capitalizeFirstLetter(formattedRole || "")}
          </Text>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-10 space-y-5"
          >
            <div className="flex gap-3">
              <InputForm
                form={form}
                name={"firstName"}
                label="First Name"
                placeholder="John"
              />
              <InputForm
                form={form}
                name={"lastName"}
                label="Last Name"
                placeholder="Doe"
              />
            </div>
            <div className="flex gap-3">
              <InputForm
                form={form}
                name={"userName"}
                label="Username"
                placeholder="doe05"
              />
              <InputForm
                form={form}
                name={"email"}
                label="Email"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Country</FormLabel>
                    <CountryDropdown
                      placeholder="--select option--"
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.name);
                      }}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputForm
                form={form}
                name={"phoneNumber"}
                label="Phone Number"
                placeholder="+12309911223"
              />
            </div>
            <Flex gap={8}>
              <Button
                variant="secondary"
                className="w-full py-2.5 font-medium text-sm h-12"
                disabled={updateProfileIsLoading}
              >
                Save
              </Button>
            </Flex>
          </form>
        </Form>
      </Box>
    </Flex>
  );
};

export default UserProfile;
