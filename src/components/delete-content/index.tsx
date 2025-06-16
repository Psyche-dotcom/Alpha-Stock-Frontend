import { Box } from "@chakra-ui/react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { DeleteIcon, Trash } from "lucide-react";
interface iProp {
  header: string;
  description: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  loading?: boolean;
}
const DeleteContent: React.FC<iProp> = ({
  header,
  description,
  setOpen,
  handleDelete,
  loading,
}) => {
  return (
    <Box>
      <DialogHeader>
        <DialogTitle className="pb-[17px] text-2xl font-bold text-center">
          {header}
        </DialogTitle>
        <div>
          <div className="flex justify-center">
            <Trash size={48} color="red" />
          </div>
          <p className="my-8 text-center text-base font-semibold text-grey-neutral">
            {description}
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
          btnText="Okay"
          variant="default"
          className="py-4 text-base font-bold w-full rounded-lg"
          size={"xl"}
          onClick={handleDelete}
          disabled={loading}
        />
      </div>
    </Box>
  );
};
export default DeleteContent;
