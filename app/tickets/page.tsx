"use client";

import { useTicketStore } from "@/app/stores/useTicketStore";
import AppLayout from "@/components/AppLayout";
import { EventPoster } from "@/components/EventPoster";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useBugabooShop from "../hooks/useBugabooShop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DOMPurify from "dompurify";
import PackageTable from "./_components/PackageTable";
import DialogTerm from "@/components/DialogTerm";
import Image from "next/image";

export default function TicketSellingPage() {
  const router = useRouter();
  const {
    setPackages,
    selectedPackage,
    setSelectedPackage,
    quantity,
    setQuantity,
    customQuantity,
    setCustomQuantity,
    totalPrice,
    isTermsAccepted,
    setTermsAccepted,
    resetState,
  } = useTicketStore();
  const { listTickets, tickets, getTicketDetail } = useBugabooShop();
  const [error, setError] = useState("");
  const [ticketTerm, setTicketTerm] = useState("");
  const [ticketQuantities, setTicketQuantities] = useState<{[ticketId: number]: number}>({});
  const [ticketErrors, setTicketErrors] = useState<{[ticketId: number]: string}>({});

  useEffect(() => {
    resetState();
    localStorage.removeItem("order");

    listTickets().then((packages) => {
      setPackages(packages);
      // Initialize quantities for each ticket
      const initialQuantities: {[ticketId: number]: number} = {};
      packages.forEach(p => {
        initialQuantities[p.id] = 1;
      });
      setTicketQuantities(initialQuantities);
    });
  }, []);

  useEffect(() => {
    if (quantity === "custom" && (customQuantity < 1 || customQuantity > 100)) {
      setError("กรุณาเลือกจำนวนตั้งแต่ 1 ถึง 100");
    } else {
      setError("");
    }
  }, [quantity, customQuantity]);

  const handleConfirm = () => {
    if (!selectedPackage) return;
    router.push(`/payment`);
  };

  const getTicketTerm = async (id: string) => {
    const ticket = await getTicketDetail(id);
    setTicketTerm(ticket.description);
  };

  const handleTicketSelection = (ticket: any) => {
    // If selecting the same ticket, do nothing
    if (selectedPackage?.id === ticket.id) return;
    
    // Set the new selected package
    setSelectedPackage(ticket);
    
    // Set the quantity for the store based on the quantity in our local state
    setQuantity(ticketQuantities[ticket.id] || 1);
  };

  const handleQuantityChange = (ticketId: number, value: string) => {
    const newQuantities = { ...ticketQuantities };
    const numValue = parseInt(value, 10);
    
    // Validate the quantity
    if (numValue < 1 || numValue > 100) {
      setTicketErrors({
        ...ticketErrors,
        [ticketId]: "กรุณาเลือกจำนวนตั้งแต่ 1 ถึง 100"
      });
    } else {
      const newErrors = { ...ticketErrors };
      delete newErrors[ticketId];
      setTicketErrors(newErrors);
    }
    
    newQuantities[ticketId] = numValue;
    setTicketQuantities(newQuantities);
    
    // Update the main quantity state if this is the selected ticket
    if (selectedPackage?.id === ticketId) {
      setQuantity(numValue);
    }
  };

  const isConfirmDisabled = !selectedPackage || Object.keys(ticketErrors).length > 0 || !isTermsAccepted;
  const posters = ["https://static.bugaboo.tv/aquaverse/promote-poster.jpg"];

  return (
    <AppLayout showCoverImage={false}>
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-5 items-center">
           <div className="col-span-5  colspace-y-4">
            <div className="bg-white shadow-md rounded-lg px-3 py-8">
              <div className="mb-6 text-center">  
                  <h3 className="text-4xl font-bold mb-6 text-primary">
                    ซื้อบัตร AQUAVERSE  วันนี้!
                  </h3>
                  </div>
              {/* Create a 2-column grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* First column: Promotional content */}
                <div className="text-center flex flex-col justify-center">
                  
                  <div className="flex px-4 gap-4 justify-center mb-8">
                    <Image
                      src={"/ticket/aquaverse/images/free-icon.png"}
                      alt="free-icon"
                      width={64}
                      height={64}
                      className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] object-contain"
                    ></Image>
                    <div className="text-[#EE008C] space-y-1">
                      <div className="text-2xl sm:text-1xl mb-3 font-thin">
                      คูปองอาหารและเครื่องดื่ม
                      </div>
                      <div className="text-4xl font-bold mb-2">มูลค่าสูงสุด 1,000 บาท</div>
                      <div className="text-base font-thin">เฉพาะ (Package) ที่ร่วมรายการ</div>
                      
                    </div>
                  </div>
                  <div className="text-xl font-thin mb-8 text-primary space-y-3">
                    <div className="mb-2">
                    เพลิดเพลินกับกิจกรรมสวนน้ำ พร้อมรับสิทธิพิเศษที่คุ้มค่าที่สุด
                    </div>
                    <div className="text-2xl font-semibold mb-2">ในราคาเริ่มต้นเพียง 999 บาท!</div>
                    <p className="text-base font-thin pt-1">(ไม่รวมภาษีมูลค่าเพิ่ม 7%)</p>
                  </div>
                </div>
                
                {/* Second column: Ticket selection */}
                <div className="grid grid-rows-1 gap-4 mb-6 bg-blue-50 px-3 py-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    เลือกบัตร
                  </h3>
                  {tickets.map((p,index) => {
                    return (
                      <div 
                        key={p.id}
                        className="py-1.5 border-b border-[#ebebeb] flex flex-col sm:flex-row justify-start items-start gap-2 md:gap-3"
                      >
                        <div
                          className={`w-full flex justify-between items-start py-0 px-0 rounded-lg cursor-pointer gap-4`}
                          onClick={() => handleTicketSelection(p)}
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className={cn(
                                "inline-block w-4 h-4 rounded-full border-2 border-black shrink-0",
                                selectedPackage?.id === p.id ? "bg-black" : "",
                              )}
                            ></span>
                            <div className="flex-1 min-w-0 inline-flex flex-col justify-center items-start gap-1.5">
                                <p className="font-bold text-lg text-primary">
                                  {p.name}
                                </p>
                                <span className="text-sm font-thin"> (ปกติ {p.price.toLocaleString('th-TH',{
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })} บาท) </span>
                                <div className="xl:flex">
                                    {p.id === 4 && (
                                      <span className="text-sm text-red-500 mr-4">
                                        ฟรีคูปองอาหารและเครื่องดื่ม 500 บาท
                                      </span>
                                    )}
                                    {p.id === 2 && (
                                      <span className="text-sm text-red-500 mr-4">
                                        ฟรีคูปองอาหารและเครื่องดื่ม 1,000 บาท
                                      </span>
                                    )}
                                    {p.id === 5 && (
                                      <span className="text-sm text-red-500 mr-4">
                                        บัตรมีจำนวนจำกัด
                                      </span>
                                    )}
                                  <div className="flex text-sm font-thin text-primary gap-2 flex-wrap">
                                    ราคารวม Vat {p.special_price.toLocaleString('th-TH',{
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} บาท
                                  </div>
                                </div>
                          </div>
                          </div>          
                          <div className="w-[48px] md:w-[64px] lg:w-[96px] shrink-0 flex-none">
                            <Select
                              value={ticketQuantities[p.id]?.toString() || "1"}
                              onValueChange={(value) => handleQuantityChange(p.id, value)}
                              disabled={selectedPackage?.id !== p.id}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="จำนวน" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                                  <SelectItem key={num} value={`${num}`}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {ticketErrors[p.id] && (
                              <p className="text-red-500 text-xs mt-1">{ticketErrors[p.id]}</p>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                    <p className="text-xs mt-1">* หมายเหตุ : เลือกซื้อได้ครั้งละ 1 แพ็กเกจ (สามารถเลือกได้สูงสุดไม่เกิน 20 ใบ/ครั้ง/แพ็กเกจ)</p>
              
                </div>
              </div>

              <div className="overflow-x-auto xl:overflow-x-visiblepo">
                <PackageTable/>
              </div>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <div className="items-top flex space-x-2 my-4">
                <Checkbox
                  id="terms1"
                  checked={isTermsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                />
                {/* <DialogTerm/> */}
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    ยอมรับเงื่อนไขและข้อตกลง &nbsp;
                    <Link
                      href={"/tickets/term-condition"}
                      className="text-sm  underline text-blue-500 hover:text-blue-600"
                    >
                      อ่านเพิ่มเติม
                    </Link>
                  </label>
                </div>
              </div>

              <p className="text-xl font-bold mb-4 text-primary">
                รวม:{" "}
                {isNaN(totalPrice) || totalPrice < 1
                  ? 0
                  : totalPrice.toLocaleString('th-TH',{
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                  })}{" "}
                บาท
              </p>
              <Button
                className="w-full bg-primary text-lg p-6 hover:bg-primary/80"
                disabled={isConfirmDisabled}
                onClick={handleConfirm}
              >
                ยืนยัน
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
