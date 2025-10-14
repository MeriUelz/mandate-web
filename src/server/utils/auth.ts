import jwt from "jsonwebtoken";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/server/env";

const tokenPayloadSchema = z.object({
  role: z.literal("admin"),
  iat: z.number(),
});

export function verifyAdminToken(token: string) {
  try {
    const verified = jwt.verify(token, env.JWT_SECRET);
    const parsed = tokenPayloadSchema.parse(verified);
    return parsed;
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid or expired authentication token",
    });
  }
}
