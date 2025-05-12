"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DialogTerm() {
    const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
     <div className="grid gap-1.5 leading-none">
     <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    ยอมรับเงื่อนไขและข้อตกลง &nbsp;
        <Dialog.Trigger asChild>
          <span className="text-primary underline cursor-pointer hover:text-primary/80">
          อ่านเพิ่มเติม
          </span>
        </Dialog.Trigger>
        </label>
      </div>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-xl p-4 md:p-6 w-[95vw] md:w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto z-50">
          <Dialog.Title className="font-bold text-lg md:text-2xl mb-4 text-primary">เงื่อนไขในการซื้อบัตรและใช้บัตร</Dialog.Title>
          
          <div className="text-left space-y-4 text-sm md:text-base">
              <p className="text-left mb-4">
                โปรดอ่านเงื่อนไขและข้อตกลงก่อนทำการซื้อบัตร AQUAVERSE PACKAGE
              </p>
              <div className="text-left space-y-2">
                <div>
                  <span className="font-bold">1. เงื่อนไขการซื้อบัตร</span>
                  <p>* ราคานี้ยังไม่รวมภาษีมูลค่าเพิ่ม</p>
                  <p>* เฉพาะคนไทยและต่างชาติที่ได้รับใบอนุญาตอาศัยในประเทศไทย</p>
                </div>
                <div>
                  <span className="font-bold">2. เงื่อนไขการใช้บัตร</span>
                  <p>* เด็กอายุต่ำกว่า 3 ปี เข้าฟร</p>
                  <p>* เด็กอายุต่ำกว่า 12 ปี ต้องมีผู้ปกครองดูแล</p>
                  <p>* บัตรมีอายุการใช้งาน 90 วัน นับจากวันที่ซื้อ</p>
                  {/* <p>* ไม่รวมกิจกรรม Surfing , Go-Kart และ Bumper Car</p> */}
                  <p>* โปรโมชั่นสำหรับออนไลน์เท่านั้น</p>
                  <p>* บัตรที่ชำระเงินในใบเสร็จเดียวกันต้องนำมาใช้งานในวันเดียวกัน ไม่สามารถแยกใช้งานวันอื่นได้</p>
                  <p>* บัตรที่ชำระเงินแล้วไม่สามารถขอคืนเงิน หรือแลกเปลี่ยนเป็นเงิน หรือเปลี่ยนเป็นโปรโมชั่นอื่นๆได้</p>
                  <p>* ทางผู้จำหน่ายไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจาก ความผิดพลาดของผู้ใช้ จากการเผยแพร่ บัตรปลอม การสูญหาย หรือการซื้อบัตรจากช่องทางอื่นๆ</p>
                  <p>* บริษัทขอสงวนสิทธิ์ในการยกเลิกและเปลี่ยนแปลงเงื่อนไขข้อกำหนดต่างๆ โดยมิต้องแจ้งให้ทราบล่วงหน้า</p>
                  <p>* ไม่อนุญาตให้นำบัตรไปจำหน่ายต่อโดยเด็ดขาด</p>
                  <p>* บัตรทั้งหมดที่ซื้อทางออนไลน์ต้องซื้ออย่างน้อย 24 ชั่วโมงก่อนวันที่เข้าใช้บริการ จะไม่มีการยกเว้นใดๆ สวนน้ำเปิด 10:00-18:00 น.(เปิดทุกวัน ยกเว้นวันพุธ)
                  </p>
                  <p>* โปรดจองคาบาน่าล่วงหน้าอย่างน้อย 3 วันก่อนวันที่เข้าใช้บริการโดยส่งอีเมลแจ้งที่ <a href="mailto:reservations@columbiapicturesaquaverse.com" >reservations@columbiapicturesaquaverse.com</a></p>
                  
          
                </div>
                <div>
                  <span className="font-bold">3. เงื่อนไขการเปลี่ยนแปลง / ยกเลิก / คืนเงิน</span>
                  <p>* บัตรที่ซื้อแล้วไม่สามารถเปลี่ยนชื่อผู้ใช้ หรือโอนสิทธิ์ให้ผู้อื่นได้
                  </p>
                  <p>* กรณีมีเหตุสุดวิสัย บริษัทฯ อาจพิจารณาเลื่อนวันหรือออกบัตรใหม่ให้ตามความเหมาะสม
                  </p>
                </div>
                <div>
                  <span className="font-bold">4. ข้อจำกัดความรับผิดชอบ</span>
                  <p>*บริษัทฯ ไม่รับผิดชอบในกรณีที่บัตรสูญหาย อันเกิดจากการให้ข้อมูลของผู้ซื้อที่ไม่ถูกต้อง
                  </p>
                  <p>* ผู้ซื้อบัตรต้องปฏิบัติตามกฎความปลอดภัยของสวนน้ำอย่างเคร่งครัด
                  ่</p>
                  <p>* บริษัทฯ สงวนสิทธิ์ในการเปลี่ยนแปลงรายละเอียด โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                  </p>
                  <p>
                  ไม่อนุญาตให้นำบัตรไปจำหน่ายต่อโดยเด็ดขาด
                  </p>
                </div>
                <div>
                  <span className="font-bold">5. การติดต่อและสอบถาม</span>
                  <p> หากมีข้อสงสัยเกี่ยวกับการซื้อหรือใช้งานบัตร สามารถติดต่อฝ่ายบริการลูกค้าได้ที่</p>
                  <p> 📧 Email: <a href="mailto:info@columbiapicturesaquaverse.com">info@columbiapicturesaquaverse.com</a></p>
                  <p> 📞 Call Center: 033-004-999</p>
                  <p>  📌 LINE:@aquaverse
                  </p>
                  
                </div>
          
                <p className="text-left">
                  📌 ขอขอบคุณที่เลือกใช้บริการของเรา 🎟️✨
                </p>
              </div>
          </div>
          
          <div className="mt-6 bottom-0 bg-white pt-2">
            <Dialog.Close asChild>
              {/* <Button className="w-full py-3 md:py-4 text-base md:text-lg">ปิด</Button> */}
              <Button className="w-full py-3 sm:py-4 text-base sm:text-lg transition-all hover:scale-[0.98]">ปิด</Button>
            </Dialog.Close>
          </div>
          
          <Dialog.Close className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
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