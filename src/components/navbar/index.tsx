"use client";

import { navbarList } from "@/constants";
import { BurgerIcon, CompanyIcon, SearchIcon } from "@/utils/icons";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { Box } from "@chakra-ui/react";
import { useHandlePush } from "@/hooks/handlePush";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const { handlePush } = useHandlePush();
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  return (
    <div className="bg-white px-4">
      <div className="py-3 flex items-center lg:gap-[64px] xl:gap-[96px] justify-between max-w-[1440px] mx-auto">
        <Link href={"/"} passHref>
          <div className="hidden lg:block">
            <img
              src="/assets/images/alpha-desktop.png"
              alt="Company logo"
              className="w-full h-[40px] object-cover"
            />
          </div>
          <div className="block lg:hidden">
            <Image
              src="/assets/images/company-mobile.png"
              width={60}
              height={40}
              alt="Company logo"
              className="w-full"
            />
          </div>
        </Link>
        <div className="lg:gap-[64px] xl:gap-[96px] hidden lg:flex items-center flex-1">
          <div className="flex me-auto lg:gap-1 gl:gap-2  items-center justify-between">
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div
                  className={`p-4 hover:scale-110 transition-transform cursor-pointer ${
                    isActive(nav.path) ? "text-[#3A2206] font-bold" : null
                  }`}
                >
                  {nav.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex lg:gap-[32px] xl:gap-[64px] flex-1">
            <Box
              display={"flex"}
              gap="10px"
              flex={1}
              onClick={() => handlePush("/login")}
              border={"1px solid #D1D5DB"}
              h={10}
              justifyContent={"space-between"}
              borderRadius={"12px"}
              alignItems={"center"}
              pl={3}
              cursor={"pointer"}
            >
              <SearchIcon />
            </Box>
            <div>
              <div className="gap-4 items-center flex">
                <Link passHref href={ROUTES.AUTH.LOGIN}>
                  <Button
                    variant="outline"
                    className="font-medium border px-3 py-5 border-[#3A2206] w-fit-content"
                  >
                    Login
                  </Button>
                </Link>
                <Link passHref href={ROUTES.AUTH.SIGNUP}>
                  <Button
                    variant={"secondary"}
                    className="font-medium px-3 py-5 w-fit-content"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <BurgerIcon />
        </div>
      </div>
      {showNavbar && (
        <div className="block lg:hidden mt-2 pb-3">
          <div className="flex flex-col">
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div
                  className={`p-2 text-lg font-medium hover:scale-110 transition-transform cursor-pointer ${
                    isActive(nav.path) ? "text-[#3A2206] font-bold" : null
                  }`}
                >
                  {nav.title}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex gap-2.5 mb-3">
            <Box
              display={"flex"}
              gap="10px"
              flex={1}
              onClick={() => handlePush("/login")}
              border={"1px solid #D1D5DB"}
              h={10}
              justifyContent={"space-between"}
              borderRadius={"12px"}
              alignItems={"center"}
              pl={3}
              cursor={"pointer"}
            >
              <SearchIcon />
            </Box>
          </div>
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
