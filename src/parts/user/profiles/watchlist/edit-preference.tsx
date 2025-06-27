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
import { IWatchlistData } from "@/interface/company-stock-card";
import { useUpdateWatchlist } from "@/services/wishlist";
import { showSuccessAlert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  upperLimit: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number")
    .min(1, "Upper Limit is required"),
  lowerLimit: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number")
    .min(1, "Lower Limit is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;
interface iProps {
  id: string;
  refetchWishlist: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedWatchlist: IWatchlistData | null;
}

const EditPreference: React.FC<iProps> = ({
  id,
  refetchWishlist,
  setIsOpen,
  selectedWatchlist,
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upperLimit: selectedWatchlist?.upperLimit.toString() || "",
      lowerLimit: selectedWatchlist?.lowerLimit.toString() || "",
    },
  });
  const { reset } = form;
  const { updateWishlistData, updateWishlistIsLoading, updateWishlistPayload } =
    useUpdateWatchlist((res: any) => {
      refetchWishlist();
      setIsOpen(false);
      showSuccessAlert(res?.result);
      reset();
    });

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
    const payload = {
      upperLimit: Number(values.upperLimit),
      lowerLimit: Number(values.lowerLimit),
      stockwishlistId: id,
    };
    updateWishlistPayload(payload);
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
            name="upperLimit"
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
            name="lowerLimit"
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
            disabled={updateWishlistIsLoading}
          />
        </form>
      </Form>
    </div>
  );
};

export default EditPreference;
