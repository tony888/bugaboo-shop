import { env } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useGBPrimepayCardForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    cardName: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล").max(100),
    cardNumber: z.string().min(16, "กรุณากรอกหมายเลขบัตรให้ครบถ้วน"),
    expiry: z.string().min(5, "กรุณากรอกวันหมดอายุ"),
    cvv: z.string().min(3, "กรุณากรอกรหัส CVV"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const initialValue = {
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  };

  const gbpPublicKey = env.NEXT_PUBLIC_GBP_PUBLIC_KEY;

  const request3DSecure = async (gbpReferenceNo: string) => {
    // Create form element
    const formElement = document.createElement("form");
    formElement.id = "redirect3ds";
    formElement.method = "post";
    formElement.action = `${env.NEXT_PUBLIC_GBP_URL}/v2/tokens/3d_secured`;
    formElement.enctype = "application/x-www-form-urlencoded";

    // Create publicKey input
    const publicKeyInput = document.createElement("input");
    publicKeyInput.type = "hidden";
    publicKeyInput.name = "publicKey";
    publicKeyInput.value = gbpPublicKey; // Add your public key here

    // Create gbpReferenceNo input
    const referenceInput = document.createElement("input");
    referenceInput.type = "hidden";
    referenceInput.name = "gbpReferenceNo";
    referenceInput.value = gbpReferenceNo; // Add your reference number here

    // Append inputs to form
    formElement.appendChild(publicKeyInput);
    formElement.appendChild(referenceInput);

    // Append form to document body
    document.body.appendChild(formElement);

    // Submit the form
    formElement.submit();

    // Clean up - remove form from DOM after submission
    document.body.removeChild(formElement);
  };

  const submit = async (orderId: string, form: z.infer<typeof formSchema>) => {
    form.cardNumber = form.cardNumber.replace(/\D/g, "");
    form.cardName = form.cardName.toUpperCase();

    const [expirationMonth, expirationYear] = form.expiry.split("/");
    try {
      const paymentResponse = await fetch("/ticket/aquaverse/api/payment/credit-card", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          card: {
            number: form.cardNumber,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            securityCode: form.cvv,
            name: form.cardName,
          },
        }),
      });
      const chargeResponse = await paymentResponse.json();
      await request3DSecure(chargeResponse.data.gbpReferenceNo);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  const handleSubmit = async (orderId: string, formData: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      await submit(orderId, formData);
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
