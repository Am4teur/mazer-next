import Ably from "ably/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { Session } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ably.Types.TokenRequest | string>
) {
  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  if (session === null) {
    return res
      .status(400)
      .json(
        "createTokenRequest.ts responded with error because session is null"
      );
  }

  const client = new Ably.Realtime(process.env.ABLY_SERVER_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: session.user.email,
  });

  return res.status(200).json(tokenRequestData);
}
