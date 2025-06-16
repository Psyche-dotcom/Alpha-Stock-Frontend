"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import { DeleteIcon, UploadIcon } from "@/utils/icons";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import JoditEditorComponent from "@/components/jodit-wrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import {
  useCreateBlog,
  useDeleteBlog,
  useGetBlog,
  useUpdateBlog,
  useUpdateBlogStatus,
} from "@/services/blog";
import { useHandlePush } from "@/hooks/handlePush";
import { useAdminSession } from "@/app/context/admin-context";
import { Button } from "@/components/ui/button";
import DeleteContent from "@/components/delete-content";
import { showSuccessAlert } from "@/utils/alert";
interface IFormInput {
  email: string;
}

const EditBlog = ({ blogId }: { blogId: string }) => {
  const { profileData } = useAdminSession();
  const { handlePush } = useHandlePush();
  const { handleSubmit } = useForm<IFormInput>();
  const [title, setTitle] = useState("");
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getBlogData, getBlogError, getBlogIsLoading, getBlogPayload } =
    useGetBlog((res: any) => {});
  const { deleteBlogData, deleteBlogIsLoading, deleteBlogPayload } =
    useDeleteBlog((res: any) => {
      showSuccessAlert("Blog deleted successfully!");
      handlePush("/admin/blog-manager");
    });
  const blogPayload = {
    userId: profileData?.result?.id || "",
    blogPostId: blogId,
  };
  const {
    updateBlogStatusData,
    updateBlogStatusPayload,
    updateBlogStatusIsLoading,
  } = useUpdateBlogStatus((res: any) => {
    getBlogPayload(blogPayload);
  });
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectStatus(value);
    const payload = {
      blogPostId: blogId,
      status: Number(value),
    };
    updateBlogStatusPayload(payload);
  };

  const { updateBlogData, updateBlogIsLoading, updateBlogPayload } =
    useUpdateBlog((res: any) => {
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

      updateBlogPayload({ payload: payload, id: blogId });
    }
  );

  useEffect(() => {
    getBlogPayload(blogPayload);
  }, []);

  useEffect(() => {
    if (!getBlogIsLoading && getBlogData) {
      setTitle(getBlogData?.title);
      setContent(getBlogData?.blogContent);
      setSelectedCategory(getBlogData?.category);
      setSelectStatus(
        getBlogData?.status?.toLowerCase() === "decline"
          ? "0"
          : getBlogData?.status?.toLowerCase() === "archived"
          ? "1"
          : getBlogData?.status?.toLowerCase() === "published"
          ? "2"
          : "3"
      );
    }
  }, [getBlogData]);

  const onSubmit = (data: IFormInput) => {
    if (fileObject) {
      uploadFile(fileObject, fileObject.name);
      return;
    }
    const payload = {
      title,
      content,
      blogThumbnailUrl: getBlogData?.blogThumbnailUrl,
      category: selectedCategory,
    };

    updateBlogPayload({ payload: payload, id: blogId });
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
  const statusList = [
    { value: "0", text: "Decline" },
    { value: "1", text: "Archived" },
    { value: "2", text: "Published" },
    { value: "3", text: "Pending" },
  ];
  const handleDelete = () => {
    deleteBlogPayload(blogId);
  };

  if (getBlogIsLoading) return <p> Fetching blog details...</p>;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      w="100%"
      mt={8}
    >
      <Box w="960px" bg="#fff" borderRadius={"8px"} p={8}>
        <div className="flex justify-between gap-4 items-center mb-5">
          <div>
            <p className="text-2xl font-semibold mb-1">Update status</p>
            <Select
              value={selectStatus}
              onValueChange={handleStatusChange}
              required
              name="status"
            >
              <SelectTrigger className="w-full h-12 mb-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {statusList.map((_, index) => (
                    <SelectItem value={_.value.toString()} key={index}>
                      {_.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="destructive"
            className="h-12 px-3 font-semibold text-white"
            onClick={() => setIsOpen(true)}
          >
            Delete Blog
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-2xl font-semibold mb-1">Title</p>
          <Input
            name="title"
            placeholder="Write Title Here..."
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 mb-3"
            required
            value={title || ""}
          />
          <p className="text-2xl font-semibold mb-1">Select Category</p>

          <Select
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            required
            name="category"
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
          {(fileObject || getBlogData?.blogThumbnailUrl) && (
            <Image
              src={
                fileObject
                  ? URL.createObjectURL(fileObject)
                  : getBlogData?.blogThumbnailUrl
              }
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
              disabled={uploadIsLoading || updateBlogIsLoading}
            />
          </div>
        </form>
      </Box>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          if (deleteBlogIsLoading) {
            return;
          }
          setIsOpen(false);
        }}
      >
        <DialogContent
          className={`left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-[2rem] pt-[3.5rem]`}
        >
          <DeleteContent
            setOpen={() => setIsOpen(false)}
            header="Delete Blog"
            description={`Are you sure you want to delete this blog?`}
            handleDelete={handleDelete}
            loading={deleteBlogIsLoading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditBlog;
