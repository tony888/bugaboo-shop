import { env } from "@/env";
import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

const keyCombination = (
  amount: string,
  referenceNo: string,
  responseUrl: string,
  backgroundUrl: string,
) => {
  const secretKey = env.GBP_SECRET_KEY;
  if (!secretKey) {
    console.error(`[ERROR] ->> GBP_SECRET_KEY is not defined`);
    throw new Error("Internal server error");
  }
  return createHmac("sha256", secretKey)
    .update(`${amount}${referenceNo}${responseUrl}${backgroundUrl}`)
    .digest("hex");
};

const trueMoneySchema = z.object({
  amount: z.number().positive(),
  referenceNo: z.string().min(1),
  responseUrl: z.string().url(),
  backgroundUrl: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = trueMoneySchema.parse(body);
    const checksum = keyCombination(
      data.amount.toFixed(2),
      data.referenceNo,
      data.responseUrl,
      data.backgroundUrl,
    );

    return NextResponse.json(
      {
        checksum,
      },
      { status: 200, statusText: "success" },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
