import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-10 text-sm">
        {/* About Gearflow */}
        <div className="w-[30%]">
          <h2 className="mb-4 text-xl font-semibold">Gearflow</h2>
          <p className="text-gray-400">
            Your trusted platform for renting, managing, and finding
            construction equipment with ease and reliability.
          </p>
        </div>

        {/* Rentals */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Rentals</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/units" className="hover:underline">
                Browse Units
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Rental Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Company</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Partners
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Support</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Gearflow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
