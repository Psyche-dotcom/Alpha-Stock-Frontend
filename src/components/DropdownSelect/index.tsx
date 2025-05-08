import React from "react";
import { Select } from "@chakra-ui/react";

interface DropdownSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      className="cursor-pointer hover:border-gray-400 transition-all duration-200"
    >
      <option value="annual">Annual</option>
      <option value="quarter">Quarter</option>
    </Select>
  );
};

export default DropdownSelect;
