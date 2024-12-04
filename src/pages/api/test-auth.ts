import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return res.status(200).json({
      message: "You are authenticated",
      user: session.user,
    });
  } else {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }
}
