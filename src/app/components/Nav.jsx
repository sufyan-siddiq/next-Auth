"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut, getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  const session = useSession();
  console.log(session.status);
  useEffect(() => {
    async () => {
      const res = await getProviders();
      setProviders(res);
    };
  }, []);
  const handleLogOut = () => {
    signOut();
    router.replace("/login");
   
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session.status === "authenticated" ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={handleLogOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={async () => {
                router.replace("/register");
              }}
              className="black_btn"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={async () => {
                router.replace("/login");
              }}
              className="black_btn mx-4"
            >
              Sign in
            </button>
          </>
        )}
      </div>
      <div className="sm:hidden flex relative"></div>
    </nav>
  );
};
