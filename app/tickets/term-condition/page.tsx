import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventPoster } from "@/components/EventPoster";
import AppLayout from "@/components/AppLayout";
import Image from "next/image";

export default function LandingPage() {
  return (
    <AppLayout>
      <div className="max-w-8xl mx-auto">
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">
              เงื่อนไขและข้อตกลง
              </h3>
              <p className="text-left mb-4">
              เงื่อนไขและข้อตกลงในการซื้อตั๋ว AQUAVERSE PACKAGE
              </p>
              <div className="text-left space-y-2">
                <div>
                  <span className="font-bold">1. เงื่อนไขการซื้อบัตร</span>
                  <p>* ราคานี้ยังไม่รวมภาษีมูลค่าเพิ่ม</p>
                  <p>* เฉพาะคนไทยและต่างชาติที่ได้รับใบอนุญาตอาศัยในประเทศไทย</p>
                 
                </div>
                <div>
                  <span className="font-bold">2. เงื่อนไขการใช้บัตร</span>
                  <p>* เด็กอายุต่ำกว่า 3 ปี เข้าฟรี</p>
                  <p>* เด็กอายุต่ำกว่า 12 ปี ต้องมีผู้ปกครองดูแล</p>
                  <p>* บัตรมีอายุการใช้งาน 90 วัน นับจากวันที่ซื้อ</p>
                  {/* <p>* ไม่รวมกิจกรรม Surfing , Go-Kart และ Bumper Car</p> */}
                  <p>* โปรโมชันสำหรับออนไลน์เท่านั้น</p>
                  <p>* บัตรที่ชำระเงินในใบเสร็จเดียวกันต้องนำมาใช้งานในวันเดียวกัน ไม่สามารถแยกใช้งานวันอื่นได้</p>
                  <p>* บัตรที่ชำระเงินแล้วไม่สามารถขอคืนเงิน หรือแลกเปลี่ยนเป็นเงิน หรือเปลี่ยนเป็นโปรโมชันอื่นๆได้</p>
                  <p>* ทางผู้จำหน่ายไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจาก ความผิดพลาดของผู้ใช้ จากการเผยแพร่ บัตรปลอม การสูญหาย <br/>หรือการซื้อบัตรจากช่องทางอื่นๆ</p>
                  <p>* บริษัทขอสงวนสิทธิ์ในการยกเลิกและเปลี่ยนแปลงเงื่อนไขข้อกำหนดต่างๆ โดยมิต้องแจ้งให้ทราบล่วงหน้า</p>
                  <p>* ไม่อนุญาตให้นำบัตรไปจำหน่ายต่อโดยเด็ดขาด</p>
                  <p>* บัตรทั้งหมดที่ซื้อทางออนไลน์ต้องซื้ออย่างน้อย 24 ชั่วโมงก่อนวันที่เข้าใช้บริการ จะไม่มีการยกเว้นใดๆ <br/>สวนน้ำเปิด 10:00-18:00 น.(เปิดทุกวัน ยกเว้นวันพุธ)
                  </p>
                  <p>* โปรดจองคาบาน่าล่วงหน้าอย่างน้อย 3 วันก่อนวันที่เข้าใช้บริการโดยส่งอีเมลแจ้งที่ <a href="mailto:reservations@columbiapicturesaquaverse.com" >reservations@columbiapicturesaquaverse.com</a></p>
                  
                </div>
                <div>
                  <span className="font-bold">3. การติดต่อและสอบถาม</span>
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
