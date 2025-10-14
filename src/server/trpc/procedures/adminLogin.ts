import { z } from "zod";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { baseProcedure } from "~/server/trpc/main";
import { env } from "~/server/env";

export const adminLogin = baseProcedure
  .input(z.object({
    password: z.string().min(1, "Password is required"),
  }))
  .mutation(async ({ input }) => {
    // Compare the provided password with the admin password
    const isValidPassword = input.password === env.ADMIN_PASSWORD;
    
    if (!isValidPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: "admin", iat: Date.now() },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      success: true,
      token,
    };
  });
