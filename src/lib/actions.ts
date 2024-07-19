"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./PrismaClient";
import { z } from "zod";

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

// this server action is being used in userInfoCardInteraction component and userId is being passed as props from there
export const switchBlock = async (userId: string) => {
  // getting logged in user from clerk
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    // if user is blocked it can be unblocked now
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      // if we did not block the user we can block it now
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  // getting logged in user
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    return new Error("User is not authenticated");
  }

  try {
    // checking if logged in user has any follow requests
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    // the user can delete the sender request
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      // user can accept and the sender can follow logged in user
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while accepting request");
  }
};

export const declineFollowRequest = async (userId: string) => {
  // getting logged in user
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    return new Error("User is not authenticated");
  }

  try {
    // checking if logged in user has any follow requests
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    // the user can delete the sender request
    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while accepting request");
  }
};

// this server action is being used in UpdateUser component to update User
export const UpdateProfile = async (formData: FormData, cover: string) => {
  // accessing my formData inputs at once from this method
  const fields = Object.fromEntries(formData);

  // if there is any empty fields during update function it will not be updated
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  // form validation using zod
  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  // passing my fields in this method to be validated
  const validatedFields = Profile.safeParse({ cover,...filteredFields });

  // if fields are not validated
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return "err";
  }

  // getting logged in user
  const { userId } = auth();

  if (!userId) {
    return new Error("User is not authenticated");
  }

  // once the form is validated it now can be sent to POSTGRES DB
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while updating the user");
  }
};
