import { toast } from "sonner";

export const showSuccessAlert = (message: string) => {
  toast.success(message, {
    position: "top-right",
  });
};

export const showErrorAlert = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
  });
};
