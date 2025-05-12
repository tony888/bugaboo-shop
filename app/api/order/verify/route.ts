import { NextResponse } from "next/server";
import configuration from '@/config/configuration';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      console.log("Order ID is required");
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }
    
    // Get host from configuration
    const host = configuration().host.url;
    
    // Ensure host has a proper protocol
    let baseUrl = host;
    if (!baseUrl?.startsWith('http://') && !baseUrl?.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }
    
    // Ensure the base URL ends with a slash
    if (!baseUrl.endsWith('/')) {
      baseUrl = `${baseUrl}/`;
    }
    
    // Create full redirect URL using string concatenation to avoid URL parsing issues
    const redirectUrl = `${baseUrl}th/ticket/aquaverse/payment/verify?orderId=${orderId}`;
    
    console.log('Redirecting to:', redirectUrl);
    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

