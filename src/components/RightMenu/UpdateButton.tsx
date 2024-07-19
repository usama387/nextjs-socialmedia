"use client";

import { useFormStatus } from "react-dom";

// child of updateUser component
const UpdateButton = () => {
  // hook from react to track and render form status on ui
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 p-2 mt-2 rounded-md text-white bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
