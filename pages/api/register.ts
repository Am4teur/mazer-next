// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type Data = {
  token: string;
  username: string;
  password: string;
};

const KEY: string = "dasdasdsdfoakjervnotwuitvejnv";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = req.body;
  console.log(req.body);

  if (username === "test" && password === "test") {
    res.json({ token: " x", username, password });
  }

  res.json({
    token: jwt.sign(
      {
        username,
        password,
      },
      KEY
    ),
    username: username,
    password: password,
  });
  // const { email, password, passwordCheck, username, mazes, icon} = req.body;

  // if(!validateEmail(email)) {
  //   return res.status(400)
  //     .json({ msg : "That email is invalid." });
  // }
  // const emailUser = await User.findOne({ email: email });
  // if(emailUser) {
  //   return res.status(400)
  //   .json({ msg : "That email already exists." });
  // }
  // if(password.length < 5) {
  //   return res.status(400)
  //     .json({ msg : "Your password needs at least 5 characters." });
  // }
  // if(password != passwordCheck) {
  //   return res.status(400)
  //     .json({ msg : "Those passwords don't match." });
  // }
  // if(username.length < 3) {
  //   return res.status(400)
  //     .json({ msg : "Your username needs at least 3 characters." });
  // }

  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);

  // const newUser = new User({ email, hashedPassword, username, mazes, icon });

  // newUser.save()
  //   .then(() => res.json(newUser))
  //   .catch(err => res.status(400).json("Error on '/users/register': " + err));
}
