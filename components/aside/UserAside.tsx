"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutOutlined } from "@ant-design/icons";
import { handleClientLogout } from "@/lib/supabase/signOutClient";
import { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import {
  FiEdit,
  FiLock,
  FiCreditCard,
  FiShoppingBag,
  FiPackage,
  FiInbox,
  FiEdit2,
} from "react-icons/fi";

export const userDashboardLinks = [
  {
    name: "Dashboard",
    href: "/account/dashboard",
    icon: <AppstoreOutlined size={18} />,
  },
  {
    name: "Units",
    href: "/account/units",
    icon: <FiPackage size={18} />,
  },
  {
    name: "Rentals",
    href: "/account/rentals",
    icon: <FiShoppingBag size={18} />,
  },
  {
    name: "Transactions",
    href: "/account/transactions",
    icon: <FiCreditCard size={18} />,
  },
  {
    name: "Rental Requests",
    href: "/account/rental-requests",
    icon: <FiInbox size={18} />,
  },
];

export const settingsLinks = [
  {
    name: "Account Settings",
    href: "/account/settings",
    icon: <FiEdit size={18} />,
  },
  {
    name: "Edit Profile",
    href: "/account/settings/edit-profile",
    icon: <FiEdit2 size={18} />,
  },
  {
    name: "Reset Password",
    href: "/account/settings/reset-password",
    icon: <FiLock size={18} />,
  },
  // {
  //   name: "Reset Email",
  //   href: "/account/settings/reset-email",
  //   icon: <FiMail size={18} />,
  // },
];

const UserAside = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const links = pathname.startsWith("/account/settings")
    ? settingsLinks
    : userDashboardLinks;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await handleClientLogout();
    logout();
    setIsLoggingOut(false);
  };

  return (
    <aside className="hidden w-72 flex-col p-8 shadow-sm lg:flex lg:px-4">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/assets/images/logo.png"
          width={40}
          height={40}
          alt="logo"
        />
        <h1 className="text-xl font-semibold">GEARFLOW</h1>
      </Link>
      <nav className="mt-8 flex flex-col space-y-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex transform items-center gap-3 rounded-sm px-4 py-2 transition-all duration-300 ease-in-out ${
                isActive
                  ? "border-l-4 border-l-black font-medium text-black shadow-sm"
                  : "text-gray-500 shadow-sm hover:translate-x-1 hover:scale-[1.02] hover:border-l-4 hover:border-l-black hover:text-black hover:shadow-sm"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex transform cursor-pointer items-center gap-3 rounded-sm px-4 py-2 text-gray-500 shadow-sm transition-all duration-300 ease-in-out hover:translate-x-1 hover:scale-[1.02] hover:border-l-4 hover:border-l-black hover:text-black hover:shadow-sm"
        >
          {isLoggingOut ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent text-black" />
              Logging out
            </>
          ) : (
            <>
              <LogoutOutlined /> Logout
            </>
          )}
        </button>
      </nav>
    </aside>
  );
};

export default UserAside;
