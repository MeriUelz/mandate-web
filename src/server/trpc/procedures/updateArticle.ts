import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { baseProcedure } from "~/server/trpc/main";
import { verifyAdminToken } from "~/server/utils/auth";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const updateArticle = baseProcedure
  .input(z.object({
    id: z.number(),
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    author: z.string().min(1).max(100),
    published: z.boolean(),
    authToken: z.string().min(1, "Authentication token is required"),
  }))
  .mutation(async ({ input }) => {
    // Verify admin authentication
    verifyAdminToken(input.authToken);
    
    // Get the existing article
    const existingArticle = await db.article.findUnique({
      where: { id: input.id },
    });
    
    if (!existingArticle) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }

    const newSlug = generateSlug(input.title);
    
    // Check if slug already exists (but allow the same article to keep its slug)
    if (newSlug !== existingArticle.slug) {
      const slugConflict = await db.article.findUnique({
        where: { slug: newSlug },
      });
      
      if (slugConflict) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An article with this title already exists",
        });
      }
    }

    // Determine publishedAt timestamp
    let publishedAt = existingArticle.publishedAt;
    if (input.published && !existingArticle.published) {
      // Article is being published for the first time
      publishedAt = new Date();
    } else if (!input.published) {
      // Article is being unpublished
      publishedAt = null;
    }

    const article = await db.article.update({
      where: { id: input.id },
      data: {
        title: input.title,
        slug: newSlug,
        content: input.content,
        author: input.author,
        published: input.published,
        publishedAt,
      },
    });

    return {
      success: true,
      article,
    };
  });
