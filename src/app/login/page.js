"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleLogin = async (e) => {
    const { email, password } = user;
    e.preventDefault();
    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
      toast.error("email is not valid");
    }
    if (!password || password.length != 8) {
      toast.error("Password must be 8 characters long");
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      toast.success("user logedin");
      router.replace("/");
    } else {
      toast.error("Invalid email or password");
    }
  };
  return (
    <div className="flex h-[88vh] justify-center items-center">
      <div className="flex flex-col w-[500px] justify-center items-center bg-white p-2 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gradient-to-r from-yellow-600 via-red-600 to-pink-600">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2  w-[450px]">
          <input
            required
            type="email"
            placeholder="Email"
            className="border  border-gray-400 p-2 rounded-md focus:outline-none focus:border-black"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="border  border-gray-400 p-2 rounded-md focus:outline-none focus:border-black"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-600 via-red-600 to-pink-600 text-white h-10 rounded-md"
          >
            Sign in
          </button>
          <div className=" w-[450px]  flex  justify-end ">
            <Link href="/register">
              <span className="text-black text-center">Forgot password?</span>
            </Link>
          </div>
        </form>
        <button
          onClick={async () => {
            await signIn();
            toast.success("user logedin");
          }}
          type="submit"
          className="bg-gradient-to-r mt-[10px] w-[450px] from-yellow-600 via-red-600 to-pink-600 text-white h-10 rounded-md"
        >
          Sign in with Github
        </button>
        <button
          onClick={async () => {
            await signIn();
            toast.success("user logedin");
          }}
          type="submit"
          className="bg-gradient-to-r mt-[10px] w-[450px] from-yellow-600 via-red-600 to-pink-600 text-white h-10 rounded-md"
        >
          Sign in with Google
        </button>
        <div className=" w-[450px] mt-2 flex flex-col">
          <Link href="/register">
            <span className="text-black text-center">Register Here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default page;
