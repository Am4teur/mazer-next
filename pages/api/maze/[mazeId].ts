import dbConnect from "@/lib/dbConnect";
import Maze, { IMaze } from "@/models/Maze";
import type { NextApiRequest, NextApiResponse } from "next";

interface MazeData {
  maze: IMaze | {};
  mazes?: IMaze[] | null;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MazeData>
) {
  await dbConnect();

  const {
    query: { mazeId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const maze = await Maze.findById(mazeId);
        return res.status(200).json({ maze: maze });
      } catch (error: any) {
        return res.status(400).json({ maze: {}, error: error.toString() });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`!Method ${method} Not Allowed`);
    // return res
    //   .status(400)
    //   .json({ maze: {}, error: "!method type not allowed" });
  }
}
