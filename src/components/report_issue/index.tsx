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
import { useSubmitReport } from "@/services/wishlist";
import { showSuccessAlert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface iProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitReport: React.FC<iProps> = ({ setIsOpen }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { reset } = form;

  const { submitReportData, submitReportIsLoading, submitReportPayload } =
    useSubmitReport((res: any) => {
      setIsOpen(false);
      showSuccessAlert(res?.result);
      reset();
    });

  async function onSubmit(values: FormSchemaType) {
    const payload = {
      message: values.message,
    };
    submitReportPayload(payload);
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="font-semibold text-xl text-[#111928] mb-4">
          Submit Report
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Message
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Enter your message here..."
                    className="w-full min-h-[120px] px-4 py-3 text-sm border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#291804] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            btnText="Submit Report"
            className="w-full rounded-lg py-4 text-sm font-medium bg-[#291804] text-white"
            variant="default"
            size="xl"
            disabled={submitReportIsLoading}
          />
        </form>
      </Form>
    </div>
  );
};

export default SubmitReport;
