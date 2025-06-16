import React from "react";
import { Select } from "@chakra-ui/react";

interface DropdownSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const YearDropdownSelect: React.FC<DropdownSelectProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <Select value={value} onChange={handleChange}>
      {[...Array(20)].map((_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1} Year{index + 1 > 1 ? "s" : ""}
        </option>
      ))}
    </Select>
  );
};

export default YearDropdownSelect;
