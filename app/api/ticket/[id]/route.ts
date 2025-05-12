import { generateUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const ticketParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    // Validate the ID parameter
    const { id: validatedId } = ticketParamsSchema.parse({ id });

    const url = generateUrl(`ticket/${validatedId}`);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || "Failed to fetch ticket data",
          success: false,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Ticket fetch error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid ticket ID format",
          details: error.errors,
          success: false,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
}
