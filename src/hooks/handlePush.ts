import { useRouter } from "next/navigation";
// @ts-expect-error: NProgress does not have types defined
import * as NProgress from "nprogress";

export const useHandlePush = () => {
  const { push } = useRouter();

  const handlePush = (path: string) => {
    NProgress.start();
    push(path);
  };

  return { handlePush };
};
