import connect from "@/app/utils/db";
import User from "../../models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgmail from "@sendgrid/mail";
import { url } from "inspector";

export const POST = async (request) => {
  const { email } = await request.json();
  await connect();
  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    return new NextResponse("email doesn't exist", {
      status: 400,
    });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;

  const resetUrl = `localhost:3000/reset-password/${passwordResetToken}`;
  console.log(resetUrl);

  const body = "reset password by clicking on following url " + resetUrl;
  sgmail.setApiKey(process.env.SANDGRID_API_KEY || "");

  const mes = {
    to: email,
    from: "sufyansiddiq44@gmail.com",
    subject: "Reset Password",
    text: body,
  };

  await sgmail
    .send(mes)
    .then((res) => {
      return new NextResponse("resetpassword email is sent", { status: 200 });
    })
    .catch(async (err) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();
      return new NextResponse("feild sending email try again", { status: 400 });
    });
  try {
    await existingUser.save();
    return new NextResponse("email is sent", { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};
