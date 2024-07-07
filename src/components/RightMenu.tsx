import { User } from "@prisma/client";
import Advertisement from "./Advertisement";
import FriendRequests from "./FriendRequests";
import { Suspense } from "react";
import UserInformationCard from "./RightMenu/UserInformationCard";
import UserMediaCard from "./RightMenu/UserMediaCard";
import Birthdays from "./RightMenu/Birthdays";

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
      <FriendRequests />
      <Birthdays />
      {/* passing "md" as size prop */}
      <Advertisement size="md" />
    </div>
  );
};

export default RightMenu;
