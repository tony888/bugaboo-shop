"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface MenuItem {
  label: string;
  link: string;
  subMenu?: MenuItem[];
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  leftMenu: MenuItem[];
  rightMenu: MenuItem[];
}

const NavBar: React.FC<Props> = ({
  leftMenu = [],
  rightMenu = [],
  className,
}) => {
  const isMobile = useIsMobile();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (label: string) => {
    setOpenItems((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  const MobileMenu = () => {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu style={{ width: '32px', height: '32px' }} />
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
            {leftMenu.map((menu) => (
              <div key={menu.label}>
                {menu.subMenu ? (
                  <Collapsible
                    open={openItems.includes(menu.label)}
                    onOpenChange={() => toggleSubmenu(menu.label)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-[#172D4F] hover:bg-gray-100">
                      {menu.label}
                      <svg
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openItems.includes(menu.label) && "rotate-180",
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="bg-gray-50">
                      {menu.subMenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.link}
                          className="block px-6 py-2 text-[#172D4F] hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={menu.link}
                    className="block px-4 py-2 text-[#172D4F] hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {menu.label}
                  </Link>
                )}
              </div>
            ))}

            {rightMenu.map((menu) => (
              <Link
                key={menu.label}
                href={menu.link}
                className="block px-4 py-2 text-[#172D4F] hover:bg-gray-100"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                {menu.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className={cn("bg-[#172D4F]", className)}>
      <div className="px-8 py-4 flex items-center justify-between">
        <Image
          src={"/ticket/aquaverse/images/bbtv-shop-logo.png"}
          width={120}
          height={40}
          alt="bugaboo-shop-logo"
          className="h-auto"
        />
        {isMobile && <MobileMenu />}
        {!isMobile && (
          <div className="flex text-white my-auto cursor-pointer ml-2 justify-between w-full">
            <div className="flex">
              {leftMenu.map((menu, index) => (
                <div key={menu.label} className="relative group">
                  <div className="flex items-center">
                    {menu.subMenu ? (
                      <div
                        className={cn(
                          "mx-4 hover:text-[#00B1FF] transition-colors flex items-center cursor-pointer",
                          menu.label === "E-ticket" &&
                            "text-[#00B1FF] font-bold",
                        )}
                      >
                        {menu.label}
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <Link
                        href={menu.link}
                        className={cn(
                          "mx-4 hover:text-[#00B1FF] transition-colors",
                          menu.label === "E-ticket" &&
                            "text-[#00B1FF] font-bold",
                        )}
                      >
                        {menu.label}
                      </Link>
                    )}
                    {index !== leftMenu.length - 1 && (
                      <div className="text-gray-400 mx-2">|</div>
                    )}
                  </div>

                  {menu.subMenu && (
                    <div className="absolute left-4 top-full hidden group-hover:block min-w-[200px] bg-white rounded-md shadow-lg py-2 z-50">
                      {menu.subMenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.link}
                          className="block px-4 py-2 text-[#172D4F] hover:bg-gray-100 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex">
              {rightMenu.map((menu) => (
                <div key={menu.label} className="relative group">
                  <Link
                    href={menu.link}
                    className="mx-4 hover:text-[#00B1FF] transition-colors"
                    target="_blank"
                  >
                    {menu.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
