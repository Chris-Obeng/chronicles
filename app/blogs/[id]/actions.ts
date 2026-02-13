import { prisma } from "@/db";

export const getBlogById = async (id: string) => {
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return blog;
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
