"use client";

import { userNavbarList } from "@/constants";
import {
  ArrowDownIcon,
  BurgerIcon,
  CompanyIcon,
  SearchIcon,
} from "@/utils/icons";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useUserSession } from "@/app/context/user-context";
import { useHandlePush } from "@/hooks/handlePush";
import SearchDropdown from "@/components/search-dropdown";
import Logout from "@/components/logout";
import { usePathname } from "next/navigation";

const UserNavbar = () => {
  const { profileData, setRedirectModalOpen } = useUserSession();
  const { handlePush } = useHandlePush();
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const isActive = (path: string) => {
    const cleanPath = pathname.split("?")[0];

    // Always match exact for "/"
    if (path === "/") return cleanPath === "/";

    // Normalize trailing slashes
    const normalizedCurrent = cleanPath.replace(/\/$/, "");
    const normalizedTarget = path.replace(/\/$/, "");

    // Split into segments
    const currentSegments = normalizedCurrent.split("/");
    const targetSegments = normalizedTarget.split("/");

    for (let i = 0; i < targetSegments.length; i++) {
      if (currentSegments[i] !== targetSegments[i]) return false;
    }

    return true;
  };
  const handleClick = (e: React.MouseEvent, route: string) => {
    if (
      !profileData?.result?.isSubActive &&
      (route === ROUTES.USER.WISHLIST || route === ROUTES.USER.COMMUNITY)
    ) {
      e.preventDefault();
      setRedirectModalOpen(true);
    }
  };

  return (
    <div className="bg-white px-4 sticky z-10 top-0 shadow-xl">
      <div className="flex items-center justify-between lg:gap-[36px] xl:gap-[96px] max-w-[1440px] mx-auto ">
        <Link href={ROUTES.USER.HOME} passHref className="hidden lg:block">
          <img
            src="/assets/images/alpha-desktop.png"
            alt="Company logo"
            className="w-full h-[40px] object-cover my-4"
          />
        </Link>

        <div className="block lg:hidden my-4">
          <Link href={ROUTES.USER.HOME} passHref>
            <Image
              src="/assets/images/company-mobile.png"
              width={60}
              height={40}
              alt="Company logo"
              className="w-full"
            />
          </Link>
        </div>

        {/* Mobile: Profile image dropdown + hamburger */}
        <div className="lg:hidden flex items-center gap-3 my-4">
          <Menu>
            <MenuButton className="focus:outline-none p-0 m-0">
              <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
                <Image
                  src={
                    profileData?.result?.profilePicture ||
                    "/assets/images/card-image.png"
                  }
                  width={32}
                  height={32}
                  alt="Profile"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handlePush(ROUTES.USER.SETTINGS)}>
                Settings
              </MenuItem>
              <MenuItem onClick={() => setOpen(true)}>Log out</MenuItem>
            </MenuList>
          </Menu>

          <div
            className="cursor-pointer"
            onClick={() => setShowNavbar(!showNavbar)}
          >
            <BurgerIcon />
          </div>
        </div>

        <div className="flex-1  justify-between   gap-5 lg:flex hidden">
          <div className="justify-between items-center gap-2 flex">
            {userNavbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div
                  onClick={(e) => handleClick(e, nav.path)}
                  className={` text-sm p-1 font-medium hover:scale-110 transition-transform cursor-pointer ${
                    pathname === nav.path ? "text-[#3A2206] font-black" : ""
                  }`}
                >
                  {nav.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex-end flex items-center gap-8 flex-1">
            <div className="flex gap-2.5 flex-1">
              <SearchDropdown isAuth={true} />
            </div>

            <Menu>
              <MenuButton
                px={2}
                py={1}
                border="1px solid #D1D5DB"
                borderRadius={"6px"}
              >
                <Flex gap="4px" alignItems="center">
                  <div className="w-[30px] h-[30px] rounded-full">
                    <Image
                      src={
                        profileData?.result?.profilePicture ||
                        "/assets/images/card-image.png"
                      }
                      width={30}
                      height={30}
                      alt="Avatar icon"
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <Box textAlign={"start"}>
                    <Text color="#111928" fontWeight={600} fontSize="12px">
                      {profileData?.result?.firstName.toLowerCase()}
                    </Text>
                  </Box>
                  <ChevronDown size={14} />
                </Flex>
              </MenuButton>
              <MenuList maxW={"60px"}>
                <MenuItem onClick={() => handlePush(ROUTES.USER.SETTINGS)}>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => setOpen(true)}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      {showNavbar && (
        <div className="mt-4 pb-10">
          {" "}
          {/* <-- Add pb-10 here */}
          <div className="flex-col gap-2 flex">
            {userNavbarList.map((nav, index) => (
              <Link
                href={nav.path}
                key={index}
                passHref
                onClick={(e) => {
                  setShowNavbar(!showNavbar);
                  handleClick(e, nav.path);
                }}
              >
                <div
                  className={`text-sm p-1 font-medium ${
                    pathname === nav.path ? "text-[#3A2206] font-black" : ""
                  }`}
                >
                  {nav.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 px-2">
            <SearchDropdown isAuth={true} />
          </div>
        </div>
      )}

      <Logout open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserNavbar;
