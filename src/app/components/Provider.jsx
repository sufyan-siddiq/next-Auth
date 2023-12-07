"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
