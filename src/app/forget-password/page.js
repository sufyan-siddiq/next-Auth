"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
const page = () => {
  const [email, setEmail] = useState();
  const router = useRouter();

  const forgetPassword = async (e) => {
    e.preventDefault();
    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
      toast.error("email is not valid");
    }
    try {
      const response = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.ok) {
        router.replace("/login");
        toast.success("User Forgot successfully");
      } else {
        toast.error("User with this Email is not Registered");
      }
    } catch (error) {
      toast.error("Error:", error);
      console.error(error);
    }
  };
  return (
    <div className="flex h-[88vh] justify-center items-center">
      <div className="flex flex-col w-[500px] justify-center items-center bg-white p-2 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gradient-to-r from-yellow-600 via-red-600 to-pink-600">
          Forget Password
        </h1>
        <form className="flex flex-col gap-2  w-[450px]">
          <input
            required
            type="email"
            placeholder="Email"
            className="border  border-gray-400 p-2 rounded-md focus:outline-none focus:border-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={forgetPassword}
            type="submit"
            className="bg-gradient-to-r from-yellow-600 via-red-600 to-pink-600 text-white h-10 rounded-md"
          >
            Submit
          </button>
        
        </form>
        <div className=" w-[450px] mt-2 flex flex-col">
          <Link href="/login">
            <span className="text-black text-center">Login Here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default page;
