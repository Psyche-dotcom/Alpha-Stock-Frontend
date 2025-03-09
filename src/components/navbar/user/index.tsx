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
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SearchSchemaType, searchSchema } from "@/schemas";
import { Form } from "../../ui/form";
import InputForm from "../../form/InputForm";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useUserSession } from "@/app/context/user-context";
import { useHandlePush } from "@/hooks/handlePush";

const UserNavbar = () => {
  const { profileData } = useUserSession();
  const { handlePush } = useHandlePush();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: SearchSchemaType) {
    console.warn(values);
  }

  return (
    <div className="bg-white py-[18.5px] px-4 rounded-[12px] mb-8">
      <div className="flex items-center justify-between lg:gap-[36px] xl:gap-[96px]">
        <Link href={"/"} passHref>
          <CompanyIcon />
        </Link>
        <div className="lg:hidden" onClick={() => setShowNavbar(!showNavbar)}>
          <BurgerIcon />
        </div>
        <div className="flex-1 flex justify-between  lg:flex hidden  lg:flex hidden">
          <div className="justify-between items-center gap-2 me-auto flex">
            {userNavbarList.map((nav, index) => (
              <Link href={nav.path} key={index} passHref>
                <div className="text-sm p-1 font-medium">{nav.title}</div>
              </Link>
            ))}
          </div>
          <div className="flex-end flex items-center gap-8">
            <div className="flex gap-2.5 flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-2.5 w-full"
                >
                  <InputForm
                    form={form}
                    name="search"
                    className="h-10 w-full"
                  />
                  <Button
                    icon={<SearchIcon color="#fff" />}
                    size={"xl"}
                    className="flex items-center p-3 rounded-lg"
                  />
                </form>
              </Form>
            </div>

            <Menu>
              <MenuButton
                px={2}
                py={1}
                // rightIcon={<ArrowDownIcon />}
                border="1px solid #D1D5DB"
                borderRadius={"6px"}
              >
                {/* Avatar display on button */}
                <Flex gap="4px" alignItems="center">
                  <div className="w-[30px] h-[30px] rounded-full">
                    <Image
                      src="/assets/images/card-image.png"
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
                {/* Dropdown menu items */}
                <MenuItem onClick={() => handlePush(ROUTES.USER.PROFILE)}>
                  Profile
                </MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Log out</MenuItem>
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2.5 w-full mt-3"
            >
              <InputForm form={form} name="search" className="h-10 w-full" />
              <Button
                icon={<SearchIcon color="#fff" />}
                variant={"secondary"}
                className="flex items-center p-3"
              />
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
