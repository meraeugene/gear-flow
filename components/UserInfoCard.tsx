import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { userInfo } from "@/types";
import Image from "next/image";

interface UserInfoCardProps {
  userInfo: userInfo;
}

const UserInfoCard = ({ userInfo }: UserInfoCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <Image
          src={userInfo.profile_picture}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </HoverCardTrigger>
      <HoverCardContent>
        <ul className="flex flex-col gap-2">
          <li className="text-sm text-gray-800">
            <span className="font-semibold text-black">Name: </span>
            {userInfo.first_name} {userInfo.last_name}
          </li>
          <li className="text-sm text-gray-800">
            <span className="font-semibold text-black">Email Address: </span>
            {userInfo.email}
          </li>
          <li className="text-sm text-gray-800">
            <span className="font-semibold text-black">Phone Number: </span>
            {userInfo.phone_number}
          </li>
          <li className="text-sm text-gray-800">
            <span className="font-semibold text-black">Address: </span>
            {userInfo.address}
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserInfoCard;
