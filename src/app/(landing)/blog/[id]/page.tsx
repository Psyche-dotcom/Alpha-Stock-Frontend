"use client";

import { UserSessionProvider } from "@/app/context/user-context";
import BlogDetails from "@/parts/landing-page/blog/single-blog";

export default function BlogDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <UserSessionProvider>
        <BlogDetails blogId={params.id} />
      </UserSessionProvider>
    </>
  );
}
