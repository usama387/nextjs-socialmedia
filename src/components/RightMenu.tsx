import { User } from "@prisma/client";
import Advertisement from "./Advertisement";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInformationCard from "./UserInformationCard";
import UserMediaCard from "./UserMediaCard";

// If user is passed as props from profile route it displays specific details of that user
const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* when user is available pass it down to following child component */}
      {user ? (
        <>
          <UserInformationCard user={user} />
          <UserMediaCard user={user} />
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
