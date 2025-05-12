"use client";

import AppLayout from "@/components/AppLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

enum PaymentStatus {
  New = "N",
  Paid = "P",
  Cancel = "C",
}
function VerifyPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    const verifyPayment = async () => {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const response = await fetch(`/ticket/aquaverse/api/order/get?orderId=${orderId}&t=${timestamp}`);
        const { data: orderData } = await response.json();
        if (orderData.status === PaymentStatus.Paid) {
          router.push(`/payment/success?refId=${orderData.code}`);
        } else {
          router.push("/payment/failed");
        }
      } catch (error) {
        router.push("/payment/failed");
      }
    };
    verifyPayment();
    const intervalId = setInterval(verifyPayment, 5000);

    return () => clearInterval(intervalId);
  }, [orderId, router]);

  return (
    <AppLayout>
      <div className="flex items-center justify-center mt-20">
        <div className="text-center bg-white/80 rounded-2xl px-24 py-36">
          <h1 className="text-xl font-semibold mb-4">Verifying Payment</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    </AppLayout>
  );
}

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPaymentContent />
    </Suspense>
  );
}
