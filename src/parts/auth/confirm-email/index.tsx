"use client";

import AuthCard from "@/components/card/auth-card";
import { type ConfirmEmailSchemaType, confirmEmailSchema } from "@/schemas";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { useConfirmEmail } from "@/services/auth";
import Storage from "@/utils/storage";
import { useHandlePush } from "@/hooks/handlePush";
import { ROUTES } from "@/constants/routes";

const ConfirmEmail: React.FC = () => {
  const { handlePush } = useHandlePush();
  const email = Storage.get("email");
  const { confirmEmailData, confirmEmailIsLoading, confirmEmailPayload } =
    useConfirmEmail((res: any) => {
      Storage.remove("email");
      handlePush(ROUTES.AUTH.LOGIN);
    });
  const form = useForm<ConfirmEmailSchemaType>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      email: email?.toString() || "",
      token: "",
    },
  });

  async function onSubmit(values: ConfirmEmailSchemaType) {
    confirmEmailPayload(values);
  }

  return (
    <div className="flex gap-8 py-8 h-[75vh]">
      <Card className="rounded-[12px] p-8 w-full bg-white">
        <CardContent className="flex h-full items-center p-0">
          <div className="w-full">
            <p className="mb-2 font-bold text-2xl text-[#111928]">
              Confirm Email
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-10 space-y-5"
              >
                <InputForm
                  form={form}
                  name={"email"}
                  label="Email"
                  disabled={true}
                />
                <InputForm form={form} name={"token"} label="Token" />

                <Button
                  variant="secondary"
                  className="w-full py-2.5 font-medium text-sm"
                  disabled={confirmEmailIsLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <div className="w-fit-content hidden md:block">
        <AuthCard />
      </div>
    </div>
  );
};

export default ConfirmEmail;
