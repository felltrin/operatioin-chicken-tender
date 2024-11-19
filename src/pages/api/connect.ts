import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await clientPromise;
      const db = client.db("sample_mflix");
      const data = await db
        .collection("comments")
        .find({})
        .sort({ name: 1 })
        .limit(3)
        .toArray();
      res
        .status(200)
        .json({ message: "Connected to MongoDB and retrieved data", data });
    } catch (e) {
      console.error(e);
    }
  });
};
