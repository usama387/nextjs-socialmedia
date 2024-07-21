"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./PrismaClient";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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
export const UpdateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  // taking data and cover picture from payload
  const { formData, cover } = payload;

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
  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  // if fields are not validated
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  // getting logged in user
  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  // once the form is validated it now can be sent to POSTGRES DB
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

// this server action is being used in PostInteraction component
export const switchLike = async (postId: number) => {
  // getting logged in user
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    // checking in the like table if the user liked post exists
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    // if it exists in the like table user can dislike it and in else condition user can like the post using its own id and post id
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

// this server action is being used in commentList component it takes two parameters to add a comment
export const addComment = async (postId: number, desc: string) => {
  // getting userId from clerk to use in the comment
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    // creating the comment using these parameters returning user info as well
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        postId,
        userId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

// this server action is being used in AddPost component takes two parameters from there
export const addPost = async (formData: FormData, img: string) => {
  // accessing the from data
  const desc = formData.get("desc") as string;

  // validating desc with zod
  const Desc = z.string().min(1).max(255);

  // pass in the from desc as string
  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("Err")
    return;
  }

  // getting the logged in user
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (error) {}
  console.log(Error);
  throw new Error("Something went wrong!");
};
