import { Box } from "@chakra-ui/react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { DeleteIcon } from "lucide-react";
interface iProp {
  header: string;
  description: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteContent: React.FC<iProp> = ({ header, description, setOpen }) => {
  return (
    <Box>
      <DialogHeader>
        <DialogTitle className="pb-[17px] text-2xl font-bold text-center">
          {header}
        </DialogTitle>
        <DialogDescription>
          <div className="flex justify-center">
            <DeleteIcon size={48} />
          </div>
          <p className="my-8 text-center text-base font-semibold text-grey-neutral">
            {description}
          </p>
        </DialogDescription>
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
          btnText="Okay"
          variant="default"
          className="py-4 text-base font-bold w-full rounded-lg"
          size={"xl"}
        />
      </div>
    </Box>
  );
};
export default DeleteContent;
