import Image from "next/image";
import ProfileDropDown from "@/components/ProfileDropdown";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { getAuthUser } from "@/actions/authActions";

const Header = async () => {
  const { user, error } = await getAuthUser();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-24 py-3 shadow-sm">
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

      {/* <NavLinks /> */}

      {user && !error ? (
        <div className="flex items-center gap-4">
          <SearchBar />
          <ProfileDropDown
            profilePicture={user.profile_picture}
            fullName={`${user.first_name} ${user.last_name}`}
            email={user.email}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <SearchBar />
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-gray-900 transition-all ease-in hover:text-gray-600"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
