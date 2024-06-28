// child of RightMenu component

import Image from "next/image";

// size is taken as props of three types to use on different locations
const Advertisement = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div>
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>

      {/* first it determines the screen size and then renders the div size */}
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/19718703/pexels-photo-19718703/free-photo-of-young-woman-in-a-white-shirt-sitting-at-a-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/19718703/pexels-photo-19718703/free-photo-of-young-woman-in-a-white-shirt-sitting-at-a-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Explore the latest trends in fashion"
            : size === "md"
            ? "Lorem jhdhjdfhjd jhsdgfdhgfdj iduifydfuyr jhsjkfhdsjfhd "
            : "Lorem jhdjshd jsjdshdsj hajshajhdjsd gsgadhgsd jdshdhsajh djshdsjkahd"}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Advertisement;
