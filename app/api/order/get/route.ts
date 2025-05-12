import { NextRequest, NextResponse } from "next/server";
import { generateUrl } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId || !orderId.match(/^\d+$/)) {
    return NextResponse.json({ error: "Invalid orderID" }, { status: 400 });
  }

  const path = `member/order/get`;
  const url = generateUrl(path, {
    orderId: orderId,
    lang: "th",
  });

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
