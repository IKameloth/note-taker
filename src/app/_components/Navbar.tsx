"use client";

import React, { useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="dark:text-white self-center whitespace-nowrap text-2xl font-semibold">
            Note-Taker
          </span>
        </a>
        <div
          ref={ref}
          className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse"
        >
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 focus:ring-gray-300 dark:focus:ring-gray-600 flex rounded-full text-sm focus:ring-4 md:me-0"
              aria-expanded="false"
            >
              <span className="sr-only">Open user menu</span>
              <div className="bg-gray-100 dark:bg-gray-600 relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  JL
                </span>
              </div>
            </button>
            {/* DROPDOWN */}
            {isOpen && (
              <div className="bg-white divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 ring-black absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y rounded-lg rounded-lg shadow-lg ring-1 ring-opacity-5">
                <div className="text-gray-900 dark:text-white px-4 py-3 text-sm">
                  <div>Bonnie Green</div>
                  <div className="truncate font-medium">name@flowbite.com</div>
                </div>
                <ul
                  className="text-gray-700 dark:text-gray-200 py-2 text-sm"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <a
                      href="#"
                      className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white block px-4 py-2"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white block px-4 py-2 text-sm"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
