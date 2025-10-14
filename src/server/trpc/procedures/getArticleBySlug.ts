import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";

export const getArticleBySlug = baseProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    const article = await db.article.findUnique({
      where: {
        slug: input.slug,
        published: true,
      },
    });
    
    if (article === null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }
    
    return article;
  });
