import prisma from "@/lib/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

// Child of RightMenu component
const UserInformationCard = async ({ user }: { user: User }) => {
  // formatting user joining date
  const createdAtDate = new Date(user.createdAt);

  // transforming it into presentable time format
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  // getting my current user logged in from clerk
  const { userId: currentUserId } = auth();

  if (currentUserId) {
    // if the blockResponse is true it means the logged in user has blocked this user
    const blockResponse = await prisma.block.findFirst({
      where: {
        blockedId: currentUserId,
        blockerId: user.id,
      },
    });

    blockResponse ? (isUserBlocked = true) : (isUserBlocked = false);

    // if the followResponse is true it means the logged in user follows this user
    const followResponse = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followResponse ? (isFollowing = true) : (isFollowing = false);

    // if the followRequestResponse is true it means the logged in user has already sent follow request
    const followRequestResponse = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followRequestResponse
      ? (isFollowingSent = true)
      : (isFollowingSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP WITH HEADINGS*/}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See All
        </Link>
      </div>
      {/* BOTTOM WITH USER DETAILS*/}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {" "}
            {user.name && user.surname
              ? user.name + "" + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {/* when description is available */}
        {user.description && <p>{user.description}</p>}
        {/* when city Information is available */}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" height={16} width={16} />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {/* When school Information is available */}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" height={16} width={16} />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {/* when work place information is available */}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" height={16} width={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        {/* when website information is available */}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" height={16} width={16} />
              <Link href={user.website} className="text-blue-500 font-medium">
                {user.website}
              </Link>
            </div>
          )}

          {/* if joining date is available */}
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" height={16} width={16} />
            {/* using it here  */}
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">
          Follow
        </button>
        <span className="text-red-400 self-end text-xs cursor-pointer">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInformationCard;
