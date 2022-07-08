import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

interface ConfirmationData {
  msg?: string;
}

interface UserPayload {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfirmationData>
) {
  const token = req.body.jwt;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.EMAIL_SECRET || "") as UserPayload;
  } catch (error) {
    return "";
  }
  const userId: string = decoded.userId;

  await dbConnect();
  const emailUser = await User.findById(userId);
  if (!emailUser) {
    return res.status(400).json({ msg: "Email is not registered" });
  }

  User.findById(userId)
    .then((user: any) => {
      user.emailVerified = true;

      user
        .save()
        .then(() => res.json({ msg: "User email verified!" }))
        .catch((err: string) =>
          res
            .status(400)
            .json({ msg: "Error saving on '/api/confirmation/:jwt'" + err })
        );
    })
    .catch((err) =>
      res.status(400).json({ msg: "Error on '/api/confirmation/:jwt': " + err })
    );
}
