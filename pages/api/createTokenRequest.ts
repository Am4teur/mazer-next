import Ably from "ably/promises";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ably.Types.TokenRequest>
) {
  let { clientId } = req.query;
  clientId = Array.isArray(clientId) ? clientId[0] : clientId;

  const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId,
  });

  return res.status(200).json(tokenRequestData);
}
