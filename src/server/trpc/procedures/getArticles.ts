import { z } from "zod";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const getArticles = baseProcedure
  .input(z.object({ 
    cursor: z.number().optional(),
    limit: z.number().min(1).max(50).default(10)
  }))
  .query(async ({ input }) => {
    const { cursor, limit } = input;
    
    const articles = await db.article.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit + 1,
      ...(cursor && {
        cursor: {
          id: cursor,
        },
        skip: 1,
      }),
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        author: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    let nextCursor: number | undefined = undefined;
    if (articles.length > limit) {
      const nextItem = articles.pop();
      nextCursor = nextItem!.id;
    }

    return {
      articles,
      nextCursor,
    };
  });
