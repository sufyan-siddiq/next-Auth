"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
const page = () => {
  const [state, setstate] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { email, password } = state;
  const handleSubmit = async (e) => {
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
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        router.replace("/login");
        toast.success("User Registered");
      } else {
        const data = await response.json();
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again later.");
    }
  };
  return (
    <div className="flex h-[88vh] justify-center items-center">
      <div className="flex flex-col w-[500px] justify-center items-center bg-white p-2 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gradient-to-r from-yellow-600 via-red-600 to-pink-600">
          Register
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2  w-[450px]"
        >
          <input
            required
            type="email"
            placeholder="Email"
            className="border  border-gray-400 p-2 rounded-md focus:outline-none focus:border-black"
            onChange={(e) => setstate({ ...state, email: e.target.value })}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="border  border-gray-400 p-2 rounded-md focus:outline-none focus:border-black"
            onChange={(e) => setstate({ ...state, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-600 via-red-600 to-pink-600 text-white h-10 rounded-md"
          >
            Register
          </button>
          <Link href="login">
            <span className="text-black text-center">
              Login with an existing account
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default page;
