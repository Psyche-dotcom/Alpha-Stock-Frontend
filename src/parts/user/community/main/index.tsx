"use client";

import CommentCard from "@/components/card/comment-card";
import { communityList } from "@/constants";
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

const CommunityMain = () => {
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
    <Box borderRadius="8px" bg="#C2BAB2" p={8} w="100%">
      <Flex flexDirection={"column"} gap={4}>
        {communityList.map((comment: IComments, index: number) => (
          <CommentCard
            comment={comment}
            key={index}
            showOptions={true}
            showUpload={true}
          />
        ))}
      </Flex>
      <Box
        height={"4.125rem"}
        position={"fixed"}
        bottom={0}
        bg="white"
        p="12px"
        borderRadius={"8px"}
        maxWidth={"36.25rem"}
        zIndex={10}
        width={"100%"}
        backdropFilter={"blur(10px)"}
        boxShadow={"xl"}
        m="0px auto"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 items-center"
          >
            <Button variant={"ghost"} size="xl">
              <FileUploadIcon />
            </Button>
            <Button variant={"ghost"} size="xl">
              <SmileyIcon />
            </Button>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormControl>
                    <Input type="text" placeholder="Type here ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant={"ghost"} size="xl">
              <SendIcon />
            </Button>
          </form>
        </Form>
      </Box>
    </Box>
  );
};

export default CommunityMain;
