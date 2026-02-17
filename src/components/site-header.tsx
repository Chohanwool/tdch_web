"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems } from "@/lib/site-data";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-cedar/10 bg-ivory/95 backdrop-blur-lg">
      <div className="section-shell flex flex-col gap-3 py-3 md:gap-4 md:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-gradient-to-br from-gold to-clay md:h-8 md:w-8" />
            <div>
              <p className="hidden text-xs uppercase tracking-[0.2em] text-cedar/70 sm:block">The Disciple Church</p>
              <p className="font-serif text-base font-semibold text-ink md:text-lg">더 제자교회</p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-cedar/20 text-cedar md:hidden"
          >
            <span className="text-xl leading-none">{mobileOpen ? "×" : "≡"}</span>
          </button>

          <Link
            href="/newcomer"
            className="hidden min-h-11 items-center justify-center rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-clay transition hover:bg-clay hover:text-ivory md:inline-flex"
          >
            처음 오셨나요
          </Link>
        </div>

        <nav className="hidden items-center gap-2 text-sm font-medium text-ink/80 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "rounded-full bg-cedar/10 px-3 py-2 text-clay"
                    : "rounded-full px-3 py-2 transition hover:bg-cedar/5 hover:text-clay"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {mobileOpen ? (
          <div className="surface-card-strong rounded-2xl p-3 md:hidden">
            <nav className="grid grid-cols-2 gap-2 text-sm font-semibold text-ink/85">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      active
                        ? "rounded-xl bg-clay px-3 py-3 text-center text-ivory"
                        : "rounded-xl bg-white/75 px-3 py-3 text-center transition hover:bg-white"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/newcomer"
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-cedar px-4 py-3 text-sm font-semibold text-ivory"
            >
              새가족 안내 바로가기
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
