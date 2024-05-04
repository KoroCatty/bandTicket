import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId, // mongoose の ObjectId という型
        ref: "Ticket", // Property というモデルに対応
      },
    ],
  },
  {
    timestamps: true,
  },
);

// すでに User というモデルが存在している場合はそれを使い、なければ新しく作成する
const User = models.User || model("User", UserSchema);

export default User;
