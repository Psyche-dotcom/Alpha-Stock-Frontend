"use client";

import CommentCard from "@/components/card/comment-card";

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
interface iProps {
  data: any;
  funSend: (message: string, messageType: string) => void;
}

const CommunityMain: React.FC<iProps> = ({ data, funSend }) => {
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
        <Flex flexDirection="column" gap={4}>
          {data?.map((comment: IComments, index: number) => (
            <CommunityCommentCard
              comment={comment}
              key={index}
              showOptions={true}
              showUpload={true}
            />
          ))}
        </Flex>
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
            <Button variant="ghost" size="xl">
              <FileUploadIcon />
            </Button>
            <Button variant="ghost" size="xl">
              <SmileyIcon />
            </Button>
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
