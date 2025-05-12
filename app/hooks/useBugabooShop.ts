import { useState } from "react";

interface TicketItem {
  event: string;
  type: string;
  id: number;
  thumbnail: string;
  name: string;
  price: number;
  full_price: number;
  amount: number;
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  data?: {
    orderID: string;
  };
}

interface TicketListResponse {
  status: {
    code: number;
    message: string;
  };
  data: {
    id: number;
    name: string;
    thumbnail: string;
    start_on: string;
    end_on: string;
    special_price: number;
    price: number;
    status: string;
  }[];
}

interface TicketDetailResponse {
  data: {
    status: {
      code: number;
      message: string;
    };
    data: {
      id: number;
      name: string;
      description: string;
      thumbnail: string;
      price: number;
      full_price: number;
      vdo: string;
      start_on: string;
      end_on: string;
      remain_stock: number;
      total_favorite: number;
      meta_title: string;
      meta_keyword: string;
      meta_description: string;
      created_on: string;
      gallery: {
        order_on: number;
        image: string;
        description: string;
      }[];
      tags: {
        order_on: number;
        tags: string;
      }[];
    };
  };
}

const useBugabooShop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<TicketListResponse["data"]>([]);

  const createOrder = async (
    email: string,
    tickets: TicketItem[],
  ): Promise<CheckoutResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/ticket/aquaverse/api/order/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, tickets }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const listTickets = async (): Promise<TicketListResponse["data"]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/ticket/aquaverse/api/ticket/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: TicketListResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      if (data.status.code !== 200) {
        throw new Error(data.status.message || "Failed to fetch tickets");
      }

      setTickets(data.data);
      return data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getTicketDetail = async (
    id: string,
  ): Promise<TicketDetailResponse["data"]["data"]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/ticket/aquaverse/api/ticket/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data }: TicketDetailResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch ticket details");
      }

      if (data.status.code !== 200) {
        throw new Error(
          data.status.message || "Failed to fetch ticket details",
        );
      }

      return data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    listTickets,
    getTicketDetail,
    tickets,
    isLoading,
    error,
  };
};

export default useBugabooShop;
