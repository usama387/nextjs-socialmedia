import prisma from "@/lib/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import StoryList from "./StoryList";

// child component of homepage
const Stories = async () => {
  // getting current user from clerk
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  // fetching all stories of my own and friends stories
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      // in this query inside stroy table there is a user table it searches followers of user using its id and show their stories
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        // this query returns user's own stories
        {
          userId: currentUserId,
        },
      ],
    },
    // include user details in final response
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hidden">
      <div className="flex gap-8 w-max">
        {/* stories are fetched and passed as props to this child to provide interactive options  */}
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
