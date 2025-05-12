import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUrl(
  path: string,
  opts?: {
    id?: string;
    orderId?: string;
    lang?: string;
  },
): string {
  const key = env.BUGABOO_SHOP_API_KEY;
  const secret = crypto
    .createHash("md5")
    .update(`${path}/${key}`)
    .digest("hex");
  let url = `${env.BUGABOO_SHOP_URL}/${path}?key=${key}&secret=${secret}`;
  if (opts?.id) {
    url += `&id=${opts.id}`;
  }
  if (opts?.orderId) {
    url += `&orderID=${opts.orderId}`;
  }
  if (opts?.lang) {
    url += `&lang=${opts.lang}`;
  }
  //for dev only
  const timestamp = Math.floor(Date.now() / 1000);
  url += `&timestamp=${timestamp}`;
  return url;
}
