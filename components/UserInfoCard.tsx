import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { userInfo } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/string/getInitials";
import clsx from "clsx";

interface UserInfoCardProps {
  userInfo: userInfo;
  className?: string; // ✅ optional class override
}

const UserInfoCard = ({ userInfo, className }: UserInfoCardProps) => {
  const fullName = `${userInfo.first_name} ${userInfo.last_name}`;

  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <Avatar
          className={clsx(
            "h-8 w-8 cursor-pointer border border-gray-300",
            className,
          )}
        >
          <AvatarImage
            className="h-full w-full object-cover"
            src={userInfo.profile_picture}
            alt="profile pic"
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
            {fullName}
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
