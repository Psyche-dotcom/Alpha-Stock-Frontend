import { useGetProfile } from "@/services/profile";

export const useUserSessionData = () => {
  const { profileData, profileError, isProfileLoading } = useGetProfile({
    enabled: true,
  });

  return { profileData, profileError, isProfileLoading };
};
