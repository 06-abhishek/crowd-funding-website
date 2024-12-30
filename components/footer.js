"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [searchUser, setSearchUser] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (searchUser) {
      router.push(`/${searchUser}`);
      setSearchUser("");
    }
  };

  return (
    <>
      <footer className="text-gray-700 py-4 mt-12 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <p className="text-sm text-center mb-4">
          &copy; {currentYear} Fundora. All Rights Reserved.
        </p>

        <form className="max-w-md mx-auto" onSubmit={handleOnSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={searchUser} // Bind input value to state
              onChange={handleInputChange} // Update state on change
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for user"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-[5px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"
            >
              Search
            </button>
          </div>
        </form>
      </footer>
    </>
  );
};
export default Footer;
