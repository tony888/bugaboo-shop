export interface Package {
  id: number;
  name: string;
  thumbnail: string;
  start_on: string;
  end_on: string;
  price: number;
  special_price: number;
  status: string;
  description?: string;
}

export interface TicketState {
  // Package Selection
  packages: Package[];
  selectedPackage: Package | null;
  quantity: number | "custom";
  customQuantity: number;
  actualQuantity: number;
  totalPrice: number;
  isTermsAccepted: boolean;

  // Order
  orderNo: string;

  // Customer Information
  email: string;

  // Payment
  paymentMethod: "credit_card" | "prompt_pay" | "true_money" | null;

  // Actions
  setPackages: (pkgs: Package[]) => void;
  setSelectedPackage: (pkg: Package) => void;
  setQuantity: (qty: number | "custom") => void;
  setCustomQuantity: (qty: number) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setEmail: (email: string) => void;
  setPaymentMethod: (method: TicketState["paymentMethod"]) => void;
  setOrderNo: (orderNo: string) => void;
  calculateTotal: () => void;
  resetState: () => void;
}
