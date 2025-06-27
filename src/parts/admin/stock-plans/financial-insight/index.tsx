"use client";

import InputText from "@/components/form/FormInput";
import { CancelIcon, SuccessIcon } from "@/utils/icons";
import { Box, Switch, Text } from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import { useForm } from "react-hook-form";

interface DataType {
  id: number;
  isFree: boolean;
  isRegular: boolean;
  isStandard: boolean;
  feature: string;
  isRegularText?: boolean;
  isStandardText?: boolean;
}

interface IFinancialStock {
  selectOption: string;
}

interface IFormInput {
  email: string;
  password: string;
}

const AdminFinancialInsight: React.FC<IFinancialStock> = ({ selectOption }) => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text fontWeight={600} fontSize={12}>
          FEATURE
        </Text>
      ),
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign="center">
          FREE
        </Text>
      ),
      dataIndex: "",
      key: "id",

      render: (isFree) => {
        return (
          <Box justifyContent={"center"} display="flex">
            {selectOption === "edit" ? (
              <Switch
                // isChecked={record?.switchState}
                // onChange={(e) => console.log(`Switch toggled: ${e.target.checked}`)}
                size="md"
                colorScheme="teal"
              />
            ) : isFree ? (
              <SuccessIcon />
            ) : (
              <CancelIcon />
            )}
          </Box>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign="center">
          REGULAR
        </Text>
      ),
      dataIndex: "",
      key: "id",

      render: (record) => {
        return (
          <Box justifyContent="center" display="flex" alignItems="center">
            {record?.isRegularText ? (
              selectOption === "edit" ? (
                <InputText
                  name="regular"
                  placeholder="3 per month"
                  control={control}
                  style={{
                    padding: "12px",
                  }}
                  mb={0}
                />
              ) : (
                <Text fontSize={16} fontWeight={600} color="#111928">
                  Unlimited
                </Text>
              )
            ) : selectOption === "edit" ? (
              <Switch
                // isChecked={record?.switchState}
                // onChange={(e) => console.log(`Switch toggled: ${e.target.checked}`)}
                size="md"
                colorScheme="teal"
              />
            ) : record?.isRegular ? (
              <SuccessIcon />
            ) : (
              <CancelIcon />
            )}
          </Box>
        );
      },
    },
    {
      title: (
        <Text fontWeight={600} fontSize={12} textAlign="center">
          STANDARD
        </Text>
      ),
      dataIndex: "",
      key: "id",
      render: (record) => {
        return (
          <Box justifyContent="center" display="flex" alignItems="center">
            {record?.isStandardText ? (
              selectOption === "edit" ? (
                <InputText
                  name="standard"
                  placeholder="Unlimited"
                  control={control}
                  style={{
                    padding: "12px",
                  }}
                  mb={0}
                />
              ) : (
                <Text fontSize={16} fontWeight={600} color="#111928">
                  Unlimited
                </Text>
              )
            ) : selectOption === "edit" ? (
              <Switch
                // isChecked={record?.switchState}
                // onChange={(e) =>
                //   console.log(`Switch toggled: ${e.target.checked}`)
                // }
                size="md"
                colorScheme="teal"
              />
            ) : record?.isStandard ? (
              <SuccessIcon />
            ) : (
              <CancelIcon />
            )}
          </Box>
        );
      },
    },
  ];

  const dataSources = [
    {
      id: 1,
      isFree: true,
      isRegular: false,
      isStandard: false,
      feature: "Stock Analysis",
      isRegularText: true,
      isStandardText: true,
    },
    {
      id: 2,
      isFree: false,
      isRegular: false,
      isStandard: true,
      feature: "Data Table",
      isRegularText: false,
      isStandardText: false,
    },
    {
      id: 3,
      isFree: false,
      isRegular: true,
      isStandard: true,
      feature: "Results",
      isRegularText: false,
      isStandardText: false,
    },
  ];

  return (
    <Box bg="#fff" borderRadius="8px" pt={4}>
      <Text fontWeight={600} fontSize={18} color="#111928" m={4} mt={0}>
        Financial Insights
      </Text>
      <Table
        className="custom-table"
        dataSource={dataSources}
        columns={columns}
        //   loading={isLoading}
        pagination={false}
      />
    </Box>
  );
};

export default AdminFinancialInsight;
