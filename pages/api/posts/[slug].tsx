import type { NextApiRequest, NextApiResponse } from 'next';

// prisma
import prisma from '../../../prisma/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // fetch single post detail
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.slug,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: 'Error fetching post' });
    }
  }
}
