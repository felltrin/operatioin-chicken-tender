import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

// Import your User model (adjust path as needed)
import User from "../../../models/User";

// Connect to MongoDB (you'll need to create this file)
async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client.db(process.env.MONGODB_DB);
}

export const authOptions: AuthOptions = {
  providers: [
    // Credentials Provider for username/email login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username && !credentials?.email) {
          throw new Error("Username or email is required");
        }

        try {
          const db = await connectToDatabase();

          // Find user by username or email
          const user = await db.collection("users").findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.email },
            ],
          });

          if (!user) {
            throw new Error("No user found");
          }

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password!,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          // Return user object for session
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),

    // Optional: Add other providers like Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Configure MongoDB adapter
  adapter: MongoDBAdapter(clientPromise),

  // Custom pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  // Callbacks for additional customization
  callbacks: {
    async session({ session, token }) {
      // Add username to session
      if (token.username) {
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add username to token
      if (user) {
        token.username = user.username;
      }
      return token;
    },
  },

  // Security settings
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export default NextAuth(authOptions);
