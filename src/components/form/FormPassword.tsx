"use client";

import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useController, RegisterOptions, Control } from "react-hook-form";
import { AiFillEye, AiOutlineEye } from "react-icons/ai";

interface IInputText {
  label?: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  name: string;
  control: Control<any>;
  mb?: number;
}

const InputPassword: React.FC<IInputText> = ({
  label,
  rules,
  control,
  defaultValue = "",
  placeholder,
  disabled = false,
  name,
  mb = 5,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          placeholder={placeholder}
          {...field}
          className="py-5 px-3 w-full mb-1 border-2 border-[#D1D5DB] bg-white rounded-lg"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[50%] right-4 transform -translate-y-1/2"
        >
          {showPassword ? <AiFillEye size={24} /> : <AiOutlineEye size={24} />}
        </button>
      </div>
      {fieldState.error && (
        <Text color="#FF0000">{fieldState.error.message}</Text>
      )}
    </Box>
  );
};

export default InputPassword;
