"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/stores/useAuthStore";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { settingsLinks } from "../aside/UserAside";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { handleClientLogout } from "@/lib/supabase/signOutClient";
import { LogoutOutlined } from "@ant-design/icons";
import { adminDashboardLinks } from "../aside/AdminAside";

const AdminDashboardNavbar = () => {
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [open, setOpen] = useState(false); // Track open state

  const links = pathname.startsWith("/account/settings")
    ? settingsLinks
    : adminDashboardLinks;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await handleClientLogout();
    logout();
    setIsLoggingOut(false);
    setOpen(false); // Close sheet after logout
  };

  const handleLinkClick = () => {
    setOpen(false); // Close sheet after any link click
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="sticky top-0 z-30 flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:hidden lg:px-24">
        <Link href="/" className="logo">
          <Image
            src="/assets/images/no-bg-logo.png"
            width={60}
            height={60}
            priority
            className="h-auto w-auto"
            alt="logo"
          />
        </Link>
        <Menu size={18} />
      </SheetTrigger>
      <SheetContent>
        <div className="h-full flex-col p-8 md:flex">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={handleLinkClick}
          >
            <Image
              src="/assets/images/logo.png"
              width={30}
              height={30}
              alt="logo"
            />
            <SheetTitle className="text-lg font-semibold md:text-xl">
              GEARFLOW
            </SheetTitle>
          </Link>
          <nav className="mt-8 flex flex-col space-y-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminDashboardNavbar;
