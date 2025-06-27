"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useUserSessionData } from "../sessions";
import SpinnerFill from "@/components/spinner";

interface AdminSessionContextType {
  profileData: any;
  profileError: any;
  isProfileLoading: boolean;
  selectedChannel: string;
  setSelectedChannel: (value: string) => void;
  selectedReplyChannel: string;
  setSelectedReplyChannel: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  redirectModalOpen: boolean;
  setRedirectModalOpen: (value: boolean) => void;
  showSavedMessages: string;
  setShowSavedMessages: (value: string) => void;
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
  const [selectedChannel, setSelectedChannel] = React.useState<string>("");
  const [selectedReplyChannel, setSelectedReplyChannel] =
    React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [showSavedMessages, setShowSavedMessages] =
    React.useState<string>("community");
  const [redirectModalOpen, setRedirectModalOpen] =
    React.useState<boolean>(false);
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
      value={{
        profileData,
        profileError,
        isProfileLoading,
        selectedChannel,
        setSelectedChannel,
        selectedReplyChannel,
        setSelectedReplyChannel,
        isOpen,
        setIsOpen,
        redirectModalOpen,
        setRedirectModalOpen,
        showSavedMessages,
        setShowSavedMessages,
      }}
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
