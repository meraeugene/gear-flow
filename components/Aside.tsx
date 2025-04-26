"use client";

import {
  adminDashboardLinks,
  userDashboardLinks,
  settingsLinks,
} from "@/data/asideLinks";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutOutlined } from "@ant-design/icons";
import { handleClientLogout } from "@/utils/signOutClient";

const Aside = () => {
  const pathname = usePathname();

  const { role, logout } = useAuthStore();

  // Select links based on user role
  const dashboardLinks =
    role === "admin" ? adminDashboardLinks : userDashboardLinks;

  // Conditionally add settings links based on pathname
  const links = pathname.startsWith("/account/settings")
    ? settingsLinks
    : dashboardLinks;

  const handleLogout = () => {
    handleClientLogout();
    logout();
  };
  return (
    <div className="flex min-h-screen text-black">
      <aside className="hidden w-72 flex-col p-8 shadow-sm md:flex">
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
            <LogoutOutlined /> Logout
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
