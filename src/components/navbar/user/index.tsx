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

const UserNavbar = () => {
  const { profileData } = useUserSession();
  const { handlePush } = useHandlePush();
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="bg-white px-4 rounded-[12px] mb-8 sticky py-[18.5px] z-10">
      <div className="flex items-center justify-between lg:gap-[36px] xl:gap-[96px]">
        <Link href={ROUTES.USER.HOME} passHref>
          <CompanyIcon />
        </Link>
        <div className="lg:hidden" onClick={() => setShowNavbar(!showNavbar)}>
          <BurgerIcon />
        </div>
        <div className="flex-1 flex justify-between  lg:flex hidden gap-5 lg:flex hidden">
          <div className="justify-between items-center gap-2 flex">
            {userNavbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div className="text-sm p-1 font-medium">{nav.title}</div>
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
                    <Text color="#6B7280" fontWeight={400} fontSize="12px">
                      320 PTS
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
        <div className="mt-4">
          <div className="flex-col gap-2 flex">
            {userNavbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div className="text-sm p-1 font-medium">{nav.title}</div>
              </Link>
            ))}
          </div>

          <SearchDropdown isAuth={true} />
        </div>
      )}
      <Logout open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserNavbar;
