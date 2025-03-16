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
    <Select value={value} onChange={handleChange}>
      <option value="annual">Annual</option>
      <option value="quarter">Quarter</option>
    </Select>
  );
};

export default DropdownSelect;
