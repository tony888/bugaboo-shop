import { Package } from "@/app/types/ticket";  
import { useState } from "react";

export function useTicketSelection(packages: Package[]) {
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [quantity, setQuantity] = useState<number | "custom">(1);
  const [customQuantity, setCustomQuantity] = useState<number>(1);

  const getActualQuantity = () => {
    return quantity === "custom" ? customQuantity : quantity;
  };

  const totalPrice = selectedPackage ? selectedPackage.price * getActualQuantity() : 0;

  const fetchTicketById = async (id: string) => {
    try {
      const response = await fetch(`/ticket/aquaverse/api/ticket/${id}`);
      const data = await response.json();
      if (response.ok) {
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to fetch ticket details');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    selectedPackage,
    setSelectedPackage,
    packages,
    quantity,
    setQuantity,
    customQuantity,
    setCustomQuantity,
    totalPrice,
    getActualQuantity,
    isTermsAccepted,
    setIsTermsAccepted,
    fetchTicketById,
  };
}