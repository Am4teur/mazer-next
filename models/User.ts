import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    /* Extra fields */
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    mazes: {
      type: [Schema.Types.ObjectId],
    },
    icon: {
      type: String,
    },
  }
  // {
  //   timestamps: true,
  // }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
