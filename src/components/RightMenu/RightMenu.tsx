import { User } from "@prisma/client";
import Birthdays from "./Birthdays";
import UserInformationCard from "./UserInformationCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";
import Advertisement from "../Advertisement";
import MyFriendRequests from "./MyFriendRequests";

// If user is passed as props from profile route it displays specific details of that user
const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* when user is available pass it down to following child component */}
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInformationCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <MyFriendRequests />
      <Birthdays />
      {/* passing "md" as size prop */}
      <Advertisement size="md" />
    </div>
  );
};

export default RightMenu;
