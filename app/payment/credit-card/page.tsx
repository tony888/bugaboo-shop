"use client";

import useBugabooShop from "@/app/hooks/useBugabooShop";
import { useGBPrimepayCardForm } from "@/app/hooks/useGBPrimepayCardForm";
import { useTicketStore } from "@/app/stores/useTicketStore";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMask } from "@react-input/mask";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { PackageInformation } from "../_components/PackageInformation";
import ProtectedPaymentWrapper from "../_components/ProtectedPaymentWrapper";
import { TicketTermsAndConditions } from "../_components/TicketTermsAndConditions";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function CreditCardPage() {
  const router = useRouter();
  const { selectedPackage, totalPrice, email, actualQuantity } =
    useTicketStore();
  const {
    form,
    formSchema,
    isLoading,
    error: gbpError,
    handleSubmit,
  } = useGBPrimepayCardForm();

  const {
    createOrder,
    getTicketDetail,
    error: bugabooError,
  } = useBugabooShop();

  const cardNumberRef = useMask({
    mask: "____-____-____-____",
    replacement: { _: /\d/ },
  });

  const expiryRef = useMask({
    mask: "__/__",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    if (gbpError || bugabooError) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "การทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  }, [gbpError, bugabooError]);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!selectedPackage) return;

    const ticket = await getTicketDetail(`${selectedPackage.id}`);

    const order = await createOrder(email, [
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

    if (!order.data) throw Error("Create Order Failed");

    // Charge Card
    await handleSubmit(order.data.orderID, formData);
  };

  return (
    <ProtectedPaymentWrapper>
      <AppLayout showCoverImage={false}>
        <div className="max-w-xl mx-auto">
          <Card className="bg-white">
            <CardHeader className="space-y-4">
              <h2 className="text-xl font-bold text-primary">
                ชำระเงินบัตรเครดิต
              </h2>

              <PackageInformation
                name={selectedPackage?.name || ""}
                price={totalPrice.toLocaleString('th-TH',{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              />

              <div className="flex items-center space-x-4 justify-between">
                <h2 className="text-lg font-semibold">บัตรเครดิต/เดบิต</h2>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/ticket/aquaverse/images/payment-methods/mastercard.png"
                    alt="mastercard"
                    width={36}
                    height={36}
                  />
                  <Image
                    src="/ticket/aquaverse/images/payment-methods/visa.png"
                    alt="visa"
                    width={36}
                    height={36}
                  />
                  <Image
                    src="/ticket/aquaverse/images/payment-methods/jcb.png"
                    alt="jcb"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
             
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <label>ข้อมูลบัตรเครดิต/เดบิต</label>
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อ-นามสกุลที่ปรากฏในบัตร </FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกชื่อ-นามสกุล" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หมายเลขบัตร</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            {...field}
                            ref={cardNumberRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>วันหมดอายุ </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ดด / ปป"
                              {...field}
                              ref={expiryRef}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              maxLength={3}
                              placeholder="รหัส CVV"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      disabled={isLoading}
                      type="submit"
                      className="bg-primary hover:bg-primary/80"
                    >
                      {isLoading ? "กำลังดำเนินการ..." : "ยืนยันการชำระเงิน"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedPaymentWrapper>
  );
}
