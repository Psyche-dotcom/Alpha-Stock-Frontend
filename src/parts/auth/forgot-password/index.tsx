"use client";

import AuthCard from "@/components/card/auth-card";
import { type ForgotPasswordSchemaType, forgotPasswordSchema } from "@/schemas";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import InputForm from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";

const ForgotPassword: React.FC = () => {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordSchemaType) {
    console.warn(values);
  }

  return (
    <div className="flex gap-8 py-8 h-[75vh]">
      <Card className="rounded-[12px] p-8 w-full bg-white">
        <CardContent className="flex h-full items-center p-0">
          <div className="w-full">
            <p className="mb-2 font-bold text-2xl text-[#111928]">
              Forgot Password
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-10 space-y-5"
              >
                <InputForm form={form} name={"email"} />

                <Button
                  variant="secondary"
                  className="w-full py-2.5 font-medium text-sm"
                >
                  Send Recovery Link
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

export default ForgotPassword;
