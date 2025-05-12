import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TicketState } from "../types/ticket";

const initialState = {
  packages: [],
  selectedPackage: null,
  quantity: 1,
  customQuantity: 1,
  actualQuantity: 0,
  totalPrice: 0,
  isTermsAccepted: false,
  email: "",
  paymentMethod: null,
  orderNo: "",
};

export const useTicketStore = create<TicketState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPackages: (pkgs) => set({ packages: pkgs }),

      setSelectedPackage: (pkg) => {
        set({ selectedPackage: pkg });
        get().calculateTotal();
      },

      setQuantity: (qty) => {
        set({ quantity: qty });
        get().calculateTotal();
      },

      setCustomQuantity: (qty) => {
        set({ customQuantity: qty });
        get().calculateTotal();
      },

      setTermsAccepted: (accepted) => set({ isTermsAccepted: accepted }),

      setEmail: (email) => set({ email }),

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      setOrderNo: (orderNo) => set({ orderNo: orderNo }),

      calculateTotal: () => {
        const { selectedPackage, quantity, customQuantity } = get();
        if (!selectedPackage) return;

        const actualQuantity =
          quantity === "custom" ? customQuantity : quantity;
        const total = selectedPackage.special_price * actualQuantity;
        set({
          totalPrice: total,
          actualQuantity: actualQuantity,
        });
      },

      resetState: () => set(initialState),
    }),
    {
      name: "ticket-storage",
    },
  ),
);
