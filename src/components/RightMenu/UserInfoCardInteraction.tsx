"use client";

import { switchFollow } from "@/lib/actions";
import { useState } from "react";

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

  const follow = async () => {
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

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {userState.following
            ? "Following"
            : userState.followingRequestSent
            ? "Requested"
            : "Follow"}
        </button>
      </form>

      <form action="" className="self-end">
        <span className="text-red-400 font-bold text-xs cursor-pointer">
          {userState.blocked ? "Unblock User" : "Block User"}
        </span>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
