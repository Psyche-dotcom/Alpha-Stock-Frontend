import BlogDetails from "@/parts/user/blog/single-blog";

export default function BlogDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <BlogDetails blogId={params.id} />
    </>
  );
}
