"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/lib/site-data";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cedar/10 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-gold to-clay" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cedar/70">The Disciple Church</p>
              <p className="font-serif text-lg font-semibold text-ink">더 제자교회</p>
            </div>
          </Link>

          <Link
            href="/newcomer"
            className="rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-clay transition hover:bg-clay hover:text-ivory"
          >
            처음 오셨나요
          </Link>
        </div>

        <nav className="flex gap-5 overflow-x-auto whitespace-nowrap text-sm font-medium text-ink/80">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-clay" : "transition hover:text-clay"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
