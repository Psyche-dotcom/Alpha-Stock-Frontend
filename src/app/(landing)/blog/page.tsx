import { UserSessionProvider } from "@/app/context/user-context";
import Blog from "@/parts/landing-page/blog";

export default function BlogPage() {
  return (
    <>
      <UserSessionProvider>
        <Blog />
      </UserSessionProvider>
    </>
  );
}
