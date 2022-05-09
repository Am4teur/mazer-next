// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

interface ResponseData {
  token?: string;
  username?: string;
  email?: string;
  password?: string;
  msg?: string;
}

// async..await is not allowed in global scope, must use a wrapper
async function sendConfirmationEmail(emailSendTo: string, user: any) {
  console.log(
    "stuff",
    process.env.MAZER_EMAIL,
    process.env.MAZER_EMAIL_PASSWORD
  );

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAZER_EMAIL,
      pass: process.env.MAZER_EMAIL_PASSWORD,
    },
  });

  jwt.sign(
    {
      userId: user._id,
    },
    process.env.EMAIL_SECRET || "",
    {
      expiresIn: "1d",
    },
    (err, emailToken) => {
      const url = `${process.env.NEXTAUTH_URL}auth/confirmation/${emailToken}`;

      transporter.sendMail({
        from: `"Mazer 🧩" <${process.env.MAZER_EMAIL}>`,
        to: emailSendTo,
        subject: "Mazer Confirm Email",
        html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
      });
    }
  );
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  password: string
) => {
  // TODO: this check could be done on the FE
  if (username.length > 0 && username.length < 3) {
    return { username: "Username must have 3 or more characters" };
  }
  // TODO: this check could be done on the FE
  if (!validateEmail(email)) {
    return { email: "Email is invalid" };
  }
  await dbConnect();
  const emailUser = await User.findOne({ email: email });
  // This is the only check that must be done on the BE
  if (emailUser) {
    return { email: "Email already exists" };
  }

  // TODO: this check could be done on the FE
  // if (password != passwordCheck) {
  //   return res.status(400).json({ msg: "Those passwords don't match." });
  // }
  // TODO: this check could be done on the FE
  if (password.length < 5) {
    return { password: "Password must have 5 or more characters" };
  }

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ msg: "This API call only accepts POST methods" });
  }

  const { username, email, password } = req.body;

  const errorMessage = await validateForm(username, email, password);
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

  // DB name: users
  // id
  // username || name
  // email
  // hashedPassword
  // image
  // emailverified
  const hashedPassword = await bcrypt.hash(password, 12);
  const defaultImage = "default_image";

  const newUser = new User({
    username: username ? username : email.split("@")[0],
    email,
    hashedPassword,
    image: defaultImage,
    emailVerified: false,
  });

  newUser
    .save()
    .then(() =>
      res.status(200).json({ msg: "Successfuly created new User: " + newUser })
    )
    .catch((err: string) =>
      res.status(400).json({ msg: "Error on '/api/register': " + err })
    );

  sendConfirmationEmail(email, newUser).catch(console.error);
}
