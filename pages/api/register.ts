// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../../models/User";

type Data = {
  token?: string;
  username?: string;
  email?: string;
  password?: string;
};

// async..await is not allowed in global scope, must use a wrapper
async function sendConfirmationEmail(emailSendTo: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAZER_EMAIL,
      pass: process.env.MAZER_EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Mazer 🧩" <${process.env.MAZER_EMAIL}>`,
    to: emailSendTo,
    subject: "Confirmation Email",
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const validateEmail = (email: string) => {
  //if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
  //  error = "Invalid email address";
  //}
  const regEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, email, password } = req.body;

  // TODO: this check could be done on the FE
  if (username.length < 3) {
    return res
      .status(400)
      .json({ username: "Username must have 3 or more characters" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ email: "Email is invalid" });
  }
  const emailUser = await User.findOne({ email: email });
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
  // password
  // image
  // emailverified

  // const { email, password, passwordCheck, username, mazes, icon} = req.body;

  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);

  // const newUser = new User({ email, hashedPassword, username, mazes, icon });

  // newUser.save()
  //   .then(() => res.json(newUser))
  //   .catch(err => res.status(400).json("Error on '/users/register': " + err));

  // create JWT
  res.json({
    token: jwt.sign(
      {
        username,
        password,
      },
      process.env.EMAIL_JWT_SECRET || "secret missing on env"
    ),
    username: username,
    password: password,
  });

  sendConfirmationEmail("emailSendTo").catch(console.error);
}
