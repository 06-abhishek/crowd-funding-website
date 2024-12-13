"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex justify-between px-8 shadow-md py-4">
        <Link href="/" className="font-bold text-xl">
          Fundora
        </Link>{" "}
        {/* Fundora (Funding + Aura) */}
        <ul className="flex gap-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Support</Link>
          </li>
          <li>
            <Link href="/">Contribute</Link>
          </li>
          <li>
            <Link href="/">Collaborate</Link>
          </li>
          {session && <li>
            <Link href={`${session.user.name}`}>Your Page</Link>
          </li>}
          <li>
            {session && (
              <Link
                href="/profile">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Profile Picture"
                    className="w-7 h-7 rounded-full"
                  />
                )}
              </Link>
            )}

            {!session && (
              <Link
                href="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
