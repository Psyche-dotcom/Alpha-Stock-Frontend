"use client";

import AuthCard from "@/components/card/auth-card";
import { ROUTES } from "@/constants/routes";
import { type LoginSchemaType, loginSchema } from "@/schemas";
import { GoogleIcon } from "@/utils/icons";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/services/auth";
import { useHandlePush } from "@/hooks/handlePush";

const Login: React.FC = () => {
  const { handlePush } = useHandlePush();
  const { loginData, loginIsLoading, loginPayload } = useLogin((res: any) => {
    if (res?.userRole[0].toLowerCase() === "user") {
      handlePush(ROUTES.USER.HOME);
      return;
    }
    handlePush("/admin/users");
  });
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    loginPayload(values);
  }

  return (
    <div className="flex gap-8 py-8">
      <Card className="rounded-[12px] p-8 w-full bg-white">
        <CardContent className="p-0">
          <p className="mb-2 font-bold text-2xl text-[#111928]">
            Welcome Back,
          </p>
          <p className="mb-8 font-normal text-base text-[#111928]">
            Lets get you on track with the right trade insights.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mb-10 space-y-5"
            >
              <InputForm form={form} name={"email"} label="Email" />
              <InputForm
                type="password"
                name="password"
                form={form}
                label="Password"
              />
              <div className="flex gap-2 items-center justify-end mb-8">
                <p className="font-medium text-sm text-[#6B7280]">
                  Forgot password?
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="text-[#3A2206] font-bold text-sm p-0"
                >
                  <Link href={ROUTES.AUTH.FORGOTPASSWORD} passHref>
                    Recover here
                  </Link>
                </Button>
              </div>
              <Button
                variant="secondary"
                className="w-full py-2.5 font-medium text-sm"
                disabled={loginIsLoading}
              >
                Sign in
              </Button>
            </form>
          </Form>

          <Separator className="bg-[#E5E7EB] h-1 my-8" />
          <p className="text-sm font-normal text-center mb-8 text-[#6B7280]">
            Or sign in with
          </p>
          <Button
            btnText="Google"
            variant="outline"
            className="w-full text-base font-medium"
            icon={<GoogleIcon />}
          />
          <div className="flex gap-2 items-center justify-center mt-8">
            <p className="font-medium text-sm text-[#6B7280]">
              New to the our platform?
            </p>

            <Link
              href={ROUTES.AUTH.SIGNUP}
              passHref
              className="text-[#3A2206] font-bold text-sm p-0"
            >
              Sign-up here
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="w-fit-content hidden md:block">
        <AuthCard />
      </div>
    </div>
  );
};

export default Login;
