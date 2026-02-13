import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/db";

export const checkUser = async () => {
  const user = await currentUser();

  // Check if the user is authenticated
  if (!user) {
    return null;
  }

  // Check if the user exists in the database
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  // if user is in the database return the user
  if (loggedInUser) {
    return loggedInUser;
  }
  // if user is not in the database create a new user and return it
  const newUser = await prisma.user.create({
    data: {
      email: user.emailAddresses[0].emailAddress,
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
    },
  });
  return newUser;
};
