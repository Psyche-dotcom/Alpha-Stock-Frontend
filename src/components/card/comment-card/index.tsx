"use client";

import { IComment } from "@/interface/comment";
import {
  ChatIcon,
  DownvoteIcon,
  SavedIcon,
  ThreeDotsIcon,
  ThumbsIcon,
} from "@/utils/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
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

import Image from "next/image";
import { boolean, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
interface ICommentProps {
  comment: IComment;
  showOptions?: boolean;
}

const CommentCard: React.FC<ICommentProps> = ({
  comment,
  showOptions = false,
}) => {
  const [showReply, setShowReply] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {}
  return (
    <Box
      bg="#FFFFFF"
      p={6}
      borderRadius="8px"
      border="1px solid #E5E7EB"
      boxShadow="customLight"
    >
      <Flex alignItems={"center"} gap="8px" mb="11px">
        <Box h="24px" width="24px">
          <Image
            width={24}
            height={24}
            src={comment?.url || "/assets/images/card-image.png"}
            alt="Avatar blog view"
            className="rounded-full object-cover h-full w-full"
          />
        </Box>
        <Text fontWeight={600} fontSize={14} color="#111928">
          {comment?.name}
        </Text>
        <Text fontWeight={400} fontSize={12} color="#6B7280">
          Posted {comment?.createdAt}
        </Text>
      </Flex>
      <Text fontWeight={400} fontSize={16} color="#6B7280" mb={4}>
        Posted {comment?.content}
      </Text>
      {comment?.image && (
        <Box mb={4} h={"148px"} w="100%">
          <Image
            width={596}
            height={148}
            alt="Comment post snap"
            src={comment?.image || "/assets/images/card-image"}
            className="object-cover h-full w-full"
          />
        </Box>
      )}

      <Flex
        py="10px"
        ps={5}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" gap={5}>
          <Flex
            alignItems={"center"}
            gap="8px"
            cursor={"pointer"}
            onClick={() => setShowReply(!showReply)}
          >
            <Text fontWeight={500} fontSize={14} color="#1F2A37">
              Reply
            </Text>
            <ChatIcon />
          </Flex>
          <Flex alignItems={"center"} gap="8px" cursor={"pointer"}>
            <Text fontWeight={500} fontSize={14} color="#1F2A37">
              Like
            </Text>
            <ThumbsIcon />
          </Flex>
          {showOptions && (
            <>
              <Flex alignItems={"center"} gap="8px" cursor={"pointer"}>
                <Text fontWeight={500} fontSize={14} color="#1F2A37">
                  Downvote
                </Text>
                <DownvoteIcon />
              </Flex>
              <Flex alignItems={"center"} gap="8px" cursor={"pointer"}>
                <Text fontWeight={500} fontSize={14} color="#1F2A37">
                  Saved
                </Text>
                <SavedIcon />
              </Flex>
            </>
          )}
        </Box>
        <Box>
          <ThreeDotsIcon />
        </Box>
      </Flex>
      {showReply && (
        <Box
          position={"sticky"}
          bottom={0}
          w={"full"}
          bg="white"
          borderRadius={"8px"}
          mt="20px"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-3 items-center"
            >
              <Button>
                <FileUploadIcon />
              </Button>
              <Button>
                <SmileyIcon />
              </Button>
              <FormField
                control={form.control}
                name="email"
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

              <Button>
                <SendIcon />
              </Button>
            </form>
          </Form>
        </Box>
      )}
    </Box>
  );
};
export default CommentCard;
