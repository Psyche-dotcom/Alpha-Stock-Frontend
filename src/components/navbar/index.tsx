"use client";

import { BurgerIcon } from "@/utils/icons";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  return (
    <div className="bg-white px-4">
      <div className="py-3 flex items-center lg:gap-[64px] xl:gap-[96px] justify-between max-w-[1440px] mx-auto">
        {/* Logo on the left */}
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

        {/* Desktop Navbar - Only Auth Buttons */}
        <div className="lg:gap-[64px] xl:gap-[96px] hidden lg:flex items-center flex-1 justify-end"> {/* Added justify-end */}
          {/* Auth Buttons (right-aligned) */}
          <div className="flex gap-4 items-center">
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

        {/* Mobile Burger Icon */}
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setShowNavbar(!showNavbar)}
        >
          <BurgerIcon />
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only Auth Buttons */}
      {showNavbar && (
        <div className="block lg:hidden mt-2 pb-3">
          {/* Mobile Auth Buttons (flex-col for stacking) */}
          <div className="gap-3 flex-col flex mt-4">
            <Link passHref href={ROUTES.AUTH.LOGIN}>
              <Button
                variant="outline"
                className="font-medium border px-3 py-5 border-[#3A2206] w-full"
              >
                Login
              </Button>
            </Link>
            <Link passHref href={ROUTES.AUTH.SIGNUP}>
              <Button
                variant={"secondary"}
                className="font-medium px-3 py-5 w-full"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;