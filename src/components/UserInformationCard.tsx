import Image from "next/image";
import Link from "next/link";

// Child of RightMenu component
const UserInformationCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP WITH HEADINGS*/}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See All
        </Link>
      </div>
      {/* BOTTOM WITH USER DETAILS*/}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">John Wick</span>
          <span className="text-sm">@Wick</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          voluptatum?
        </p>
        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="" height={16} width={16} />
          <span>
            Living in <b>Karachi</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="" height={16} width={16} />
          <span>
            Went to <b>Iqra University</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="" height={16} width={16} />
          <span>
            Works at <b>IBC</b>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Image src="/link.png" alt="" height={16} width={16} />
            <Link
              href="https://Usama.dev"
              className="text-blue-500 font-medium"
            >
              Usama.dev
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" height={16} width={16} />
            <span>Joined November 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">Follow</button>
        <span className="text-red-400 self-end text-xs cursor-pointer">Block User</span>
      </div>
    </div>
  );
};

export default UserInformationCard;
