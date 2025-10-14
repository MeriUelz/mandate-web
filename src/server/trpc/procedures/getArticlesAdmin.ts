import { z } from "zod";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";
import { verifyAdminToken } from "~/server/utils/auth";

export const getArticlesAdmin = baseProcedure
  .input(z.object({ 
    cursor: z.number().optional(),
    limit: z.number().min(1).max(50).default(10),
    authToken: z.string().min(1, "Authentication token is required"),
  }))
  .query(async ({ input }) => {
    // Verify admin authentication
    verifyAdminToken(input.authToken);
    
    const { cursor, limit } = input;
    
    const articles = await db.article.findMany({
      // No published filter - show all articles for admin
      orderBy: {
        createdAt: 'desc', // Order by creation date for admin view
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
        published: true,
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
