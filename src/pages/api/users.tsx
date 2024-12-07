import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const client = await clientPromise;
      // const db = client.db("give_me_loot");
      const client = clientPromise;
      const db = client.db("test");
      const users = await db
        .collection("users")
        .find({})
        .sort({ id: -1 })
        .limit(10)
        .toArray();
      res.json(users);
    } catch (e) {
      console.error(e);
    }
  });
};
