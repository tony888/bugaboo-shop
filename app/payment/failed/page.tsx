import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegTimesCircle } from "react-icons/fa";

export default function PaymentFailedPage() {
  return (
    <AppLayout showCoverImage={false}>
      <div className="max-w-xl mx-auto mt-36 text-center">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <FaRegTimesCircle className="mx-auto text-red-500 my-4" size={65} />
          <h2 className="text-3xl font-bold mb-4">ชำระเงินไม่สำเร็จ</h2>
          <div className="mb-4 text-primary">
            <span className="font-semibold text-lg">
              คำสั่งซื้อของคุณดำเนินการชำระเงินไม่สำเร็จ
            </span>
          </div>
          <Link href="/">
            <Button className="w-full text-2xl bg-primary hover:bg-primary/80 p-6">
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
