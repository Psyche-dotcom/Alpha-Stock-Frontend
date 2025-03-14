"use client";

import AuthCard from "@/components/card/auth-card";
import { type ResetPasswordSchemaType, resetPasswordSchema } from "@/schemas";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { useHandlePush } from "@/hooks/handlePush";
import { useResetPassword } from "@/services/auth";
import { ROUTES } from "@/constants/routes";
import Storage from "@/utils/storage";
import { showSuccessAlert } from "@/utils/alert";

const ResetPassword: React.FC = () => {
  const { handlePush } = useHandlePush();
  const email = Storage.get("email");
  const { resetPasswordData, resetPasswordIsLoading, resetPasswordPayload } =
    useResetPassword((res: any) => {
      showSuccessAlert("Reset password successful");
      Storage.remove("email");
      handlePush(ROUTES.AUTH.LOGIN);
    });
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
      email: email?.toString() || "",
    },
  });

  async function onSubmit(values: ResetPasswordSchemaType) {
    resetPasswordPayload(values);
  }

  return (
    <div className="flex gap-8 py-8 h-[100vh]">
      <Card className="rounded-[12px] p-8 w-full bg-white">
        <CardContent className="flex h-full items-center p-0">
          <div className="w-full">
            <p className="mb-2 font-bold text-2xl text-[#111928]">
              Reset Password
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
                <InputForm
                  form={form}
                  name={"password"}
                  label="Password"
                  type="password"
                />
                <InputForm
                  form={form}
                  name={"confirmPassword"}
                  label="Confirm Password"
                  type="password"
                />
                <Button
                  variant="secondary"
                  className="w-full py-2.5 font-medium text-sm"
                  disabled={resetPasswordIsLoading}
                >
                  Save
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

export default ResetPassword;
