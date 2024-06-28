import LeftMenu from "@/components/LeftMenu";
import PostFeed from "@/components/PostFeed";
import RightMenu from "@/components/RightMenu";

const SingleProfilePage = () => {
  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT CONTAINER */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu />
      </div>
      {/* MIDDLE CONTAINER */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <PostFeed />
        </div>
      </div>
      {/* RIGHT CONTAINER */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId="test"/>
      </div>
    </div>
  );
};

export default SingleProfilePage;
