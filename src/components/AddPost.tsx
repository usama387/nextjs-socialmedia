import prisma from "@/lib/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

// Child component of homepage
const AddPost = () => {
  // destructuring current user from clerk
  const { userId } = auth();
  console.log(userId)

  // server action for test purpose
  const testAction = async (formData: FormData) => {
    "use server";

    if (!userId) return;

    // accessing my input box with its name
    const desc = formData.get("desc") as string;
    try {
      const res = await prisma.post.create({
        data: {
          userId: userId,
          desc: desc,
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <Image
        src="https://images.pexels.com/photos/20035451/pexels-photo-20035451/free-photo-of-buildings-around-cobblestone-street-in-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        width={48}
        height={48}
        alt=""
        className="w-12 h-12 object-cover rounded-full "
      />
      {/* Post */}
      <div className="flex-1">
        {/* text input  */}
        <form action={testAction} className="flex gap-4">
          <textarea
            name="desc"
            placeholder="what's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
          ></textarea>
          <Image
            src="/emoji.png"
            width={20}
            height={20}
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button>Send</button>
        </form>
        {/* post options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addimage.png" width={20} height={20} alt="" />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" width={20} height={20} alt="" />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" width={20} height={20} alt="" />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" width={20} height={20} alt="" />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
