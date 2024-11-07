import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const objectId = new ObjectId(id);

  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movie = await db
      .collection("movies")
      .find({ _id: objectId })
      .sort({ metacritic: -1 })
      .limit(1)
      .toArray();
    res.json(movie);
  } catch (e) {
    console.error(e);
  }
};
