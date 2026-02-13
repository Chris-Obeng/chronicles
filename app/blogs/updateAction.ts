const runtime = "edge";
("use server");
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export const updatePost = async (
  id: string,
  title: string,
  content: string,
) => {
  try {
    await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    return { success: "Post updated successfully" };
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: "Failed to update post" };
  }
};
