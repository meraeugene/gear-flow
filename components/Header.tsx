import Image from "next/image";
import ProfileDropDown from "@/components/ProfileDropdown";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { getAuthUser } from "@/actions/authActions";

const Header = async () => {
  const { user, error } = await getAuthUser();

  return (
    <div className="sticky top-0 z-30 bg-white shadow-sm md:px-4 lg:px-12 xl:px-24">
      <header className="flex items-center justify-between border-b px-4 py-3 md:px-0">
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
            <SearchBar mainClassName="hidden" />

            <ProfileDropDown
              profilePicture={user.profile_picture}
              fullName={`${user.first_name} ${user.last_name}`}
              email={user.email}
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <SearchBar mainClassName="hidden" />
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-gray-900 transition-all ease-in hover:text-gray-600"
            >
              Sign In
            </Link>
          </div>
        )}
      </header>

      <SearchBar
        inputClassName="h-11 border-none pl-14 pr-12 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        mainClassName=" w-full md:hidden"
        searchClassName="left-5"
        closeClassName="right-5"
        resultClassName="mt-0 rounded-none border-t "
      />
    </div>
  );
};

export default Header;
