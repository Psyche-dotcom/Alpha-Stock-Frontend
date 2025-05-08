"use client";

import { IComments, IMessage } from "@/interface/comment";
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
import { useEffect, useRef, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookmarkCheck, XIcon } from "lucide-react";
import SavedMessageCard from "@/components/card/saved-message";
import SavedMessageCardSkeleton from "@/components/card/skeleton/savedMessageSkeleton";
import { useGetSavedMessages } from "@/services/community";
import { useUploadFile } from "@/services/upload-image";
interface iProps {
  data: any;
  funSend: (message: string, messageType: string) => void;
  funSendReply: (message: string) => void;
  refreshChannelMessage: any;
  commentDataInfo: any;
  isLoading?: boolean;
}

const CommunityMain: React.FC<iProps> = ({
  data,
  funSend,
  funSendReply,
  isLoading,
  commentDataInfo,
  refreshChannelMessage,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { setIsOpen, showSavedMessages, setSelectedReplyChannel } =
    useUserSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [fetchSavedMessaged, setFetchSavedMessages] = useState<boolean>(false);
  const {
    getSavedMessagesData,
    getSavedMessagesIsLoading,
    setSavedMessagesFilter,
  } = useGetSavedMessages({ enabled: fetchSavedMessaged });
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const currentMessage = form.getValues("message");
    const newMessage = currentMessage + emojiData.emoji;
    form.setValue("message", newMessage);
  };
  const { uploadData, uploadFile, uploadIsLoading } = useUploadFile(
    (res: any) => {}
  );
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
    try {
      setIsUploading(true);

      let messageToSend = values.message;
      let messageType = "Text";

      if (selectedFile) {
        // Upload file to external API
        let data = await uploadFile(selectedFile, selectedFile.name);
        messageType = "ImgText";
        messageToSend = `${messageToSend} |||IMG||| ${
          (data as { data: { result: string } })?.data?.result
        }`;
      }

      funSend(messageToSend, messageType);

      // Clear input and image preview
      reset();
      removeFile();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    if (showSavedMessages === "messages") {
      setSavedMessagesFilter({});
      setFetchSavedMessages(true);
    }
  }, [showSavedMessages]);

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
      {showSavedMessages === "messages" ? (
        <Box flex="1" overflowY="auto" className="scrollbar-hide">
          {getSavedMessagesIsLoading ? (
            <Flex flexDirection="column" gap={4}>
              {Array.from({ length: 5 }).map((_, index) => (
                <SavedMessageCardSkeleton key={index} />
              ))}
            </Flex>
          ) : (
            <>
              {getSavedMessagesData.length < 1 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-2">
                  <BookmarkCheck size={56} />
                  <h4 className="text-xl font-medium text-center">
                    Oopz! No Saved Messages...
                  </h4>
                </div>
              ) : (
                <>
                  <Flex flexDirection="column" gap={4}>
                    {getSavedMessagesData?.map(
                      (comment: IMessage, index: number) => (
                        <SavedMessageCard comment={comment} key={index} />
                      )
                    )}
                  </Flex>
                </>
              )}
            </>
          )}
        </Box>
      ) : (
        <>
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
                    commentDataInfo={commentDataInfo}
                    comment={comment}
                    funSendReply={funSendReply}
                    key={index}
                    refreshChannelMessage={refreshChannelMessage}
                    showUpload={true}
                  />
                ))}
              </Flex>
            )}
          </Box>

          <Box
            mt={3}
            minHeight="4.125rem"
            bg="white"
            p="12px"
            py="-12px"
            borderRadius="8px"
            zIndex={10}
            width="100%"
            boxShadow="xl"
            mb="20px"
          >
            {previewURL && (
              <div className="bg-white border shadow-lg rounded-sm overflow-hidden w-[60px] z-50">
                <div className="relative">
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="w-full h-[60px] object-cover mb-1"
                  />
                  <button
                    onClick={removeFile}
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 shadow-lg"
                  >
                    <XIcon className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
            )}
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
                  type="button"
                  variant="ghost"
                  size="xl"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileUploadIcon />
                </Button>
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
                        <Input
                          type="text"
                          placeholder="Type here ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="ghost" size="xl" type="submit">
                  <SendIcon />
                </Button>
              </form>
            </Form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CommunityMain;
