// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type Data = {
  token?: string;
  username?: string;
  password?: string;
  msg?: string;
};

const KEY: string = "dasdasdsdfoakjervnotwuitvejnv";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, email, password } = req.body;
  // username must be unique
  // >= 3

  // email must be unique
  // must follow the regex

  // TODO: if the username is not unique, receive an error and show it to user
  if (password.length < 8) {
    return res
      .status(400)
      .json({ password: "That password is extremely short." });
  }
  console.log(req.body);

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

// const validateUsername = (username: string) => {
//   let error;

//   if (username.length < 3) {
//     error = "Username must have at least 3 characters";
//   }

//   return error;
// };

// const validateEmail = (email: string) => {
//   let error;

//   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
//     error = "Invalid email address";
//   }

//   return error;
// };

// const validatePassword = (value: string) => {
//   let error;

//   if (value.length < 6) {
//     error = "Password must have at least 6 characters";
//   }

//   return error;
// };
