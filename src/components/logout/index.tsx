import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { LogoutInfoIcon } from "@/utils/icons";
import { deleteCookie } from "cookies-next";
interface iProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<iProps> = ({ open, setOpen }) => {
  async function logout() {
    await deleteCookie("refresh-token");
    await deleteCookie("token");
    await deleteCookie("role");

    window.location.href = "/login";
  }
  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="bg-white left-[50%] max-w-[460px] w-full translate-x-[-50%] pt-5">
          <DialogHeader>
            <DialogTitle className="mb-6 border-b border-[#E5E7EB] pb-[17px] text-2xl font-bold text-primary-green-dark">
              Logout
            </DialogTitle>
            <DialogDescription>
              <div className="flex justify-center">
                <LogoutInfoIcon />
              </div>
              <p className="my-8 text-center text-base font-semibold text-grey-neutral">
                Are you sure you want to sign out?
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-5">
            <Button
              btnText="No"
              variant="outline"
              className="w-full text-base font-medium h-12"
              onClick={() => setOpen(false)}
            />
            <Button
              variant="secondary"
              className="w-full py-2.5 font-medium text-sm h-12"
              onClick={logout}
            >
              Yes, Log out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Logout;
