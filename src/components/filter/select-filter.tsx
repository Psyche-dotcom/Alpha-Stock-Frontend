"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface selectType {
  value: string;
  text: string;
}
interface IProps {
  list: selectType[];
  placeholder?: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  customSize?: boolean;
}

export function SelectFilter({
  list,
  placeholder = "Status",
  setFilter,
  customSize = true,
}: IProps) {
  return (
    <Select
      onValueChange={async (value) => {
        await setFilter(value);
      }}
    >
      <SelectTrigger className={customSize ? "w-[186px] h-12" : ""}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="">
        <SelectGroup>
          {list?.map((list, index: number) => (
            <SelectItem value={list?.value} key={index}>
              {list?.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
