"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Units", href: "/units" },
  { label: "Lenders", href: "/lenders" },
];

const NavLinks = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav>
      <ul className="flex items-center justify-center gap-12">
        {navItems.map(({ label, href }) => (
          <li key={label} className="group relative">
            <Link
              href={href}
              className={`relative pb-1 text-sm font-medium transition-colors duration-300 ${
                isActive(href) ? "text-black" : "text-gray-700 hover:text-black"
              }`}
            >
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transform bg-black transition-transform duration-300 ${
                  isActive(href) ? "scale-x-100" : "group-hover:scale-x-100"
                }`}
              />
              <span className="relative z-10">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
