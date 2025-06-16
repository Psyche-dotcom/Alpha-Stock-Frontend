import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useController, RegisterOptions, Control } from "react-hook-form";

interface IInputText {
  label?: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  name: string;
  control: Control<any>;
  mb?: number;
  style?: {};
}

const TextArea: React.FC<IInputText> = ({
  label,
  rules,
  control,
  defaultValue = "",
  placeholder,
  maxLength = 50,
  disabled = false,
  name,
  mb = 5,
  style,
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <Box mb={mb}>
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={name}
        maxLength={maxLength}
        placeholder={placeholder}
        {...field}
        className="py-5 px-3 mb-1 border-2 border-[#D1D5DB] bg-white rounded-lg w-full h-[256px]"
        style={style}
        disabled={disabled}
      />
      {fieldState.error && (
        <Text color="#FF0000">{fieldState.error.message}</Text>
      )}
    </Box>
  );
};

export default TextArea;
