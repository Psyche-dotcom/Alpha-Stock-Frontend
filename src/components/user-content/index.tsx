"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { UserData } from "@/types";

interface iProps {
  userImg?: string;
  setClose: () => void;
  user: UserData | undefined;
}

const UserDetails: React.FC<iProps> = ({ setClose, user }) => {
  const formData = {
    id: user?.id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    activeSubcriptionName: user?.activeSubcriptionName || "",
    isEmailConfirmed: user?.isEmailConfirmed ? "Yes" : "No",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    userName: user?.userName || "",
    isSubActive: user?.isSubActive ? "Active" : "Inactive",
    created:
      (user?.created && new Date(user?.created).toLocaleDateString()) || "",
  };

  const form = useForm({
    defaultValues: formData,
  });

  async function onSubmit(values: any) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex items-center justify-center mt-6">
          <Image
            height={100}
            width={100}
            alt="Customer avatar"
            src={user?.profilePicture || "/images/bladmin-login.jpg"}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
        <div className="flex gap-6 mb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nescafe Classic Coffe"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6 mb-6">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nescafe Classic Coffe"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nescafe Classic Coffe"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6 mb-6">
          <FormField
            control={form.control}
            name="activeSubcriptionName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Active Subscription Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Oryza Sativa"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSubActive"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subscription Status</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Oryza Sativa"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6 mb-6">
          <FormField
            control={form.control}
            name="created"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date Joined</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Oryza Sativa"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isEmailConfirmed"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email COnfirmed?</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Oryza Sativa"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="gap-5 justify-end flex">
          <Button
            variant="outline"
            className="w-auto py-4 px-[3rem] font-bold text-base rounded-md"
            size="xl"
            onClick={(e) => {
              e.preventDefault();
              setClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserDetails;
