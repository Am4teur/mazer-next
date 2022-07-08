import { Schema, model, models } from "mongoose";

interface IUser {
  username: string;
  email: string;
  hashedPassword: string;
  image: string;
  emailVerified: boolean;
  mazes: { mazeId: string }[];
  score: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
    },
    /* Mazer Data */
    mazes: {
      type: [{ mazeId: String }],
      default: [],
    },
    score: {
      type: Number,
      default: 0,
    },
  }
  // {
  //   timestamps: true,
  // }
);

const User = models.User || model<IUser>("User", userSchema);
export default User;
