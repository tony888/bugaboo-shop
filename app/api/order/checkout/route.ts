import { generateUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const checkoutSchema = z.object({
  email: z.string().email(),
  tickets: z
    .array(
      z.object({
        event: z.string(),
        type: z.string(),
        id: z.number(),
        thumbnail: z.string(),
        name: z.string(),
        price: z.number(),
        full_price: z.number(),
        amount: z.number(),
      }),
    )
    .min(1),
});

function getDefaultOrderData() {
  return {
    shoppingCart: {
      shop: [],
      ticket: [],
      amount: 0,
      total: 0,
      shop_special: {},
    },
    delivery_cost_city: 0,
    delivery_cost_upcountry: 0,
    coupon: {},
    discount_total: 0,
    use_point: 0,
    discount_point_total: 0,
    shipping_address: {},
    billing_address: {},
    member_address: [],
    settings: {},
    email: "",
  };
}

interface CheckoutResponse {
  status: {
    code: number;
    message: string;
  };
  data: {
    orderID: number;
  };
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { email, tickets } = checkoutSchema.parse(body);

    const url = generateUrl("member/order/checkout");

    const payload = JSON.stringify({
      orderData: {
        ...getDefaultOrderData(),
        shoppingCart: {
          shop: [],
          ticket: tickets,
          amount: tickets.reduce((p, c) => p + c.amount, 0),
          total: tickets.reduce((p, c) => p + c.price * c.amount, 0),
          shop_special: {},
        },
        email,
      },
    });

    const checkoutResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    const responseData: CheckoutResponse = await checkoutResponse.json();

    if (
      responseData.status.code !== 200 ||
      responseData.status.message !== "success"
    ) {
      return NextResponse.json(
        { error: responseData.status.message || "Checkout failed" },
        { status: 400 },
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Checkout error:", error);
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
