"use client";
import AuthCard from "@/components/card/auth-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { GoogleIcon } from "@/utils/icons";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputForm from "@/components/form/InputForm";
import { SignupSchemaType, signupSchema } from "@/schemas";

const Signup: React.FC = () => {
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      username: "",
      country: "",
      phonenumber: "",
    },
  });

  async function onSubmit(values: SignupSchemaType) {
    console.warn(values);
  }

  return (
    <div className="gap-8 py-8 flex">
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
              <InputForm form={form} name={"fullname"} />
              <InputForm form={form} name={"email"} />
              <InputForm form={form} name={"username"} />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="border-[#D1D5DB]">
                        <SelectTrigger>
                          <SelectValue placeholder="--select option--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="usdc">USDC</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputForm form={form} name={"phonenumber"} />
              <InputForm type="password" name="password" form={form} />
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
              >
                Sign Up
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
              Already a user on our platform?
            </p>
            <Button asChild className="text-[#3A2206] font-bold text-sm p-0">
              <Link href={ROUTES.AUTH.LOGIN} passHref>
                Login Here
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-fit-content hidden md:block">
        <AuthCard />
      </div>
    </div>
  );
};

export default Signup;
