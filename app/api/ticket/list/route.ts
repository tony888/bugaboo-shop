import { generateUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = generateUrl("ticket/list");
    console.log("url", `${url}&shop_code=AQV`);
    const response = await fetch(`${url}&shop_code=AQV`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tickets" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("List tickets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
