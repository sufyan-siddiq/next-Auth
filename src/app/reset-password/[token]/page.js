"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [verified, setVerified] = useState();
  const router = useRouter();
  console.log(params);

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: user?.email,
            password: password,
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

  console.log("UserDatass", user);
  const verifyToken = async () => {
    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          token: params?.token,
        }),
      });
      if (response.ok) {
        setVerified(true);
        // router.replace("/login");
        toast.success("User Forgot successfully");
        const UserData = await response.json();
        setUser(UserData);
      } else {
        toast.error("Invalid token or has expired");
      }
    } catch (error) {
      setVerified(true);
      toast.error("Error:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="flex h-[88vh] justify-center items-center">
      <div className="flex flex-col w-[500px] justify-center items-center bg-white p-2 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gradient-to-r from-yellow-600 via-red-600 to-pink-600">
          Reset Password
        </h1>
        <form
          onSubmit={resetPassword}
          className="flex flex-col gap-2  w-[450px]"
        >
          <input
            required
            type="password"
            placeholder="Password"
            className="border  border-gray-400 p-2 rounded-md focus:outline-none focus:border-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            //   disabled={}
            type="submit"
            className="bg-gradient-to-r from-yellow-600 via-red-600 to-pink-600 text-white h-10 rounded-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default page;
