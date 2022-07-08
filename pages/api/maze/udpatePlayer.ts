// TODO this is just a skeleton
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Maze, { IMaze } from "@/models/Maze";

interface MazeData {
  mazes: IMaze[] | null;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MazeData>
) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const mazes = await Maze.find();
        return res.status(200).json({ mazes: mazes });
      } catch (error: any) {
        return res.status(400).json({ mazes: null, error: error.toString() });
      }
    default:
      return res
        .status(400)
        .json({ mazes: null, error: "!method type not allowed" });
  }
}
