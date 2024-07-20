import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/PrismaClient";

// child of homepage
// taking username as props and optional on homepage the feed will include the friends posts and on profile only logged in user's posts
const PostFeed = async ({ username }: { username?: string }) => {
  // getting my logged in user
  const { userId } = auth();

  // storing posts in let because there will be two types of posts fetched one belonging two friends the other will be user's own posts
  let posts: any[] = [];

  // fetching user's own posts taking its username from props
  if (username) {
    await prisma.post.findMany({
      // finds all the posts belonging to particular users
      where: {
        user: {
          username: username,
        },
      },

      // includes user ids of people liked the post along with number of comments
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      // latest posts order
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // fetching user's friends posts taking its userId from clerk
  if (!username && userId) {
    // first fetching all friends from follower table
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);
    // fetches post using userId from clerk which contains the user followers ids
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      // includes following data in latest post order
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      // latest posts order
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-12">
      {/* Mapping the posts and sending it to child Post component */}
      {posts.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No Posts Exist!"}
    </div>
  );
};

export default PostFeed;
