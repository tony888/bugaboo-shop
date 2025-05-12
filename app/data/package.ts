import { PackageDetail } from "../tickets/_components/PackageDetail";
import { Package } from "../types/ticket";

export const PACKAGES: Package[] = [
  {
    key: "bundle",
    label: "Bundle Package 2,980 บาท 2 ท่าน",
    price: 2980,
    description: "รับฟรี เครดิตค่าอาหาร มูลค่า 600 บาท",
    term: {
      label: "อ่านเงื่อนไขเพิ่มเติม",
      link: "#",
      type: "popup",
      description: PackageDetail,
    },
  },
  {
    key: "family",
    label: "Family Package 5,960 บาท 4 ท่าน",
    price: 5960,
    description: "รับฟรี เครดิตค่าอาหาร มูลค่า 600 บาท",
    term: {
      label: "อ่านเงื่อนไขเพิ่มเติม",
      link: "#",
      type: "popup",
      description: PackageDetail,
    },
  },
];
