import Ably from "ably/promises";
import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.ABLY_SERVER_API_KEY) {
  throw new Error("process.env.ABLY_SERVER_API_KEY is undefined");
}

const ably = new Ably.Rest(process.env.ABLY_SERVER_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { updatedPlayer },
  } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ msg: `!Method ${method} Not Allowed` });
    return;
  }

  const channel = ably.channels.get("maze:<mazeId>"); // TODO use maze
  channel.publish("update-player", { updatedPlayer: updatedPlayer });

  res.status(200).json({});
}
