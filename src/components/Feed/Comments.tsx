import prisma from "@/lib/PrismaClient";
import CommentList from "./CommentList";

// child of Post component
const Comments = async ({ postId }: { postId: number }) => {
  // fetching all the comments from the comment table using postId as user info in the table when a post is opened or hovered
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      {/* client child component to provide interactive comment options it accepts comments as props from POSTGRES as well as Post Id when a post is opened*/}
      <CommentList comments={comments} postId={postId}/>
    </div>
  );
};

export default Comments;
