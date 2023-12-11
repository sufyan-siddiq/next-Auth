import connect from "@/app/utils/db";
import User from "../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    await connect();
    console.log("password ", password);

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const hashedToken = await bcrypt.hash(password, 5);

    existingUser.password = hashedToken;
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;

    try {
      await existingUser.save();
      return new NextResponse("User's password updated", {
        status: 200,
      });
    } catch (err) {
      console.error("Error saving user:", err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } catch (error) {
    console.error("Server-side error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// import connect from "@/app/utils/db";
// import User from "../../models/User";
// import { NextResponse } from "next/server";
// import bcript from "bcryptjs";

// export const POST = async (request) => {
//   // try {
//     const { email, password } = await request.json();
//     await connect();
//     console.log("password ",password)

//     const existingUser = await User.findOne({ email });
//     const hashedToken = bcript.hash(password, 5);

//     existingUser.password = hashedToken;

//     existingUser.resetToken = undefined;
//     existingUser.resetTokenExpiry = undefined;

//     try {
//       await existingUser.save();
//       return new NextResponse("User's password updated ", {
//         status: 200,
//       });
//     } catch (err) {
//       return new NextResponse("Invalid token or has expired", { status: 400 });
//     }

//   // } 
//   // catch (error) {
//   //   console.error("Server-side error:", error);
//   //   return new NextResponse("Internal Server Error", { status: 500 });
//   // }
// };
