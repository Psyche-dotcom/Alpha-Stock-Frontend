import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddCategory } from "@/services/community";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  category: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface CreateCategoryProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const CreateCategory: React.FC<CreateCategoryProps> = ({ setIsOpen }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });
  const { categoryAddData, categoryAddIsLoading, categoryAddPayload } =
    useAddCategory((res: { statusCode: number; result: any }) => {
      setIsOpen(false);
    });
  async function onSubmit(values: FormSchemaType) {
    console.log("values", values);
    categoryAddPayload(values);
    await Promise.resolve(true);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Category Name</FormLabel>
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
            btnText="Create Category"
            className="w-full rounded-lg py-4 text-sm font-medium bg-[#291804] text-white"
            variant="default"
            size="xl"
          />
        </form>
      </Form>
    </>
  );
};

export default CreateCategory;
