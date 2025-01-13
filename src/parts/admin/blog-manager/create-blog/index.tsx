"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import InputText from "@/components/form/FormInput";
import TextArea from "@/components/form/FormTextArea";
import { DeleteIcon, UploadIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface IFormInput {
  email: string;
}

const CreateBlog: React.FC = () => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const [fileObject, setFileObject] = useState<File | null>(null);
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      w="100%"
      mt={8}
    >
      <Box w="960px" bg="#fff" borderRadius={"8px"} p={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="title"
            placeholder="Write Title Here..."
            control={control}
            rules={{
              required: "Title is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Title name",
              },
            }}
          />

          {fileObject === null && (
            <Image
              src="/assets/images/card-image.png"
              height={501}
              width={896}
              alt="User profile icon"
              className="object-cover w-full h-full rounded-lg"
            />
          )}
          <Flex gap={4} my={5} justifyContent={"center"}>
            <Box>
              <UploadIcon />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("Selected file:", file);
                  }
                }}
                style={{ display: "none" }}
              />
            </Box>
            <Box>
              <DeleteIcon />
            </Box>
          </Flex>
          <TextArea
            name="content"
            placeholder="Write content here..."
            control={control}
            rules={{
              required: "Content is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Content name",
              },
            }}
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
  );
};

export default CreateBlog;
