"use client";

import AuthCard from "@/components/card/auth-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "@/components/form/InputForm";
import { SignupSchemaType, signupSchema } from "@/schemas";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { useSignup } from "@/services/auth";
import { useHandlePush } from "@/hooks/handlePush";
import Storage from "@/utils/storage";

const Signup: React.FC = () => {
  const { handlePush } = useHandlePush();

  const { signupData, signupIsLoading, signupPayload } = useSignup(
    (res: any) => {
      handlePush(ROUTES.AUTH.CONFIRMEMAIL);
    }
  );

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      country: "",
      phoneNumber: "",
    },

    mode: "onBlur",
  });

  async function onSubmit(values: SignupSchemaType) {
    signupPayload(values);

    Storage.set("email", values.email);
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
              <div className="flex gap-3">
                <InputForm
                  form={form}
                  name={"firstName"}
                  label="First Name"
                  placeholder="John"
                />
                <InputForm
                  form={form}
                  name={"lastName"}
                  label="Last Name"
                  placeholder="Doe"
                />
              </div>
              <div className="flex gap-3">
                <InputForm
                  form={form}
                  name={"userName"}
                  label="Username"
                  placeholder="doe05"
                />
                <InputForm
                  form={form}
                  name={"email"}
                  label="Email"
                  placeholder="johndoe@gmail.com"
                />
              </div>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Country</FormLabel>
                      <CountryDropdown
                        placeholder="--select option--"
                        defaultValue={field.value}
                        onChange={(country) => {
                          field.onChange(country.name);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <InputForm
                  form={form}
                  name={"phoneNumber"}
                  label="Phone Number"
                  placeholder="+12309911223"
                />
              </div>
              <InputForm
                type="password"
                name="password"
                form={form}
                label="Password"
                placeholder="Password12"
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
                disabled={signupIsLoading}
              >
                Sign Up
              </Button>
            </form>
          </Form>
          <Separator className="bg-[#E5E7EB] h-1 my-8" />
          <div className="flex gap-2 items-center justify-center mt-8">
            <p className="font-medium text-sm text-[#6B7280]">
              Already a user on our platform?
            </p>
            <Link
              href={ROUTES.AUTH.LOGIN}
              passHref
              className="text-[#3A2206] font-bold text-sm p-0"
            >
              Login Here
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

export default Signup;
