"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import InputForm from "@/components/form/InputForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { subscriptionSchema, SubscriptionSchemaType } from "@/schemas";
import { Box, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateSubscription } from "@/services/subscriptions";

interface IAddStockProps {
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
}

const AddStockPlan: React.FC<IAddStockProps> = ({ setSelectOption }) => {
  const form = useForm<SubscriptionSchemaType>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      amount: "",
      isDIscounted: false,
      discountRate: "",
      billingInterval: "",
    },
  });

  const {
    createSubscriptionData,
    createSubscriptionIsLoading,
    createSubscriptionPayload,
  } = useCreateSubscription((res: any) => {});

  const { watch } = form;

  async function onSubmit(values: SubscriptionSchemaType) {
    console.warn(values);
    createSubscriptionPayload(values);
  }
  const isDIscounted = watch("isDIscounted");
  return (
    <Flex
      borderRadius={12}
      bg="#FFFFFF"
      justifyContent={"center"}
      mt={4}
      py={10}
    >
      <Box w="588px" position="relative">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-10 space-y-5"
          >
            <InputForm form={form} name={"name"} label="Name" />
            <InputForm form={form} name={"amount"} label="Amount" />
            <FormField
              control={form.control}
              name="isDIscounted"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Discounted?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isDIscounted && (
              <InputForm
                form={form}
                name={"discountRate"}
                label="Discount Rate"
              />
            )}
            <FormField
              control={form.control}
              name="billingInterval"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Billing Interval</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-14 border-[#D1D5DB] bg-[#F8F8F9]">
                        <SelectValue placeholder="Discount Rate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Flex gap={8}>
              <ButtonIcon
                text="Cancel"
                variant="outline"
                color="#7B6B58"
                border="1px solid #7B6B58"
                w="87px"
                p="10px"
                type="button"
                onClick={() => setSelectOption("view")}
              />
              <ButtonIcon
                text="Save"
                bg="#291804"
                variant="solid"
                color="#ffffff"
                w="100%"
                p="10px"
                type="submit"
                disabled={createSubscriptionIsLoading}
              />
            </Flex>
          </form>
        </Form>
      </Box>
    </Flex>
  );
};

export default AddStockPlan;
