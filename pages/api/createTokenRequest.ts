import Ably from "ably/promises";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ably.Types.TokenRequest>
) {
  let { userId } = req.query;
  userId = Array.isArray(userId) ? userId[0] : userId;

  const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: userId,
  });

  return res.status(200).json(tokenRequestData);
}
