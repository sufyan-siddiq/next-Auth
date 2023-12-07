import connect from "@/app/utils/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email, password } = await request.json();
  await connect();
  console.log('email, password',email, password)
  const existingUser = await User.findOne({
    email,
  });
  console.log('existingUser',existingUser)
  if (existingUser) {
    return new NextResponse("email is already in use", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User is registered", {
      status: 200,
    });
  } catch (err) {
  console.log('err',err)
    return new NextResponse(err, {
      status: 500,
    });
  }
};
