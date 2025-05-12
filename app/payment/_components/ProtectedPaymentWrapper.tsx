"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useTicketStore } from "@/app/stores/useTicketStore";
import { Package } from "@/app/types/ticket";

interface Order {
  email: string;
  package: Package;
}

export default function ProtectedPaymentWrapper({
  children,
  enableRestore = true, // Add prop with default value
}: {
  children: React.ReactNode;
  enableRestore?: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { selectedPackage, setSelectedPackage, email, setEmail } =
    useTicketStore();
  const { toast } = useToast();

  useEffect(() => {
    // First check if we already have a selected package in the store
    if (selectedPackage) {
      const order: Order = {
        email: email,
        package: selectedPackage,
      };
      localStorage.setItem("order", JSON.stringify(order));
      setIsLoading(false);
      return;
    }

    // If no package in store, try to load from localStorage
    if (enableRestore) {
      const savedPackage = localStorage.getItem("order");
      if (savedPackage) {
        try {
          const parsedOrder: Order = JSON.parse(savedPackage);
          setSelectedPackage(parsedOrder.package);
          setEmail(parsedOrder.email);
          setIsLoading(false);
        } catch (error) {
          console.error("Error parsing saved order:", error);
          localStorage.removeItem("order");
          handleNoOrder();
        }
      } else {
        handleNoOrder();
      }
    } else {
      // If restore is disabled, clear localStorage and redirect
      localStorage.removeItem("order");
      handleNoOrder();
    }
  }, [selectedPackage, enableRestore]);

  const handleNoOrder = () => {
    setIsLoading(false);
    toast({
      description: "Please select a package first",
    });
    router.push("/tickets");
  };

  if (isLoading || !selectedPackage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
