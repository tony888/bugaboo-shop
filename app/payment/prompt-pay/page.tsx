"use client";

import AppLayout from "@/components/AppLayout";
import OverlayLoading from "@/components/OverlayLoading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PackageInformation } from "../_components/PackageInformation";
import { TicketTermsAndConditions } from "../_components/TicketTermsAndConditions";
import { useTicketStore } from "@/app/stores/useTicketStore";
import ProtectedPaymentWrapper from "../_components/ProtectedPaymentWrapper";
import useBugabooShop from "@/app/hooks/useBugabooShop";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function PromptPayPage() {
  const router = useRouter();

  const { selectedPackage, totalPrice, email, actualQuantity } =
    useTicketStore();

  const {
    createOrder,
    getTicketDetail,
    error: bugabooError,
  } = useBugabooShop();
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [ordertId, setOrderId] = useState("");
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      setIsOverlayLoading(true);
      if (selectedPackage) {
        const ticket = await getTicketDetail(`${selectedPackage.id}`);
        if (!ticket) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: "ไม่พบข้อมูลตั๋วที่คุณเลือก กรุณาลองใหม่อีกครั้ง",
          });
        }
        try {
          const { data } = await createOrder(email, [
            {
              event: "aquaverse",
              type: "ticket",
              id: ticket.id,
              thumbnail: ticket.thumbnail,
              name: ticket.name,
              price: ticket.price,
              full_price: ticket.full_price,
              amount: actualQuantity,
            },
          ]);
          const orderID = data?.orderID;
          //if orderID is null
          // create toast error
          if (!orderID) {
            toast({
              title: "เกิดข้อผิดพลาด",
              description: "ไม่สามารถสร้างคำสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง",
            });
          }
          setOrderId(orderID || "");
        } catch (error) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: "กรุณาลองใหม่อีกครั้ง",
          });
        } finally {
          setIsOverlayLoading(false);
        }
      }
    };
    fetchTicketDetail();
  }, [selectedPackage?.id]);

  useEffect(() => {
    if (!ordertId) return;
    const fetchOrderStatus = async () => {
      try {
        //console.log('call api');
        const timestamp = Math.floor(Date.now() / 1000);
        const res = await fetch(`/ticket/aquaverse/api/order/get?orderId=${ordertId}&lang=th&t=${timestamp}`, {
          headers: { "Content-Type": "application/json" },
        });
        const { data } = await res.json();

        setQRCodeUrl(data.qrcode);

        if (data.status === "P") {
          const refId = data.code;
          router.push(`/payment/success?refId=${refId}`);
        } else if (data.status === "C") {
          router.push("/payment/failed");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderStatus();
    const interval = setInterval(fetchOrderStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [ordertId, router]);
  return (
    <ProtectedPaymentWrapper>
      <AppLayout showCoverImage={false}>
        {isOverlayLoading && <OverlayLoading />}
        <div className="max-w-lg mx-auto">
          <Card className="bg-white">
            <CardHeader className="space-y-4">
              <CardTitle className="text-xl font-bold text-primary">
                ชำระเงินด้วย พร้อมเพย์
              </CardTitle>
              <PackageInformation
                name={selectedPackage?.name || ""}
                price={totalPrice.toLocaleString('th-TH',{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center">
                  {isQrLoading && <OverlayLoading />}
                  {qrCodeUrl && (
                    <Image
                      src={qrCodeUrl}
                      alt="QR Code"
                      width={200}
                      height={200}
                      className="border p-2 rounded-lg"
                      onLoad={() => setIsQrLoading(false)}
                    />
                  )}
                </div>

                <div className="text-center space-y-2">
                  {/* <p className="font-semibold">สแกน QR Code เพื่อชำระเงิน</p>
                  <p className="text-sm text-gray-500">
                    กรุณาชำระเงินภายใน 15 นาที
                  </p> */}
                </div>
                <TicketTermsAndConditions />

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-primary border-primary"
                    onClick={() => router.back()}
                  >
                    ย้อนกลับ
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/80"
                  >
                    ยืนยันการชำระเงิน
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedPaymentWrapper>
  );
}
