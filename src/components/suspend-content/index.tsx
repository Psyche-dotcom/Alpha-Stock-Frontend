import { Box } from "@chakra-ui/react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useSuspendUser, useUnsuspendUser } from "@/services/user";
import { AlertTriangle } from "lucide-react";
interface iProp {
  email: string;
  username: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSuspended: boolean;
  handleSuccess: () => void;
}
const SuspendContent: React.FC<iProp> = ({
  email,
  username,
  setOpen,
  isSuspended,
  handleSuccess,
}) => {
  const { suspendUserData, suspendUserIsLoading, suspendUserPayload } =
    useSuspendUser((res: any) => {
      handleSuccess();
      setOpen(false);
    });

  const { unSuspendUserData, unSuspendUserIsLoading, unSuspendUserPayload } =
    useUnsuspendUser((res: any) => {
      handleSuccess();
      setOpen(false);
    });

  const handleClick = () => {
    if (isSuspended) {
      unSuspendUserPayload({ email });
      return;
    }
    suspendUserPayload({ email });
  };

  return (
    <Box>
      <DialogHeader>
        <DialogTitle className="pb-[17px] text-2xl font-bold text-center">
          Suspend User
        </DialogTitle>
        <div>
          <div className="flex justify-center">
            <AlertTriangle size={48} color="orange" />
          </div>
          <p className="my-8 text-center text-base font-semibold text-grey-neutral">
            Are you sure you want to suspend{username}
          </p>
        </div>
      </DialogHeader>
      <div className="flex justify-between gap-5">
        <Button
          btnText="Cancel"
          className="py-4 text-base font-semibold w-full rounded-lg"
          onClick={() => setOpen(false)}
          variant={"outline"}
          size={"xl"}
        />
        <Button
          btnText={isSuspended ? "Unsuspend" : "Suspend"}
          variant="default"
          className="py-4 text-base font-bold w-full rounded-lg"
          size={"xl"}
          onClick={handleClick}
          disabled={suspendUserIsLoading || unSuspendUserIsLoading}
        />
      </div>
    </Box>
  );
};
export default SuspendContent;
