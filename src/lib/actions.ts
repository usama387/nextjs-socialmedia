"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./PrismaClient";

// this server action is being used in userInfoCardInteraction component the userId is passed from there as props
export const switchFollow = async (userId: string) => {
  // getting my logged in user
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }
  try {
    // checking if user already follows
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    // if user already follows now it can unfollow the user
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      // if user doesn't follow it can send follow request then
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      //   if request is sent user can delete/cancel it
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        // user can follow now
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went Wrong");
  }
};
