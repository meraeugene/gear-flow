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
        <ul>
          <li className="text-sm">
            <span className="font-semibold">Name: </span>
            {userInfo.first_name} {userInfo.last_name}
          </li>
          <li className="text-sm">
            <span className="font-semibold">Address: </span>
            {userInfo.address}
          </li>
          <li className="text-sm">
            <span className="font-semibold">Phone Number: </span>
            {userInfo.phone_number}
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserInfoCard;
