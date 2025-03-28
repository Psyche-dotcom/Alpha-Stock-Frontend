"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useUserSessionData } from "../sessions";
import SpinnerFill from "@/components/spinner";

interface UserSessionContextType {
  profileData: any;
  profileError: any;
  isProfileLoading: boolean;
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

  React.useEffect(() => {
    if (profileError) {
      // Redirect to login page if there is an error with profile data
      router.push("/login");
    }
  }, [profileError, router]);

  if (isProfileLoading) {
    return <SpinnerFill />;
  }

  return (
    <UserSessionContext.Provider
      value={{ profileData, profileError, isProfileLoading }}
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
