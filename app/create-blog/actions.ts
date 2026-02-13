"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { checkUser } from "@/lib/checkUser";

export const createPost = async (formData: FormData) => {
  const checkSavedUser = await checkUser();
  const { userId } = await auth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    return { error: "Title and content are required." };
  }

  if (!userId) {
    return { error: "You must be signed in to create a post." };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });

    revalidatePath("/");
    return { success: "Post created successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};
