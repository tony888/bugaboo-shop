import { generateUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const creditCardSchema = z.object({
  orderId: z.coerce.string(),
  card: z.object({
    number: z.string(),
    expirationMonth: z.string(),
    expirationYear: z.string(),
    securityCode: z.string(),
    name: z.string(),
  }),
});

interface CreditCardResponse {
  status: {
    code: number;
    message: string;
  };
  data: {
    gbpReferenceNo: string;
  };
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { orderId, card } = creditCardSchema.parse(body);

    const url = generateUrl("member/order/pay_credit", {
      orderId: orderId,
    });

    const creditCardResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        card: JSON.stringify(card),
      }),
    });

    const responseData: CreditCardResponse = await creditCardResponse.json();

    if (
      responseData.status.code !== 200 ||
      responseData.status.message !== "success"
    ) {
      return NextResponse.json(
        { error: responseData.status.message || "Credit card payment failed" },
        { status: 400 },
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Credit card payment error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
