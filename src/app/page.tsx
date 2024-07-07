import AddPost from "@/components/AddPost";
import PostFeed from "@/components/Feed/PostFeed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import Stories from "@/components/Stories";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT CONTAINER */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      {/* MIDDLE CONTAINER */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <PostFeed />
        </div>
      </div>
      {/* RIGHT CONTAINER */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default HomePage;
