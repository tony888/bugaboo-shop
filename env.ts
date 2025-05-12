import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BUGABOO_SHOP_API_KEY: z.string().min(1),
    BUGABOO_SHOP_URL: z.string().min(1),

    // GB Prime Pay
    GBP_SECRET_KEY: z.string().min(1),
  },
  client: {
    // GB Prime Pay
    NEXT_PUBLIC_GBP_PUBLIC_KEY: z.string().min(1),
    NEXT_PUBLIC_GBP_URL: z.string().min(1),

    // Bugaboo Shop
    NEXT_PUBLIC_BUGABOO_SHOP_URL: z.string().min(1),
    NEXT_PUBLIC_BUGABOO_SHOP_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GBP_PUBLIC_KEY: process.env.NEXT_PUBLIC_GBP_PUBLIC_KEY,
    NEXT_PUBLIC_GBP_URL: process.env.NEXT_PUBLIC_GBP_URL,
    NEXT_PUBLIC_BUGABOO_SHOP_URL: process.env.NEXT_PUBLIC_BUGABOO_SHOP_URL,
    NEXT_PUBLIC_BUGABOO_SHOP_API_KEY:
      process.env.NEXT_PUBLIC_BUGABOO_SHOP_API_KEY,
  },
});
