"use client";

import CommentCard from "@/components/card/comment-card";
import { communityList } from "@/constants";
import { IComment } from "@/interface/comment";
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
        {communityList.map((comment: IComment, index: number) => (
          <CommentCard comment={comment} key={index} showOptions={true} />
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
        // bg="rgba(255, 255, 255, 0.2)"
        boxShadow={"xl"}
        m="0px auto"
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
                    <Input type="text" placeholder="Type here ..." {...field} />
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
    </Box>
  );
};

export default CommunityMain;
