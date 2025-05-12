import { env } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface GetOrderResponse {
  status: {
    code: number;
    message: string;
  };
  data: {
    payTrueMoney: {
      amount: number;
      detail: string;
      referenceNo: string;
      merchantDefined1: string;
      merchantDefined2: string;
      merchantDefined3: string;
      merchantDefined4: string;
      backgroundUrl: string;
      responseUrl: string;
    };
  };
}

export const useGBPrimepayTrueMoneyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    phoneNumber: z
      .string()
      .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก")
      .max(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก")
      .regex(/^[0-9]+$/, "กรุณากรอกเฉพาะตัวเลขเท่านั้น"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const initialValue = {
    phoneNumber: "",
  };

  const submitTrueMoneyPayment = async (
    orderId: string,
    phoneNumber: string,
  ) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const response = await fetch(`/ticket/aquaverse/api/order/get?orderId=${orderId}&t=${timestamp}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data: orderResponse }: GetOrderResponse = await response.json();
    const responseData = orderResponse.payTrueMoney;

    const checksumResponse = await fetch(`/ticket/aquaverse/api/payment/true-money`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: responseData.amount,
        referenceNo: responseData.referenceNo,
        responseUrl: responseData.responseUrl,
        backgroundUrl: responseData.backgroundUrl,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { checksum } = await checksumResponse.json();

    // Create form element for redirect
    const formElement = document.createElement("form");
    formElement.id = "form-make-payment";
    formElement.method = "POST";
    formElement.action = `${env.NEXT_PUBLIC_GBP_URL}/v2/trueWallet`;

    const formFields = {
      publicKey: env.NEXT_PUBLIC_GBP_PUBLIC_KEY,
      amount: responseData.amount.toFixed(2),
      referenceNo: responseData.referenceNo,
      backgroundUrl: responseData.backgroundUrl,
      responseUrl: responseData.responseUrl,
      checksum: checksum,
      customerName: phoneNumber,
      customerEmail: phoneNumber,
      customerTelephone: phoneNumber,
      detail: responseData.detail,
      merchantDefined1: responseData.merchantDefined1,
      merchantDefined2: responseData.merchantDefined2,
      merchantDefined3: responseData.merchantDefined3,
    };

    // Create and append input fields
    Object.entries(formFields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value || "";
      formElement.appendChild(input);
    });

    // Append form to document body and submit
    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  const handleSubmit = async (orderId: string, formData: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await submitTrueMoneyPayment(orderId, formData.phoneNumber);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    formSchema,
    isLoading,
    error,
    handleSubmit,
  };
};
