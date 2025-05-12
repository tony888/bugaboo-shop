import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bugaboo.tv/ticket/aquaverse'),
  title: "บัตรราคาพิเศษ พร้อมคูปองอาหารฟรี! | Family Package & Aqua Buddy Pass ที่ Columbia Pictures Aquaverse",
  description: "จอง Family Package & Aqua Buddy Pass ที่ Columbia Pictures Aquaverse สนุกทั้งครอบครัว พร้อมรับคูปองอาหารฟรี! พิเศษ! เตรียมพบกับ Aquaverse Music Fest 2025 ขนทัพศิลปินดัง ALLY, 4EVE, PiXXiE, DA OU & OFF-ROAD, ATLAS รีบจองก่อนพลาดความมันส์!",
  keywords:['Columbia Pictures Aquaverse', 'สวนน้ำพัทยา', 'Family Package', 'Aqua Buddy Pass', 'โปรโมชั่นสวนน้ำ', 'บัตรสวนน้ำราคาพิเศษ', 'เที่ยวพัทยา', 'Aquaverse Music Fest 2025', 'คอนเสิร์ตกลางน้ำ', 'ALLY', '4EVE', 'PiXXiE', 'DA OU & OFF-ROAD', 'ATLAS', 'เที่ยวกับครอบครัว', 'เที่ยววันหยุด'],
  openGraph: {
    url:'https://www.bugaboo.tv/ticket/aquaverse',
    title: "บัตรราคาพิเศษ พร้อมคูปองอาหารฟรี! | Family Package & Aqua Buddy Pass ที่ Columbia Pictures Aquaverse",
    description: "จอง Family Package & Aqua Buddy Pass ที่ Columbia Pictures Aquaverse สนุกทั้งครอบครัว พร้อมรับคูปองอาหารฟรี! พิเศษ! เตรียมพบกับ Aquaverse Music Fest 2025 ขนทัพศิลปินดัง ALLY, 4EVE, PiXXiE, DA OU & OFF-ROAD, ATLAS รีบจองก่อนพลาดความมันส์!",
    type: "website",  
    images: [
      {
        url: "https://static.bugaboo.tv/aquaverse/thumbnail.jpg",
        width: 500,
        height: 625,
        alt: "Aquaverse",
      },
    ],
  },
};


const myFont = localFont({
  src: [
    {
      path: "../public/fonts/SukhumvitSet-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SukhumvitSet-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SukhumvitSet-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SukhumvitSet-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SukhumvitSet-Text.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SukhumvitSet-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
});




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(myFont.className, "bg-[#172D4F]")}>
      <GoogleAnalytics/>    
        {children}
      </body>
    </html>
  );
}
