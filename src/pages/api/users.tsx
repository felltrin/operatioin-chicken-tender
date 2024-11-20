import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await clientPromise;
      const db = client.db("sample_mflix");
      const movies = await db
        .collection("users")
        .find({})
        .sort({ id: -1 })
        .limit(10)
        .toArray();
      res.json(movies);
    } catch (e) {
      console.error(e);
    }
  });
};
