"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { handleClientLogout } from "@/lib/supabase/signOutClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/string/getInitials";
import { useAuthStore } from "@/stores/useAuthStore";

const menuItems = [
  {
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    shortcut: "Ctrl + D",
    action: "/account/dashboard",
  },
  {
    label: "Settings",
    icon: <SettingOutlined />,
    shortcut: "Ctrl + S",
    action: "/account/settings",
  },
  {
    label: "Logout",
    icon: <LogoutOutlined />,
    shortcut: "Ctrl + L",
    action: "logout",
  },
];

interface ProfileDropDownProps {
  profilePicture: string;
  fullName: string;
  email: string;
}

const ProfileDropDown = ({
  profilePicture,
  fullName,
  email,
}: ProfileDropDownProps) => {
  const router = useRouter();

  const { logout } = useAuthStore();

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        const key = e.key.toLowerCase();
        if (key === "s") {
          e.preventDefault();
          router.push("/account/settings");
        } else if (key === "d") {
          e.preventDefault();
          router.push("/account/dashboard");
        } else if (key === "l") {
          e.preventDefault();
          handleClientLogout();
          logout();
        }
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [router, logout]);

  const handleClick = (action: string) => {
    if (action === "logout") {
      handleClientLogout();
      logout();
    } else {
      router.push(action);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 cursor-pointer border border-gray-300">
          <AvatarImage
            className="h-full w-full object-cover"
            src={profilePicture}
          />
          <AvatarFallback className="text-sm">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span>{fullName}</span>
            <span className="text-xs text-gray-500">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map(({ label, icon, shortcut, action }) => (
          <DropdownMenuItem
            key={label}
            className="flex cursor-pointer items-center justify-between gap-6"
            onClick={() => handleClick(action)}
          >
            <div className="flex items-center gap-3">
              {icon}
              <span>{label}</span>
            </div>
            <span className="text-xs">{shortcut}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
