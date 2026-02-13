import { prisma } from "@/db";

export const getBlogs = async () => {
  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return blogs;
  } catch (error) {
    return { error: "Failed to fetch blogs." };
  }
};
