"use client";

import { Box } from "@chakra-ui/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { LogoutInfoIcon } from "@/utils/icons";
import { useUserSession } from "@/app/context/user-context";
import { useHandlePush } from "@/hooks/handlePush";
import { ROUTES } from "@/constants/routes";

const RedirectContent: React.FC = () => {
  const { redirectModalOpen, setRedirectModalOpen } = useUserSession();
  const { handlePush } = useHandlePush();
  return (
    <Dialog
      open={redirectModalOpen}
      onOpenChange={() => setRedirectModalOpen(false)}
    >
      <DialogContent
        className={`left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-[2rem]`}
      >
        <Box>
          <DialogHeader>
            <DialogTitle className="pb-[17px] md:text-3xl text-2xl font-bold text-center">
              Caution
            </DialogTitle>
            <div>
              <div className="flex justify-center">
                <LogoutInfoIcon />
              </div>
              <p className="md:my-8 my-4 text-center text-base font-semibold text-grey-neutral">
                Looks like you're trying to access premium content. Subscribe
                now to unlock it and enjoy the full experience!
              </p>
            </div>
          </DialogHeader>
          <div className="flex justify-between gap-5">
            <Button
              btnText="Cancel"
              className="py-4 text-base font-semibold w-full rounded-lg"
              onClick={() => setRedirectModalOpen(false)}
              variant={"outline"}
              size={"xl"}
            />

            <Button
              btnText="Subscribe"
              variant="default"
              className="py-4 text-base font-bold w-full rounded-lg"
              size={"xl"}
              onClick={() => {
                setRedirectModalOpen(false);
                handlePush(ROUTES.USER.SUBSCRIPTION);
              }}
            />
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default RedirectContent;
