"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

// this is a client because user will be clicking through this and it is a child of userInfoCard component
const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  // since props are dynamic useState will handle it because the server action will be to update the text based on rendering downward
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  // function to invoke switchFollow server action
  const follow = async () => {
    // calling this function
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      // spread operator to change only following & followingRequestSent status
      setUserState((prev) => ({
        ...prev, // Spread operator to copy all properties from previous state
        following: prev.following && false, // Update following status
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false, // Update followingRequestSent status
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // function to invoke switchBlock server action and then update main state just as first function
  const block = async () => {
    try {
      switchOptimisticState("block");

      //  invoking my server action
      await switchBlock(userId);

      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // hook to update the UI at once at first we pass in it our main state which is userState from useState hook then we take a callback function and put our previous state, value as parameter and then spread these values
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false, // Update following status
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false, // Update followingRequestSent status
          }
        : { ...state, blocked: !state.blocked }
  );
  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {/* now instead of main userState i will use useOptimistic state */}
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>

      <form action={block} className="self-end">
        <button>
          <span className="text-red-400 font-bold text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
