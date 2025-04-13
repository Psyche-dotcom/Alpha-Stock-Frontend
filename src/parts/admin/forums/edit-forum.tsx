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
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  channelName: z.string(),
  category: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const EditForum: React.FC = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelName: "",
      category: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
  }
  const categoryList = [
    {
      title: "Category",
      value: "cat",
    },
  ];
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <FormField
            control={form.control}
            name="channelName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Channel Name</FormLabel>
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
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 border-[#D1D5DB] bg-[#F8F8F9]">
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {categoryList?.map((_, index) => (
                      <SelectItem value={_.value} key={index}>
                        {_.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            btnText="Edit Channel"
            className="w-full rounded-lg py-4 text-sm font-medium bg-[#291804] text-white mt-5"
            variant="default"
            size="xl"
          />
        </form>
      </Form>
    </>
  );
};

export default EditForum;
