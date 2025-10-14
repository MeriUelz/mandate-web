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

export const createArticle = baseProcedure
  .input(z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    author: z.string().min(1).max(100),
    published: z.boolean().default(false),
    authToken: z.string().min(1, "Authentication token is required"),
  }))
  .mutation(async ({ input }) => {
    // Verify admin authentication
    verifyAdminToken(input.authToken);
    
    const slug = generateSlug(input.title);
    
    // Check if slug already exists
    const existingArticle = await db.article.findUnique({
      where: { slug },
    });
    
    if (existingArticle) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "An article with this title already exists",
      });
    }

    const article = await db.article.create({
      data: {
        title: input.title,
        slug,
        content: input.content,
        author: input.author,
        published: input.published,
        publishedAt: input.published ? new Date() : null,
      },
    });

    return {
      success: true,
      article,
    };
  });
