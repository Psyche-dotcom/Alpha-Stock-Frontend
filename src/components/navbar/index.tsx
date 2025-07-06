"use client";

import { navbarList } from "@/constants";
import { BurgerIcon } from "@/utils/icons"; // Assuming BurgerIcon is a custom SVG component
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  // Removed useHandlePush as it was only used for the now-removed search Box
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

        {/* Desktop Navbar */}
        <div className="lg:gap-[64px] xl:gap-[96px] hidden lg:flex items-center flex-1">
          {/* Navigation Links (left-aligned) */}
          <div className="flex me-auto lg:gap-1 gl:gap-2 items-center justify-between">
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div
                  className={`p-4 hover:scale-110 transition-transform cursor-pointer ${
                    isActive(nav.path) ? "text-[#3A2206] font-bold" : ""
                  }`}
                >
                  {nav.title}
                </div>
              </Link>
            ))}
          </div>

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

      {/* Mobile Menu Dropdown */}
      {showNavbar && (
        <div className="block lg:hidden mt-2 pb-3">
          <div className="flex flex-col">
            {navbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div
                  className={`p-2 text-lg font-medium hover:scale-110 transition-transform cursor-pointer ${
                    isActive(nav.path) ? "text-[#3A2206] font-bold" : ""
                  }`}
                >
                  {nav.title}
                </div>
              </Link>
            ))}
          </div>

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