import React from "react";
import Post from "./Post";

// child of homepage
const PostFeed = () => {
  return <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-12">
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </div>;
};

export default PostFeed;
