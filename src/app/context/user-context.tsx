"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useUserSessionData } from "../sessions";
import SpinnerFill from "@/components/spinner";

interface UserSessionContextType {
  profileData: any;
  profileError: any;
  isProfileLoading: boolean;
  selectedChannel: string;
  setSelectedChannel: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  redirectModalOpen: boolean;
  setRedirectModalOpen: (value: boolean) => void;
}

const UserSessionContext = React.createContext<UserSessionContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export function UserSessionProvider({ children }: Props) {
  const router = useRouter();

  const { profileData, isProfileLoading, profileError } = useUserSessionData();
  const [selectedChannel, setSelectedChannel] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [redirectModalOpen, setRedirectModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (profileError) {
      // Redirect to login page if there is an error with profile data
      router.push("/login");
    }
  }, [profileError, router]);

  React.useEffect(() => {
    if (profileData?.statusCode == 200) {
      if (profileData?.result?.isSubActive) {
        setRedirectModalOpen(false);
      } else {
        setRedirectModalOpen(true);
      }
    }
  }, [profileData]);

  if (isProfileLoading) {
    return <SpinnerFill />;
  }
  return (
    <UserSessionContext.Provider
      value={{
        profileData,
        profileError,
        isProfileLoading,
        selectedChannel,
        setSelectedChannel,
        isOpen,
        setIsOpen,
        redirectModalOpen,
        setRedirectModalOpen,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const userSessionContent = React.useContext(UserSessionContext);

  if (!userSessionContent) {
    throw new Error(
      "useUserSession has to be used within <UserSessionContext.Provider>"
    );
  }

  return userSessionContent;
}
