// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

interface RegisterData {
  token?: string;
  username?: string;
  email?: string;
  password?: string;
  msg?: string;
}

// async..await is not allowed in global scope, must use a wrapper
async function sendConfirmationEmail(emailSendTo: string, user: any) {
  console.log(process.env.MAZER_EMAIL, process.env.MAZER_EMAIL_PASSWORD);

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

const validateEmail = (email: string) => {
  //if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
  //  error = "Invalid email address";
  //}
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterData>
) {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  // TODO: this check could be done on the FE
  if (username.length < 3) {
    return res
      .status(400)
      .json({ username: "Username must have 3 or more characters" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ email: "Email is invalid" });
  }
  console.log("some");
  await dbConnect();
  const emailUser = await User.findOne({ email: email });
  console.log("some2");
  if (emailUser) {
    return res.status(400).json({ email: "Email already exists" });
  }

  // if (password != passwordCheck) {
  //   return res.status(400).json({ msg: "Those passwords don't match." });
  // }
  // TODO: this check could be done on the FE
  if (password.length < 5) {
    return res
      .status(400)
      .json({ password: "Password must have 5 or more characters" });
  }

  // create new entry on DB
  // DB name: users
  // id
  // username || name
  // email
  // hashedPassword
  // image
  // emailverified
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const defaultImage = "default_image";

  const newUser = new User({
    username: username ? username : email.split("@")[0],
    email,
    hashedPassword,
    image: defaultImage,
    emailVerified: false,
  });

  console.log(newUser);
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err: string) =>
      res.status(400).json({ msg: "Error on '/api/register': " + err })
    );

  sendConfirmationEmail(email, newUser).catch(console.error);
}
