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
import { Box, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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
import { DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";

interface IAddStockProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSuccess: () => void;
}

const AddStockPlan: React.FC<IAddStockProps> = ({
  setIsOpen,
  handleSuccess,
}) => {
  const [discounted, setDiscounted] = useState<boolean>(false);
  const formData = {
    name: "",
    amount: "",
    isDIscounted: false,
    discountRate: "",
  };

  const subscriptionSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    amount: z
      .string()
      .min(1, { message: "Discount rate cannot be empty" })
      .regex(/^\d+(\.\d+)?$/, {
        message: "Discount rate must be a valid number (e.g., 10, 10.5)",
      }),
    isDIscounted: z.boolean().default(false).optional(),
    discountRate: discounted
      ? z
          .string()
          .min(1, { message: "Discount rate cannot be empty" })
          .regex(/^\d+(\.\d+)?$/, {
            message: "Discount rate must be a valid number (e.g., 10, 10.5)",
          })
      : z.string().nullable(),
  });

  type SubscriptionSchemaType = z.infer<typeof subscriptionSchema>;

  const form = useForm<SubscriptionSchemaType>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: formData,
  });

  const {
    createSubscriptionData,
    createSubscriptionIsLoading,
    createSubscriptionPayload,
  } = useCreateSubscription((res: any) => {
    handleSuccess();
    setIsOpen(false);
  });

  const { watch } = form;
  let isDiscounted = watch("isDIscounted");

  useEffect(() => {
    setDiscounted(isDiscounted || false);
  }, [isDiscounted]);

  async function onSubmit(values: SubscriptionSchemaType) {
    const payload = {
      name: values.name,
      amount: values.amount,
      isDIscounted: values.isDIscounted,
      discountRate: values.discountRate,
      billingInterval: "1",
    };

    createSubscriptionPayload(payload);
  }

  return (
    <>
      <DialogTitle className="pb-[17px] text-2xl font-bold text-center">
        Create Plan
      </DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          {isDiscounted && (
            <InputForm
              form={form}
              name={"discountRate"}
              label="Discount Rate"
            />
          )}
          {/* <FormField
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
            /> */}
          <Flex gap={8}>
            <ButtonIcon
              text="Cancel"
              variant="outline"
              color="#7B6B58"
              border="1px solid #7B6B58"
              w="87px"
              p="10px"
              type="button"
              onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default AddStockPlan;
