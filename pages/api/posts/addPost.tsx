import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// prisma
import prisma from '../../../prisma/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        message: 'Please sign in to make a post',
      });
    }

    const title: string = req.body.title;

    if (title.length > 300) {
      return res.status(403).json({
        message: 'write a shorter post',
      });
    }
    if (!title.length) {
      return res.status(403).json({
        message: 'please do not leave this empty',
      });
    }

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // create Post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: 'Error has occured whilst making a post' });
    }
  }
}
