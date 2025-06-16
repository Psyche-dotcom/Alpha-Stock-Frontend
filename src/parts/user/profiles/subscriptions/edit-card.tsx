"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(5, "Name must be greater 4"),
  cardnumber: z.string().min(5, "Name must be greater 4"),
  expirydate: z.string().min(5, "Name must be greater 4"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const EditCard: React.FC = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardnumber: "",
      expirydate: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
    console.warn(values);
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="font-semibold text-xl text-[#111928] mb-4">
          Edit Alert Preference
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Card Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
                    {...field}
                    className="h-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardnumber"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
                    {...field}
                    className="h-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expirydate"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="01/02"
                    {...field}
                    className="h-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            btnText="Save Card"
            className="w-full rounded-lg py-4 text-sm font-medium bg-[#291804] text-white"
            variant="default"
            size="xl"
          />
        </form>
      </Form>
    </div>
  );
};

export default EditCard;
