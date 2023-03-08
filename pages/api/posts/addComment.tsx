import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// prisma
import prisma from '../../../prisma/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Please signin to create a post.' });
    }

    const { title, postId } = req.body.data;

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    //Check title
    if (title.length > 300) {
      return res.status(403).json({ message: 'Please write a shorter post' });
    }

    if (!title) {
      return res.status(403).json({ message: 'Please write something.' });
    }
    //Create Post
    try {
      const result = await prisma.comment.create({
        data: {
          title: title,
          userId: prismaUser?.id,
          postId: postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ message: 'Error has occured while making a comment' });
    }
  }
}
