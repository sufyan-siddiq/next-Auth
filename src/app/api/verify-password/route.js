import connect from "@/app/utils/db";
import User from "../../models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request) => {
  try {
    const { token } = await request.json();
    await connect();

    // const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // console.log("token ",token)
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: {$gt: Date.now()},
    });
    // console.log("user=> ",user)
    if (!user) {
      return new NextResponse("Invalid token or has expired", { status: 400 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });

  } catch (error) {
    console.error("Server-side error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
