"use server";
import { prisma } from "@/db";

import { revalidatePath } from "next/cache";
export const deletePost = async (id: string) => {
  try {
    await prisma.post.delete({
      where: { id },
    });
    revalidatePath("/blogs"); // Refresh the page to reflect the deletion
    return { success: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "Failed to delete post" };
  }
};
