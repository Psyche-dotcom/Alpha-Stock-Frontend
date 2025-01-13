"use client";
import { ButtonIcon } from "@/components/button/button-icon";
import InputText from "@/components/form/FormInput";
import { Box, Flex, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
  fullname: string;
  username: string;
  phonenumber: string;
}
interface IAddStockProps {
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
}

const AddStockPlan: React.FC<IAddStockProps> = ({ setSelectOption }) => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const [showDiscount, setShowDiscount] = useState<boolean>(true);
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <Flex
      borderRadius={12}
      bg="#FFFFFF"
      justifyContent={"center"}
      mt={4}
      py={10}
    >
      <Box w="588px" position="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="plan_name"
            placeholder="Plan name"
            control={control}
            rules={{
              required: "Plan name is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid plan name",
              },
            }}
          />
          <InputText
            name="plan_cost"
            placeholder="Plan cost"
            control={control}
            rules={{
              required: "Plan cost is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid plan cost",
              },
            }}
          />
          <Switch
            isChecked={showDiscount}
            // onChange={(e) => console.log(`Switch toggled: ${e.target.checked}`)}
            size="md"
            colorScheme="teal"
            mb={5}
          />
          {showDiscount && (
            <Box>
              <InputText
                name="percentage_discount"
                placeholder="Percentage discount%"
                control={control}
                rules={{
                  required: "Percentage discount is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid plan discount",
                  },
                }}
              />

              <InputText
                name="discount_amount"
                placeholder="Discount amount"
                control={control}
                rules={{
                  required: "Discount amount is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid discount amount",
                  },
                }}
              />
            </Box>
          )}
          <Flex gap={8}>
            <ButtonIcon
              text="Cancel"
              variant="outline"
              color="#7B6B58"
              border="1px solid #7B6B58"
              w="87px"
              p="10px"
              type="button"
              onClick={() => setSelectOption("view")}
            />
            <ButtonIcon
              text="Save"
              bg="#291804"
              variant="solid"
              color="#ffffff"
              w="100%"
              p="10px"
              type="submit"
            />
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AddStockPlan;
