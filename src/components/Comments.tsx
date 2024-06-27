import Image from "next/image";

// child of Post component
const Comments = () => {
  return (
    <div>
      {/* WRITE COMMENT */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/13599878/pexels-photo-13599878.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full "
        />
        <div className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* READ COMMENTS */}
      <div>
        <div className="flex gap-4 justify-between mt-6">
          {/* AVATAR */}
          <Image
            src="https://images.pexels.com/photos/13599878/pexels-photo-13599878.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full "
          />
          {/*DESC */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Spencer Dest</span>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* ICON */}
          <Image
            src="/more.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
