import { NextRequest, NextResponse } from "next/server";
import { generateUrl } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  if (!id || !id.match(/^\d+$/)) {
    return NextResponse.json({ error: "Invalid ticket id" }, { status: 400 });
  }
  const url = generateUrl(`ticket/check`, { id });
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

