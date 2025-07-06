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
import { Button } from "@/components/ui/button"; // Make sure Button is imported
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/services/auth";
import { setCookie } from "cookies-next";

const Login: React.FC = () => {
  const { loginData, loginIsLoading, loginPayload, loginDataError } = useLogin(
    (res: any) => {
      setCookie("token", res?.jwt);
      if (res?.userRole[0].toLowerCase() === "user") {
        window.location.href = ROUTES.USER.HOME;
        return;
      }
      window.location.href = "/admin/users";
    }
  );
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

          {/* This is the new Google Sign-in button section */}
          <p className="text-sm font-normal text-center mb-8 text-[#6B7280]">
            Or sign in with
          </p>
          <div className="flex justify-center"> {/* Added for centering the button */}
            <Button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/google-auth", // 👈 redirect here after Google login
                })
              }
              btnText="Google" // Text for the button
              variant="outline" // Use your outline variant
              className="w-full max-w-[280px] text-base font-medium flex items-center justify-center gap-2" // Adjust width and ensure icon spacing
              icon={<GoogleIcon />} // Pass the GoogleIcon component
            >
              Sign in with Google {/* This text will be overridden by btnText prop if your Button component uses it */}
            </Button>
          </div>

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