import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
interface IProps {
  form: any;
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  className?: string;
}

const InputForm: React.FC<IProps> = ({
  form,
  label,
  type = "text",
  placeholder = "example@revvapay.com",
  name,
  className = "h-14",
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>Email Address</FormLabel>}
          <FormControl className="w-full">
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              className={cn("border-[#D1D5DB]", className)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
