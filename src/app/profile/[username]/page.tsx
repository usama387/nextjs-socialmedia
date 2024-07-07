import PostFeed from "@/components/Feed/PostFeed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import prisma from "@/lib/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

// With the help of params accessing username and then fetching user related data
const SingleProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },

    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  // getting logged in user from clerk
  const { userId: currentUserId } = auth();

  // checking if this user id blocked
  let isBlocked;

  if (currentUserId) {
    const response = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (response) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT CONTAINER WITH LEFT MENU TO SHOW APP OPTIONS*/}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      {/* MIDDLE CONTAINER WITH PROFILE AND POST FEED*/}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover || "/noCover.png"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring4 ring-white"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name && user.surname
                ? user.name + "" + user.surname
                : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <PostFeed />
        </div>
      </div>
      {/* RIGHT CONTAINER WITH RIGHT MENU TO SHOW USER DETAILS BY TAKING USER PROPS*/}
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default SingleProfilePage;
