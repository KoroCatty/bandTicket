import connectDB from "@/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import User from "@/models/User";

export const POST = async (request: any) => {
  try {
    const { email, password } = await request.json();
    //  console.log('🔥', password)

    await connectDB();

    //* Joi Validation
    const Schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    // Validate the request data using Schema
    const { error } = Schema.validate({ email, password });
    if (error) {
      console.log(error.message);
      return new Response(error.message, { status: 400 });
    }

    const user = await User.findOne({ email: email }).select("+password");

    // db の password にアクセス
    if (!user) {
      return new Response("User does not exist😅", { status: 400 });
    }

    // Uncomment and complete this part for actual authentication
    const isMatch = await bcrypt.compare(password, user.password); // compare は 暗号化されたパスワードと平文のパスワードを比較
    if (!isMatch) {
      return new Response("Invalid credentials😅", { status: 400 });
    }

    // get rid of password (No Send to Client)
    user.password = undefined;

    // Creating the token
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.username }, jwtSecret!, {
      expiresIn: "1h",
    });

    // Setting the HTTP-only cookie (1h)
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Set-Cookie": `BandTicketsJWT=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict;`,
      },
    });
  } catch (error) {
    console.log("Failed to process request:", error);
    return new Response("Server error😅", { status: 500 });
  }
};
