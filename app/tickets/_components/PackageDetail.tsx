import { Package } from "@/app/types/ticket";
import { cn } from "@/lib/utils";

interface PackageDetailProp extends React.HTMLProps<HTMLDivElement> {
  packageDetail: Package;
}

export const PackageDetail: React.FC<PackageDetailProp> = ({
  packageDetail,
  ...props
}) => {
  return (
    <div {...props} className={cn("space-y-6 bg-white", props.className)}>
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-blue-900">
          {packageDetail.name}
        </h1>
        <h2 className="text-xl text-blue-800">
          [E-Voucher] Spectacular summer deal - แพ็กเกจบัตร 4 ใบ
        </h2>
        <p className="text-lg font-semibold text-green-600">
          รับฟรี เครดิตค่าอาหาร มูลค่า 600 บาท
        </p>
      </div>

      {/* Package Contents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          สินค้าในแพ็กเกจ:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            บัตรเข้าสวนสนุกและเล่นสวนน้ำโคลัมเบีย พิคเจอร์ส อควาเวิร์สรายวัน 4
            ใบ
          </li>
          <li>เครดิตสำหรับอาหารและเครื่องดื่ม 400 บาท</li>
        </ul>
        <p className="text-gray-600">
          ใช้ได้ทั้งเด็ก/ผู้ใหญ่/ผู้สูงอายุ อายุตั้งแต่ 3 ปีเป็นต้นไป
        </p>
        <p className="font-medium text-blue-700">
          บัตรใช้งานได้ถึง: (บัตรมีอายุการใช้งาน 90 วัน
          นับจากวันที่ทำการสั่งซื้อ)
        </p>
      </div>

      {/* Package Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          รายละเอียดในแพคเก็จ:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>บัตรนี้ไม่รวมล็อคเกอร์</li>
          <li>บัตรนี้ไม่รวม โกคาร์ท และ Bumper Car</li>
          <li>บัตรนี้ไม่รวมกิจกรรมเซิร์ฟ - Not Include Surf</li>
          <li className="font-medium">
            บัตรนี้รวมเงินเครดิตสำหรับซื้ออาหารและเครื่องดื่ม จำนวน 400 บาท
            <span className="text-red-600">
              [ประเภทไม่สามารถคืนเงินได้กรณีเหลือ]
            </span>
          </li>
          <li>บัตรนี้สามารถชมการแสดงในสวนสนุกได้ทั้งหมด</li>
          <li>บัตรนี้สามารถชมภาพยนตร์ในสระคลื่นยักษ์ได้</li>
        </ul>
      </div>

      {/* Important Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">ข้อควรทราบ:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            เด็กอายุต่ำกว่า 15 ปี
            ต้องอยู่ภายใต้การดูแลของผู้ปกครองและไม่สามารถเข้าใช้บริการสวนน้ำโดยลำพังได้
          </li>
          <li>เด็กอายุต่ำกว่า 3 ปี เข้าฟรี</li>
        </ul>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          เงื่อนไขและข้อตกลง:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            e-voucher โปรโมชั่นนี้สามารถนำมาแลกสิทธิ์ใช้บริการที่สวนสนุกได้
          </li>
          <li>
            e-voucher แพ็กเกจที่ชำระเงินพร้อมกันใน 1
            คำสั่งซื้อจะต้องใช้ภายในวันเดียวกันเท่านั้น
          </li>
          <li>เวลาทำการ: 10:00 – 18:00 น. (ยกเว้นวันพุธ สวนน้ำปิดให้บริการ)</li>
          <li>e-voucher จัดส่งทางอีเมล์ภายใน 12 ชั่วโมงหลังการสั่งซื้อ</li>
          <li className="text-red-600">
            e-voucher ไม่สามารถยกเลิกหรือขอคืนเงินได้ทุกกรณี (non-refundable)
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          สอบถามเพิ่มเติมได้ที่:{" "}
          <a
            href="https://www.facebook.com/columbiapicturesaquaverse"
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook: Columbia Pictures Aquaverse
          </a>
        </p>
      </div>
    </div>
  );
};
