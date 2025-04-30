import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { userInfo } from "@/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/string/getInitials";

interface UserInfoCardProps {
  userInfo: userInfo;
}

const UserInfoCard = ({ userInfo }: UserInfoCardProps) => {
  const fullName = userInfo.first_name + " " + userInfo.last_name;
  return (
    <HoverCard>
      <HoverCardTrigger className="h-8 w-8 cursor-pointer">
        <Avatar className="h-8 w-8 cursor-pointer border border-gray-300">
          <AvatarImage
            className="h-full w-full object-cover"
            src={userInfo.profile_picture}
          />
          <AvatarFallback className="text-sm">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>
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
