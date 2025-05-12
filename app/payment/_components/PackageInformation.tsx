import { cn } from "@/lib/utils";
import Image from "next/image";

interface PackageInfoProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  price: string;
}
const poster = 'https://static.bugaboo.tv/aquaverse/promote-poster.jpg';
export const PackageInformation: React.FC<PackageInfoProps> = ({
  name,
  price,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center space-x-6 justify-between mb-4 md:flex-nowrap flex-wrap",
        props.className,
      )}
    >
      <div className="flex items-center space-x-4">
        <Image
          src={poster}
          alt="Bundle Package"
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div className="text-wrap">
          <h3 className="font-semibold text-primary">{name}</h3>
          <p className="whitespace-pre-line text-wrap text-primary">
            เพลิดเพลินกับกิจกรรมสวนน้ำ พร้อมรับสิทธิพิเศษที่คุ้มค่าที่สุด
          </p>
        </div>
      </div>
      <p className="text-2xl font-bold text-nowrap my-4">
        {price}
        <span className="font-thin text-lg ml-2">บาท</span>
      </p>
    </div>
  );
};
