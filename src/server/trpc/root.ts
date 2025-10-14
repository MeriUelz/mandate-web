import { z } from "zod";
import {
  createCallerFactory,
  createTRPCRouter,
  baseProcedure,
} from "~/server/trpc/main";
import { getArticles } from "~/server/trpc/procedures/getArticles";
import { getArticlesAdmin } from "~/server/trpc/procedures/getArticlesAdmin";
import { getArticleBySlug } from "~/server/trpc/procedures/getArticleBySlug";
import { getArticleBySlugAdmin } from "~/server/trpc/procedures/getArticleBySlugAdmin";
import { createArticle } from "~/server/trpc/procedures/createArticle";
import { updateArticle } from "~/server/trpc/procedures/updateArticle";
import { uploadMediumArticle } from "~/server/trpc/procedures/uploadMediumArticle";
import { testMediumScraping } from "~/server/trpc/procedures/testMediumScraping";
import { adminLogin } from "~/server/trpc/procedures/adminLogin";
import { getSitemap } from "~/server/trpc/procedures/getSitemap";

export const appRouter = createTRPCRouter({
  calculateROI: baseProcedure
    .input(
      z.object({
        aov: z.number().min(1),
        disputeRate: z.number().min(0.01).max(10),
        monthlySuccessfulTransactions: z.number().min(100),
      })
    )
    .mutation(({ input }) => {
      const { aov, disputeRate, monthlySuccessfulTransactions } = input;
      
      // Calculate current monthly disputes
      const monthlyDisputes = (monthlySuccessfulTransactions * disputeRate) / 100;
      
      // Calculate current monthly costs (dispute fees + chargeback fees + processing costs)
      const disputeFee = 15; // Average dispute fee
      const chargebackFee = 25; // Average chargeback fee
      const currentMonthlyCost = monthlyDisputes * (disputeFee + chargebackFee + aov);
      
      // Calculate projected savings (assuming 65% reduction as mentioned in Benefits section)
      const reductionPercentage = 65;
      const projectedSavings = (currentMonthlyCost * reductionPercentage) / 100;
      const projectedMonthlyCost = currentMonthlyCost - projectedSavings;
      const savingsPercentage = (projectedSavings / currentMonthlyCost) * 100;
      
      return {
        currentMonthlyCost: Math.round(currentMonthlyCost),
        projectedSavings: Math.round(projectedSavings),
        projectedMonthlyCost: Math.round(projectedMonthlyCost),
        savingsPercentage: Math.round(savingsPercentage * 100) / 100,
        // Calculation details for transparency
        monthlyDisputes: Math.round(monthlyDisputes * 100) / 100,
        disputeFee,
        chargebackFee,
        reductionPercentage,
        aov,
        disputeRate,
        monthlySuccessfulTransactions,
      };
    }),

  // Auth procedures
  adminLogin,

  // Blog procedures
  getArticles,
  getArticlesAdmin,
  getArticleBySlug,
  getArticleBySlugAdmin,
  createArticle,
  updateArticle,
  uploadMediumArticle,
  testMediumScraping,

  // SEO procedures
  getSitemap,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
