import LeftMenu from "@/components/LeftMenu";
import PostFeed from "@/components/PostFeed";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";

const SingleProfilePage = () => {
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
                src="https://images.pexels.com/photos/21293020/pexels-photo-21293020/free-photo-of-potted-plants-on-either-side-of-an-old-wooden-door.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src="https://images.pexels.com/photos/26646646/pexels-photo-26646646/free-photo-of-a-boat-traveling-through-the-water-near-a-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring4 ring-white"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">Usama Razaaq</h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">123</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">200k</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">400</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <PostFeed />
        </div>
      </div>
      {/* RIGHT CONTAINER WITH RIGHT MENU TO SHOW USER DETAILS */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId="test" />
      </div>
    </div>
  );
};

export default SingleProfilePage;
