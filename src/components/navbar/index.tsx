"use client";

import { navbarList } from "@/constants";
import { BurgerIcon, CompanyIcon, SearchIcon } from "@/utils/icons";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SearchSchemaType, searchSchema } from "@/schemas";
import { Form } from "../ui/form";
import InputForm from "../form/InputForm";

const Navbar = () => {
  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: SearchSchemaType) {
    console.warn(values);
  }
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  return (
    <div className="bg-white py-[18.5px] px-4">
      <div className="flex items-center lg:gap-[64px] xl:gap-[96px] justify-between">
        <Link href={"/"} passHref>
          <CompanyIcon />
        </Link>
        <div className="lg:gap-[64px] xl:gap-[96px] hidden lg:flex items-center flex-1">
          <div className="flex me-auto lg:gap-1 gl:gap-2 flex items-center justify-between">
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div className="p-4">{nav.title}</div>
              </Link>
            ))}
          </div>
          <div className="flex lg:gap-[32px] xl:gap-[64px] flex-1">
            {/* <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2.5 w-full"
              >
                <InputForm
                  form={form}
                  name="search"
                  className="h-10 w-full"
                  type="search"
                />
                <Button
                  icon={<SearchIcon color="#fff" />}
                  variant={"secondary"}
                  className="flex items-center p-3"
                />
              </form>
            </Form> */}

            <div>
              <div className="gap-4 items-center flex">
                <Button
                  variant="outline"
                  className="font-medium border px-3 py-5 border-[#3A2206] w-fit-content"
                >
                  <Link passHref href={ROUTES.AUTH.LOGIN}>
                    Login
                  </Link>
                </Button>
                <Button
                  variant={"secondary"}
                  className="font-medium px-3 py-5 w-fit-content"
                >
                  <Link passHref href={ROUTES.AUTH.SIGNUP}>
                    Create Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden" onClick={() => setShowNavbar(!showNavbar)}>
          <BurgerIcon />
        </div>
      </div>
      {showNavbar && (
        <div className="block lg:hidden mt-2">
          <div className="flex flex-col">
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div className="p-2 text-lg font-medium">{nav.title}</div>
              </Link>
            ))}
          </div>

          {/* <div className="flex gap-2.5 mb-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2.5 w-full"
              >
                <InputForm form={form} name="search" className="h-10 w-full" />
                <Button
                  icon={<SearchIcon color="#fff" />}
                  className="flex items-center p-3"
                />
              </form>
            </Form>
          </div> */}
          <div className="gap-3 flex-col flex">
            <Button
              variant="outline"
              className="font-medium border px-3 py-5 border-[#3A2206] w-fit-content"
            >
              <Link passHref href={ROUTES.AUTH.LOGIN}>
                Login
              </Link>
            </Button>
            <Button
              variant={"secondary"}
              className="font-medium px-3 py-5 w-fit-content"
            >
              <Link passHref href={ROUTES.AUTH.SIGNUP}>
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
