"use client";
import { useUserSession } from "@/app/context/user-context";
import React, { useEffect } from "react";

const ShopMainSection = () => {
  const { setRedirectModalOpen } = useUserSession();
  useEffect(() => {
    setRedirectModalOpen(false);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3ozaTdpMDBtamZ3YngxaHUzemFheGU4NnczYXRjZmt1bDlwOXl6OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dgVQkiSSL4TsZDrXYx/giphy.gif"
          alt="Shop Coming Soon"
          className="mx-auto w-64 h-64 object-contain"
        />
        <h1 className="text-3xl font-bold mt-6 text-gray-800">Coming Soon</h1>
        <p className="text-gray-600 mt-2">
          We’re working hard to bring you the shop experience you deserve.
        </p>
      </div>
    </div>
  );
};

export default ShopMainSection;
