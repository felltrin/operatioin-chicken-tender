import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Connect to database
    const db = await connectToDatabase();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Insert user to database
    const result = await db.collection("users").insertOne(newUser);

    // Return success response
    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
