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
  disabled?: boolean;
}

const InputForm: React.FC<IProps> = ({
  form,
  label,
  type = "text",
  placeholder = "example@revvapay.com",
  name,
  className = "h-14",
  disabled = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className="w-full">
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              className={cn("border-[#D1D5DB]", className)}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
