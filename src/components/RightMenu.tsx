import Advertisement from "./Advertisement";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInformationCard from "./UserInformationCard";
import UserMediaCard from "./UserMediaCard";

// If userId is passed as props it displays specific details of that user
const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className="flex flex-col gap-6">
      {userId ? (
        <>
          <UserInformationCard userId={userId} />
          <UserMediaCard userId={userId} />
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
