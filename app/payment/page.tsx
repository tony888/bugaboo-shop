"use client";

import AppLayout from "@/components/AppLayout";
import OverlayLoading from "@/components/OverlayLoading";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { usePaymentMethod } from "../hooks/usePaymentMethod";
import { useTicketStore } from "../stores/useTicketStore";
import ProtectedPaymentWrapper from "./_components/ProtectedPaymentWrapper";


const OTP_COUNTDOWN_TIME = 60; // 60 seconds

function PaymentForm() {
  const router = useRouter();

  const { email, setEmail, selectedPackage, totalPrice, actualQuantity } =
    useTicketStore();

  const {
    selectedMethod,
    selectPaymentMethod,
    paymentMethods,
    supportedMethod,
  } = usePaymentMethod();

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_TIME);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpSent, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("กรุณากรอกอีเมล");
      return;
    }
    if (!selectedMethod) {
      setError("กรุณาเลือกวิธีการชำระเงิน");
      return;
    }
    setIsLoading(true);
    await handleOTP();
    setOtpSent(true);
    setCountdown(OTP_COUNTDOWN_TIME);
    setError("");
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    await handleOTP();
    setCountdown(OTP_COUNTDOWN_TIME);
    setError("");
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!selectedMethod) return;

    setIsLoading(true);
    const res = await fetch("/ticket/aquaverse/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    console.log("payment", data);
    setMessage(data.message || data.error);

    if (data.message) {
      if (selectedMethod.id === supportedMethod.CREDIT_CARD) {
        router.push(`/payment/credit-card`);
      }
      if (selectedMethod.id === supportedMethod.PROMPTPAY) {
        router.push(`/payment/prompt-pay`);
      }
      if (selectedMethod.id === supportedMethod.TRUE_MONEY) {
        router.push(`/payment/true-money`);
      }
    } else {
      setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
    setIsLoading(false);
  };

  const handleOTP = async () => {
    const res = await fetch("/ticket/aquaverse/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log("payment", data);
    setMessage(data.message || data.error);
  };

  return (
    <ProtectedPaymentWrapper>
      <AppLayout showCoverImage={false}>
        {isLoading && <OverlayLoading />} 
        <div className="max-w-lg mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="text-primary">
              <h3 className="text-xl font-semibold mb-2">คำสั่งซื้อ</h3>
              <div className="flex mb-2 flex-wrap">
                <p className="w-32">
                  <strong>แพ็กเกจ:</strong>
                </p>
                <p>{selectedPackage?.name}</p>
              </div>
              <div className="flex mb-2 flex-wrap">
                <p className="w-32">
                  <strong>จำนวน:</strong>
                </p>
                <p>{actualQuantity}</p>
              </div>
              <div className="flex mb-2 flex-wrap">
                <p className="w-32">
                  <strong>รวมทั้งหมด: </strong>
                </p>
                <p> {totalPrice.toLocaleString('th-TH',{
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })} บาท</p>
              </div>
            </div>
            <div className="mb-6">
              {/* <Label className="mb-2 block">เลือกวิธีการชำระเงิน:</Label> */}
              <RadioGroup
                className="gap-4"
                onValueChange={(value) => {
                  const method = paymentMethods.find((m) => m.id === value);
                  if (method) selectPaymentMethod(method);
                }}
                value={selectedMethod?.id}
              >
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`flex items-center space-x-4 border-2 p-4 rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${
                      selectedMethod?.id === method.id
                        ? "border-primary bg-primary/10"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="data-[state=checked]:border-primary"
                    />
                    <div className="flex items-center justify-between flex-1 flex-wrap">
                      <span className="font-medium">{method.name}</span>
                      <div className="flex gap-2 flex-wrap">
                        {method.icons.map((icon, index) => (
                          <Image
                            key={index}
                            className="text-xl"
                            src={icon.path}
                            width={icon.width}
                            height={0}
                            alt={"payment-logo"}
                          ></Image>
                        ))}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

            </div>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="email" className="flex items-center text-primary">
                อีเมล <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 mt-2"
                placeholder="กรุณากรอกอีเมล"
                required
                disabled={otpSent}
              />
              {!otpSent && (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full mb-4"
                >
                  ส่งรหัส OTP
                </Button>
              )}
            </form>
            {otpSent && (
              <div>
                <div className="flex gap-2 items-end mb-4">
                  <div className="grow w-full">
                    <Label htmlFor="otp">
                      รหัส OTP<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label className="invisible">Spacer</Label>
                    <Button
                      onClick={handleResendOtp}
                      disabled={countdown > 0}
                      variant="outline"
                      className="whitespace-nowrap mt-2"
                    >
                      {countdown > 0
                        ? `ส่งอีกครั้งใน ${countdown} วินาที`
                        : "ส่งรหัส OTP อีกครั้ง"}
                    </Button>
                  </div>
                </div>
                <Button onClick={handleVerifyOtp} className="grow mr-2 w-full">
                  ยืนยัน OTP
                </Button>
              </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </AppLayout>
    </ProtectedPaymentWrapper>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentForm />
    </Suspense>
  );
}
