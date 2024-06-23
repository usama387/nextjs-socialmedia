"use client";

import Link from "next/link";
import React, { useState } from "react";

// Child component of Navbar
const MobileMenu = () => {
  // to manage state of menu
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            open ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            open ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${
            open ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>

      {/* when menu is clicked to open */}
      {open && (
        <div className="absolute left-0 w-full top-24 h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <Link href="/home">Home</Link>
          <Link href="/friends">Friends</Link>
          <Link href="/groups">Groups</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
