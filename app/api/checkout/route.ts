import { NextApiRequest, NextApiResponse } from "next";

export function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return Response.json({ message: 'Hellos from Next.js!' })
}