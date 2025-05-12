import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventPoster } from "@/components/EventPoster";
import AppLayout from "@/components/AppLayout";
import Image from "next/image";
import DialogCondition from "@/components/DialogCondition";

export default function LandingPage() {
  const posters = ["https://static.bugaboo.tv/aquaverse/promote-poster.jpg"];

  return (
    <AppLayout>
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-5 max-sm:grid-cols-1 gap-6 items-center">
          <div className="col-span-3 lg:col-span-2">
          <EventPoster images={posters} />
          </div>
          <div className="col-span-3 lg:col-span-3 max-sm:grid-cols-1 space-y-4">
            <div className="bg-white shadow-md rounded-lg p-8 md:p-20 lg:p-10 xl:p-26 text-center">
              <h3 className="text-4xl font-bold mb-6 text-primary">
                ซื้อบัตร AQUAVERSE  วันนี้!
              </h3>
              <div className="flex px-4 gap-4 justify-center mb-6">
                <Image
                  src={"/ticket/aquaverse/images/free-icon.png"}
                  alt="free-icon"
                  width={64}
                  height={64}
                  className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] object-contain"
                ></Image>
                <div className="text-[#EE008C]">
                  <div className="text-2xl sm:text-1xl mb-2 font-thin">
                  คูปองอาหารและเครื่องดื่ม
                  </div>
                  <div className="text-4xl font-bold">มูลค่าสูงสุด 1,000 บาท</div>
                  <div className="text-base font-thin">เฉพาะ (Package) ที่ร่วมรายการ</div>
                  
                </div>
              </div>
              <div className="text-xl font-thin mb-6 text-primary">
                <div>
                เพลิดเพลินกับกิจกรรมสวนน้ำ พร้อมรับสิทธิพิเศษที่คุ้มค่าที่สุด
                </div>
                <div className="text-2xl font-semibold">ในราคาเริ่มต้นเพียง 999 บาท!</div>
                <p className="text-base font-thin">(ไม่รวมภาษีมูลค่าเพิ่ม 7%)</p>
              </div>

              <Link href="/tickets" className="block">
                <Button className="w-full py-6 text-lg">
                  สั่งซื้อบัตรสวนน้ำที่นี่{" "}
                </Button>
              </Link>
              <DialogCondition />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
