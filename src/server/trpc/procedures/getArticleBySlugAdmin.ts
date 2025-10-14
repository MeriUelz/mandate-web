import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";
import { verifyAdminToken } from "~/server/utils/auth";

export const getArticleBySlugAdmin = baseProcedure
  .input(z.object({ 
    slug: z.string(),
    authToken: z.string().min(1, "Authentication token is required"),
  }))
  .query(async ({ input }) => {
    // Verify admin authentication
    verifyAdminToken(input.authToken);
    
    const article = await db.article.findUnique({
      where: {
        slug: input.slug,
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
