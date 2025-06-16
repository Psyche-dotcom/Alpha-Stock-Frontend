import EditBlog from "@/parts/admin/blog-manager/edit-blog";

export default function EditBlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  return (
    <>
      <EditBlog blogId={params.blogId} />
    </>
  );
}
