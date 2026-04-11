"use client";

import { useState } from "react";
import Link from "next/link";
import MobileNav from "@/components/mobile-nav";

export default function HomeHeroHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex items-start justify-between gap-4 lg:hidden">
      <Link
        href="/"
        className="transition-[transform,font-size] duration-300"
      >
        <div className="flex flex-col">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
            The Disciples Church
          </p>
          <p className="font-serif text-[20px] font-bold leading-tight text-white">
            The 제자교회
          </p>
        </div>
      </Link>

      <div className="relative z-10 flex shrink-0 items-center">
        <MobileNav
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
          isTransparent
        />
      </div>
    </div>
  );
}
