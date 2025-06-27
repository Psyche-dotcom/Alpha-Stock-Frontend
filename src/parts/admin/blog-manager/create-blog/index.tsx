"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import { DeleteIcon, UploadIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import JoditEditorComponent from "@/components/jodit-wrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadFile } from "@/services/upload-image";
import { showErrorAlert } from "@/utils/alert";
import { useCreateBlog } from "@/services/blog";
import { useHandlePush } from "@/hooks/handlePush";
interface IFormInput {
  email: string;
}

const CreateBlog: React.FC = () => {
  const { handlePush } = useHandlePush();
  const { handleSubmit } = useForm<IFormInput>();
  const [title, setTitle] = useState("");
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  const { blogCreateData, blogCreatePayload, blogCreateIsLoading } =
    useCreateBlog((res: any) => {
      handlePush("/admin/blog-manager");
    });

  const { uploadData, uploadFile, uploadIsLoading } = useUploadFile(
    (res: any) => {
      const payload = {
        title,
        content,
        category: selectedCategory,
        blogThumbnailUrl: res,
      };

      blogCreatePayload(payload);
    }
  );

  const onSubmit = (data: IFormInput) => {
    if (!fileObject) {
      showErrorAlert("Image upload is required!");
      return;
    }
    uploadFile(fileObject, fileObject.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileObject(file);
    }
  };

  const list = [
    { value: "TS", text: "Trending stock news" },
    { value: "LM", text: "Learning Market" },
  ];
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
          <p className="text-2xl font-semibold mb-1">Title</p>
          <Input
            name="title"
            placeholder="Write Title Here..."
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 mb-3"
            required
          />
          <p className="text-2xl font-semibold mb-1">Select Category</p>

          <Select
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            required
          >
            <SelectTrigger className="w-full h-12 mb-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {list.map((_, index) => (
                  <SelectItem value={_.value} key={index}>
                    {_.text}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fileObject && (
            <Image
              src={URL.createObjectURL(fileObject)}
              height={501}
              width={896}
              alt="User profile icon"
              className="object-cover w-full h-full rounded-lg"
            />
          )}
          <Flex gap={4} my={5} justifyContent={"center"} alignItems="center">
            <Box cursor="pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
              />
              <Box
                cursor="pointer"
                onClick={() => document.getElementById("file-input")?.click()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="10px"
                border="1px solid #ccc"
              >
                <UploadIcon />
                <span style={{ marginLeft: "10px" }}>
                  Click to upload a file
                </span>
              </Box>
            </Box>
            <Box onClick={() => setFileObject(null)} cursor="pointer">
              <DeleteIcon />
            </Box>
          </Flex>
          <JoditEditorComponent content={content} setContent={setContent} />
          <div className="mt-10">
            <ButtonIcon
              text="Save"
              bg="#291804"
              variant="solid"
              color="#ffffff"
              w="100%"
              p="10px"
              type="submit"
              disabled={uploadIsLoading || blogCreateIsLoading}
            />
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default CreateBlog;
