"use client";
import { useTicketStore } from "@/app/stores/useTicketStore";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const PaymentSuccessContent = () => {
  const { email } = useTicketStore();
  const searchParams = useSearchParams();
  const refId = searchParams.get("refId");
  return (
    <AppLayout showCoverImage={false}>
      <div className="max-w-xl mx-auto mt-20 text-center">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <FaRegCheckCircle className="mx-auto text-[#29B3FF] my-4" size={65} />
          <h2 className="text-3xl font-bold mb-4 text-primary">
            ขอบคุณสำหรับการสั่งซื้อ
          </h2>
          <p className="mb-4 text-primary">
            <strong>เลขที่: {refId}</strong>
          </p>
          <div className="mb-4 text-primary">
            <span className="font-semibold text-lg">
              คำสั่งซื้อของคุณถูกส่งไปทางอีเมล {email}
            </span>
            <p>กรุณาเช็ครายละเอียด และเงื่อนไขคำสั่งซื้อผ่านทางอีเมล</p>
          </div>
          <Link href="/">
            <Button className="w-full bg-primary text-2xl hover:bg-primary/80 p-6">
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
