"use client";
import FooterLink from "@/components/userfooter";
import SocialIcons from "./social_icon";
import SubmitReport from "@/components/report_issue";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center my-8">
      <SocialIcons />
      <FooterLink
        href="/user/terms-and-conditions"
        label="Terms and Conditions"
        external={false}
      />
      <p
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-xl px-6 py-3 shadow-sm text-sm font-semibold text-black hover:underline"
      >
        Report Issue
      </p>

      <p
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-xl px-6 py-3 shadow-sm text-sm font-semibold text-black hover:underline"
      >
        Charts and Ticker Tape Powered by Tradingview
      </p>

      {/* <FooterLink
        href="mailto:support@alphainvestments.com"
        label="support@alphainvestments.com"
        external
      /> */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="bg-white p-[2rem] pt-[3.5rem] left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
          <SubmitReport setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
