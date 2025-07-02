"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

import { setCookie } from "cookies-next";
import { ROUTES } from "@/constants/routes";
import { useLoginSocial } from "@/services/auth";

export default function GoogleAuth() {
  const { data: session, status } = useSession();
  const { loginPayload } = useLoginSocial((res: any) => {
    setCookie("token", res?.jwt);
    if (res?.userRole[0].toLowerCase() === "user") {
      window.location.href = ROUTES.USER.HOME;

      return;
    }
    window.location.href = "/admin/users";
  });
  useEffect(() => {
    const sendToBackend = async () => {
      // Cast session to any to access custom id_token property
      let token = (session as any)?.id_token;
      if (token) {
        try {
          loginPayload({
            token: token,
            genericPassword: "@Secret123@@6537@App#",
          });
        } catch (error) {
          console.error("Error sending token to backend", error);
        }
      }
    };
    if (status === "authenticated") {
      sendToBackend();
    } else if (status === "unauthenticated") {
      signIn("google", {
        callbackUrl: "/google-auth", // 👈 redirect here after Google login
      }); // fallback just in case
    }
  }, [session, status]);

  return <p>Authenticating with backend...</p>;
}
