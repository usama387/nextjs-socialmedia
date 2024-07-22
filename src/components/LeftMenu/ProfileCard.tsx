import prisma from "@/lib/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

// child of LeftMenu component
const ProfileCard = async () => {
  // getting access to logged in user
  const { userId } = auth();

  // if user not found
  if (!userId) return null;

  // from the user table fetching user detail and it's number of followers
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  console.log(user);
  // if no user no found
  if (!user) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user?.cover || "/noCover.png"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user?.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {/* Rendering of username with Ternary Operator */}
          {user.name && user.surname
            ? user.name + "" + user.surname
            : user.username}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/26600378/pexels-photo-26600378/free-photo-of-cuidar-la-vida.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/26600378/pexels-photo-26600378/free-photo-of-cuidar-la-vida.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/26600378/pexels-photo-26600378/free-photo-of-cuidar-la-vida.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
          </div>
          {/* Number of followers user has */}
          <span className="text-xs text-gray-500">
            {user._count.followers} Followers
          </span>
        </div>
        {/* This links redirect user to single profile page using its username */}
        <Link href={`/profile/${user.username}`}>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
