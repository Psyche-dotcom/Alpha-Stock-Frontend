"use client";

import { IComments } from "@/interface/comment";
import { Box, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploadIcon, SendIcon, SmileyIcon } from "@/utils/icons";
import CommunityCommentCard from "@/components/card/community-comment";
import { useUserSession } from "@/app/context/user-context";
import CommentSkeleton from "@/components/card/skeleton/comment";
import { useRef, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { XIcon } from "lucide-react";
interface iProps {
  data: any;
  funSend: (message: string, messageType: string) => void;
  isLoading?: boolean;
}

const CommunityMain: React.FC<iProps> = ({ data, funSend, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file");
    }
  };
  const { setIsOpen } = useUserSession();
  const formSchema = z.object({
    message: z.string(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: FormSchemaType) {
    console.log("values", values);
    funSend(values.message, "Text");
    reset();
  }
  return (
    <Box
      borderRadius="8px"
      flex={1}
      bg="#C2BAB2"
      px={{ base: 4, sm: 5, md: 6, lg: 8 }}
      w="100%"
      height="100%"
      maxHeight="calc(100vh - 80px)"
      display="flex"
      flexDirection="column"
      pt={4}
    >
      <h6
        className="text-end underline text-sm font-semibold mb-4 block md:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Back to channel list
      </h6>
      <Box flex="1" overflowY="auto" className="scrollbar-hide">
        {isLoading ? (
          <Flex flexDirection="column" gap={4}>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </Flex>
        ) : (
          <Flex flexDirection="column" gap={4}>
            {data?.map((comment: IComments, index: number) => (
              <CommunityCommentCard
                comment={comment}
                key={index}
                showUpload={true}
              />
            ))}
          </Flex>
        )}
      </Box>

      <Box
        mt={3}
        height="4.125rem"
        bg="white"
        p="12px"
        py="-12px"
        borderRadius="8px"
        zIndex={10}
        width="100%"
        boxShadow="xl"
        mb="20px"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 items-center"
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              variant="ghost"
              size="xl"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUploadIcon />
            </Button>
            {previewURL && (
              <div className="fixed bottom-5 right-5 bg-white border shadow-lg rounded-lg overflow-hidden w-[200px] z-50">
                <div className="relative">
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="w-full h-[150px] object-cover"
                  />
                  <button
                    onClick={removeFile}
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1"
                  >
                    <XIcon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="xl">
                  <SmileyIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  height={350}
                  width={300}
                />
              </PopoverContent>
            </Popover>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormControl>
                    <Input type="text" placeholder="Type here ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="ghost" size="xl">
              <SendIcon />
            </Button>
          </form>
        </Form>
      </Box>
    </Box>
  );
};

export default CommunityMain;
