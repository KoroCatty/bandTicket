import bcrypt from "bcryptjs";
import connectDB from "@/config/db";
import Joi from "joi";
import User from "@/models/User"; // model

export const POST = async (req: any) => {
  if (req.method === "POST") {
    try {
      const { username, email, password } = await req.json(); //JavaScript オブジェクトとして取得
      await connectDB();

      //* Joi Validation
      const Schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      // Validate the request data using Schema
      const { error } = Schema.validate({ username, email, password });
      if (error) {
        console.log(error.message);
        return new Response(error.message, { status: 400 });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response("Email already in use", { status: 409 }); // 409: Conflict
      }

      // Hash password wt salt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in DB
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();

      return new Response(JSON.stringify(user), { status: 201 });
    } catch (error: any) {
      return new Response("Server error😅", { status: 500 });
    }
  }
};
