"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DialogCondition() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="text-center mt-8 sm:mt-6">
        โปรดอ่านเงื่อนไขในการซื้อบัตรและใช้บัตร{" "}
        <Dialog.Trigger asChild>
          <span className="text-primary underline cursor-pointer hover:text-primary/80 transition-colors">
            คลิกที่นี่
          </span>
        </Dialog.Trigger>
      </div>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-8 max-w-[95%] sm:max-w-xl md:max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto z-50">
          <Dialog.Title className="font-bold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">เงื่อนไขในการซื้อบัตรและใช้บัตร</Dialog.Title>
          
          <div className="text-left space-y-4 sm:space-y-6">
            <h4 className="font-semibold text-base sm:text-lg">📌 เงื่อนไขการซื้อบัตร</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>ราคานี้ยังไม่รวมภาษีมูลค่าเพิ่ม</li>
              <li>เฉพาะคนไทยและต่างชาติที่ได้รับใบอนุญาตอาศัยในประเทศไทย</li>
            </ul>

            <h4 className="font-semibold text-base sm:text-lg">📌 เงื่อนไขการใช้บัตร</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>เด็กอายุต่ำกว่า 3 ปี เข้าฟรี</li>
              <li>เด็กอายุต่ำกว่า 12 ปี ต้องมีผู้ปกครองดูแล</li>
              <li>บัตรมีอายุการใช้งาน 90 วัน นับจากวันที่ซื้อ</li>
              {/* <li>ไม่รวมกิจกรรม Surfing, Go-Kart และ Bumper Car</li> */}
              <li>โปรโมชั่นสำหรับออนไลน์เท่านั้น</li>
              <li>บัตรที่ชำระเงินในใบเสร็จเดียวกันต้องนำมาใช้งานในวันเดียวกัน ไม่สามารถแยกใช้งานวันอื่นได้</li>
              <li>บัตรที่ชำระเงินแล้วไม่สามารถขอคืนเงิน หรือแลกเปลี่ยนเป็นเงิน หรือเปลี่ยนเป็นโปรโมชั่นอื่นๆได้</li>
              <li>ทางผู้จำหน่ายไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจากความผิดพลาดของผู้ใช้ จากการเผยแพร่ บัตรปลอม การสูญหาย หรือการซื้อบัตรจากช่องทางอื่นๆ</li>
              <li>บริษัทขอสงวนสิทธิ์ในการยกเลิกและเปลี่ยนแปลงเงื่อนไขข้อกำหนดต่างๆ โดยมิต้องแจ้งให้ทราบล่วงหน้า</li>
              <li>ไม่อนุญาตให้นำบัตรไปจำหน่ายต่อโดยเด็ดขาด</li>
              <li> บัตรทั้งหมดที่ซื้อทางออนไลน์ต้องซื้ออย่างน้อย 24 ชั่วโมงก่อนวันที่เข้าใช้บริการ จะไม่มีการยกเว้นใดๆ สวนน้ำเปิด 10.00-18.00 น. (เปิดทุกวัน ยกเว้นวันพุธ)
              </li>
              <li>โปรดจองคาบาน่าล่วงหน้าอย่างน้อย 3 วันก่อนวันที่เข้าใช้บริการโดยส่งอีเมลแจ้งที่ <a href="mailto:reservations@columbiapicturesaquaverse.com" >reservations@columbiapicturesaquaverse.com</a></li>
            </ul>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <Dialog.Close asChild>
              <Button className="w-full py-3 sm:py-4 text-base sm:text-lg transition-all hover:scale-[0.98]">ปิด</Button>
            </Dialog.Close>
          </div>
          
          <Dialog.Close className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}