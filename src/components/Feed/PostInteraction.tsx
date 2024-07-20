"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

// child of Post component
const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  // getting the logged in user this time from useAuth hook because it contains isLoaded function
  const { isLoaded, userId } = useAuth();

  //   managing state for like it checks the length of likes of likes array to show no of likes on post and in this array it searches for the current userId if found it means liked
  const [likeState, setIsLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  //   passing the initial state after get the previous state to check the total no likes to increase or decrease it and like it or not
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  //   function that sends data to server action and invokes it
  const likeAction = async () => {
    // to toggle the state
    switchOptimisticLike("");
    try {
      // passing in post id to the server action
      switchLike(postId);

      //   now passing the main state
      setIsLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        {/* LIKES */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
          </form>

          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}{" "}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        {/* COMMENTS */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/comment.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            123 <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      {/* SHARES */}
      <div>
        <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
          <Image
            src="/share.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
