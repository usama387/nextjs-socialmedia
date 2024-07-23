import prisma from "@/lib/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";

// child of RightMenu component
const FriendRequests = async () => {
  // getting my current logged in user
  const { userId } = auth();

  // don't render the component if
  if (!userId) return null;

  // fetching all user requests along with sender from db followRequest table
  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP WITH HEADINGS*/}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See All
        </Link>
      </div>
      {/*CLIENT CHILD COMPONENT FOR USING HOOKS (passing requests as prop to accept or reject by user)*/}
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequests;
