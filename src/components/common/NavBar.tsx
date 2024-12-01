"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the menu items in JSON format
const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const NavBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGoToForm = () => {
    router.push("https://evq73w1t59w.typeform.com/to/S0yXIWtD");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <Image src="/logo/dailysat.png" width={50} height={50} alt="Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap">DailySAT</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu Items for Desktop */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:w-auto w-full`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Button */}
        <div className="hidden md:inline-block">
          <button
            onClick={handleGoToForm}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Contact Button for Mobile View */}
      {isMenuOpen && (
        <div className="block md:hidden mt-4 px-4">
          <button
            onClick={handleGoToForm}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
