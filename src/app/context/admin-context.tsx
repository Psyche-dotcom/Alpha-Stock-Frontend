"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useUserSessionData } from "../sessions";
import SpinnerFill from "@/components/spinner";

interface AdminSessionContextType {
  profileData: any;
  profileError: any;
  isProfileLoading: boolean;
}

const AdminSessionContext = React.createContext<AdminSessionContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export function AdminSessionProvider({ children }: Props) {
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
    <AdminSessionContext.Provider
      value={{ profileData, profileError, isProfileLoading }}
    >
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  const adminSessionContent = React.useContext(AdminSessionContext);

  if (!adminSessionContent) {
    throw new Error(
      "useAdminSession has to be used within <AdminSessionContext.Provider>"
    );
  }

  return adminSessionContent;
}
