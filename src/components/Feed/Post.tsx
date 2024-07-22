import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

// type safety for both Post , User because Post array contains user object and then in likes object userId has been selected ti be rendered finally count with no of comments
type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

// Receiving Post as Prop as child of PostFee component
const Post = ({ post }: { post: FeedPostType }) => {

  // getting userId from clerk
const {userId} = auth()
 

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full "
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + "" + post.user.name
              : post.user.username}
          </span>
        </div>
        {/* this component is only rendered when user owns the post it provides option to delete */}
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION OPTIONS */}
      {/* this component provides interactive options */}
      <Suspense fallback="Loading Post...">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      {/* Passing postId as Props to this child component it implements comments functionality */}
      <Suspense fallback="Loading Comment">
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
