import { useState } from "react";

export type PaymentMethod = {
  id: string;
  name: string;
  icons: {
    path: string;
    width: number;
    height: number;
  }[];
  enabled: boolean;
};

export enum supportedMethod {
  CREDIT_CARD = "credit-card",
  PROMPTPAY = "prompt-pay",
  TRUE_MONEY = "true-money",
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: supportedMethod.CREDIT_CARD,
    name: "บัตรเครดิต/เดบิต",
    icons: [
      {
        path: "/ticket/aquaverse/images/payment-methods/mastercard.png",
        width: 36,
        height: 36,
      },
      {
        path: "/ticket/aquaverse/images/payment-methods/visa.png",
        width: 36,
        height: 36,
      },
      {
        path: "/ticket/aquaverse/images/payment-methods/jcb.png",
        width: 36,
        height: 36,
      },
    ],
    enabled: true,
  },
  {
    id: supportedMethod.PROMPTPAY,
    name: "พร้อมเพย์",
    icons: [
      {
        path: "/ticket/aquaverse/images/payment-methods/promptpay.png",
        width: 48,
        height: 36,
      },
    ],
    enabled: true,
  },
  {
    id: supportedMethod.TRUE_MONEY,
    name: "ทรูมันนี่ วอลเล็ท",
    icons: [
      {
        path: "/ticket/aquaverse/images/payment-methods/truemoney.png",
        width: 36,
        height: 36,
      },
    ],
    enabled: true,
  },
];

export const usePaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );

  const selectPaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  return {
    selectedMethod,
    selectPaymentMethod,
    paymentMethods: paymentMethods.filter((p) => p.enabled),
    supportedMethod: supportedMethod,
  };
};
