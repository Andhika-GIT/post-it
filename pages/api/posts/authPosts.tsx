import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// prisma
import prisma from '../../../prisma/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Please sign in' });
  }

  if (req.method === 'GET') {
    //get auth users posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              comments: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: 'Error has occured while making a post' });
    }
  }
}
