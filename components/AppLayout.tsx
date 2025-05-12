import { cn } from "@/lib/utils";
import Image from "next/image";
import NavBar, { MenuItem } from "./NavBar";
import { Toaster } from "./ui/toaster";
import styles from './AppLayout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  showCoverImage?: boolean;
}

export default function AppLayout({
  children,
  showCoverImage = false,
}: LayoutProps) {
  const leftMenu: MenuItem[] = [
    {
      label: "หน้าหลัก",
      link: "https://shop.bugaboo.tv/",
    },
    {
      label: "Shop",
      link: "#",
      subMenu: [
        {
          label: "VCAN",
          link: "https://shop.bugaboo.tv/shop/27",
        },
        {
          label: "Nuvoshop",
          link: "https://shop.bugaboo.tv/shop/31",
        },
        {
          label: "Naf premium mall",
          link: "https://shop.bugaboo.tv/shop/33",
        },
        {
          label: "S Genix Audio Thailand",
          link: "https://shop.bugaboo.tv/shop/37",
        },
        {
          label: "ฟาร์มผักบ้านดอนม่วง",
          link: "https://shop.bugaboo.tv/shop/40",
        },
        {
          label: "Vitakraft",
          link: "https://shop.bugaboo.tv/shop/45",
        },
        {
          label: "BUGABOO SHOP",
          link: "https://shop.bugaboo.tv/shop/18",
        },
        {
          label: "Frend",
          link: "https://shop.bugaboo.tv/shop/23",
        },
        {
          label: "เสื้อเชียร์ วอลเลย์บอล",
          link: "https://shop.bugaboo.tv/shop/25",
        },
        {
          label: "ดูทั้งหมด",
          link: "https://shop.bugaboo.tv/shop",
        },
      ],
    },
    {
      label: "E-ticket",
      link: "/",
    },
  ];

  const rightMenu: MenuItem[] = [
    {
      label: "ศูนย์ช่วยเหลือ",
      link: "https://shop.bugaboo.tv/help",
    },
    {
      label: "ติดต่อเรา",
      link: "https://shop.bugaboo.tv/contact",
    },
  ];

  return (
    <div className="min-h-screen flex-col flex">
      <header>
        <NavBar leftMenu={leftMenu} rightMenu={rightMenu} />
        {showCoverImage && (
          <Image
            src="/ticket/aquaverse/images/cover.jpg"
            height={0}
            width={0}
            sizes="100vw"
            alt="cover-image"
            className="h-[320px] w-full object-cover object-center hidden md:block"
          />
        )}
      </header>
      <main
        className={cn(styles.aquabackgroud,
          "bg-no-repeat grow relative",
          "bg-[url('/ticket/aquaverse/images/background.jpg')]",
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#C1E7FC] from-20% to-transparent pointer-events-none"></div>
        <Image
          height={700}
          width={200}
          src={"/ticket/aquaverse/images/heading-logo.png"}
          alt={"partner-logo"}
          className="w-80 mt-8 mx-auto"
        />
        <div className="grow container mx-auto px-4 py-8 relative">
          {children}
        </div>
      </main>
      <Toaster />

      <footer className="bg-[#17072B] p-4 text-[#CECFD2] text-center">
        <div className="container mx-auto py-4">
          <p>หากมีข้อสงสัยเกี่ยวกับการซื้อบัตร หรือสอบถามข้อมูลเพิ่มเติม ติดต่อฝ่ายบริการลูกค้าได้ที่ </p>
          <p>Email: info@columbiapictureaquaverse.com  |   Call Center: 033-004-999  |  LINE: @aquaverse</p>
        </div>
        <div className="py-4 border-t border-[#989898]">
          <p>&copy; 2025 BBTV New Media Co.,Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
