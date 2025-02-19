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
  upperlimit: z.string().min(5, "Name must be greater 4"),
  lowerlimit: z.string().min(5, "Name must be greater 4"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const EditPreference: React.FC = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upperlimit: "",
      lowerlimit: "",
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
            name="upperlimit"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Upper limit</FormLabel>
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
            name="lowerlimit"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Lower limit</FormLabel>
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
          <Button
            btnText="Save Preferences"
            className="w-full rounded-lg py-4 text-sm font-medium bg-[#291804] text-white"
            variant="default"
            size="xl"
          />
        </form>
      </Form>
    </div>
  );
};

export default EditPreference;
