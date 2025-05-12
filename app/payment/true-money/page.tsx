"use client";

import useBugabooShop from "@/app/hooks/useBugabooShop";
import { useGBPrimepayTrueMoneyForm } from "@/app/hooks/useGBPrimepayTrueMoneyForm";
import { useTicketStore } from "@/app/stores/useTicketStore";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { PackageInformation } from "../_components/PackageInformation";
import ProtectedPaymentWrapper from "../_components/ProtectedPaymentWrapper";
import { TicketTermsAndConditions } from "../_components/TicketTermsAndConditions";
import { useRouter } from "next/navigation";

export default function TrueMoneyPage() {
  const router = useRouter();

  const { selectedPackage, totalPrice, email, actualQuantity } =
    useTicketStore();
  const { getTicketDetail, createOrder } = useBugabooShop();

  const { form, formSchema, isLoading, error, handleSubmit } =
    useGBPrimepayTrueMoneyForm();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!selectedPackage?.id) return;

    // Create Order
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
        <div className="max-w-lg mx-auto">
          <Card className="bg-white">
            <CardHeader className="space-y-4">
              <CardTitle className="text-xl font-bold text-primary">
                ชำระเงินด้วย ทรูมันนี่ วอลเล็ท
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เบอร์โทรศัพท์ </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0812345678"
                            type="tel"
                            maxLength={10}
                            {...field}
                          />
                        </FormControl>
                        <p className="text-sm text-gray-500">
                          กรุณากรอกหมายเลขโทรศัพท์ที่ผูกกับบัญชี TrueMoney
                          Wallet
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                      className="w-full bg-primary hover:bg-primary/80"
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
