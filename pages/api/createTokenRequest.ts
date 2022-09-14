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

  // @TODO remove this ts ignore, when we login with email, we need to get the _id
  // @ts-ignore
  const userId = session?.user.id || session?.user._id || "";

  const client = new Ably.Realtime(process.env.ABLY_SERVER_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    // @TODO either remove user.id or if I want to use the user.id, I need to consider user._id or fix this bug
    // @ts-ignore
    clientId: session.user.email + " " + userId,
  });

  return res.status(200).json(tokenRequestData);
}
