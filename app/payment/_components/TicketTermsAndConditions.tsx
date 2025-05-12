import { cn } from "@/lib/utils";
import DialogCondition from "@/components/DialogCondition";

export const TicketTermsAndConditions: React.FC<
  React.HTMLProps<HTMLDivElement>
> = (props) => {
  return (
    <div
      {...props}
      className={cn("text-sm text-gray-600 space-y-1", props.className)}
    >
      <DialogCondition/>
      {/* <p className="font-semibold">**เงื่อนไขการใช้บัตร**</p>
      <ol className="list-decimal list-inside space-y-1">
        <li>เด็กอายุต่ำกว่า 3 ปี เข้าฟรี</li>
        <li>เด็กอายุต่ำกว่า 12 ปี ต้องมีผู้ปกครองดูแล</li>
        <li>
        บัตรมีอายุการใช้งาน 90 วัน นับจากวันที่ซื้อ
        </li>
        <li>ไม่รวมกิจกรรม Surfing , Go-Kart และ Bumper Car</li>     
      </ol> */}
    </div>
  );
};
