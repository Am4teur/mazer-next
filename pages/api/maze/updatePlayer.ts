// TODO this is just a skeleton
import dbConnect from "@/lib/dbConnect";
import Maze from "@/models/Maze";
import type { NextApiRequest, NextApiResponse } from "next";

interface MazeData {
  msg?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MazeData>
) {
  await dbConnect();

  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`!Method ${method} Not Allowed`);
  }

  const { mazeId, player } = req.body;

  try {
    const query = { _id: mazeId };
    const update = {
      $set: {
        [`players.${player.userId}`]: player,
      },
    };
    await Maze.findOneAndUpdate(query, update);
    return res.status(200).json({ msg: "Success" });
  } catch (error: any) {
    return res.status(400).json({ error: error.toString() });
  }
}
