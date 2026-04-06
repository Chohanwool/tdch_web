"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/lib/navigation-context";
import { findMatchedNavigationGroup, findMatchedNavigationItem } from "@/lib/navigation-utils";

// Breadscrumb(브레드크럼) 과 LNB 목록
// Breadscrumb: 현재 위치의 계층 표시
// lnb row: GNB기준 현재 화면의 LNB 메뉴 ROW 탭
export default function Breadcrumb({
  hideLnb = false,
}: {
  hideLnb?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const { navMenuGroups } = useNavigation();
  const menuGroup = findMatchedNavigationGroup(pathname, navMenuGroups);
  const currentItem = findMatchedNavigationItem(pathname, menuGroup);

  return (
    <div className="w-full flex flex-col bg-[#f8fafd]">
      {/* 1. Breadcrumb (경로 표시) */}
      <nav className="section-shell py-3 border-b border-cedar/8" aria-label="Breadcrumb">
        <ol className="type-body-small flex items-center justify-center gap-1.5">
          {/* 홈 */}
          <li>
            <Link
              href="/"
              className="font-medium text-ink/40 transition hover:text-themeBlue"
            >
              홈
            </Link>
          </li>

          {/* 구분자 + 메뉴 그룹 */}
          {menuGroup && !menuGroup.hiddenInBreadcrumb && (
            <>
              <li className="text-ink/25" aria-hidden="true">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <Link
                  href={menuGroup.href}
                  className={`font-medium transition hover:text-themeBlue ${currentItem ? "text-ink/40" : "text-ink/80"
                    }`}
                >
                  {menuGroup.label}
                </Link>
              </li>
            </>
          )}

          {/* 구분자 + 현재 아이템 */}
          {currentItem && !currentItem.hiddenInBreadcrumb && (
            <>
              <li className="text-ink/25" aria-hidden="true">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="font-semibold text-ink/80">
                  {currentItem.label}
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* 2. LNB (Local Navigation Bar) - 소메뉴 목록 */}
      {!hideLnb && menuGroup && !menuGroup.hiddenInLnb && menuGroup.items.some((item) => !item.hiddenInLnb) && (
        <nav className="w-full border-b border-cedar/8 bg-white overflow-x-auto no-scrollbar" aria-label="LNB">
          <ul className="section-shell flex items-center justify-start md:justify-center gap-1 min-w-max px-4">
            {menuGroup.items.filter((item) => !item.hiddenInLnb).map((item) => {
              const isActive = item === currentItem;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`type-body-small block whitespace-nowrap border-b-[2.5px] px-3 py-3.5 font-medium transition-colors md:px-4 ${isActive
                        ? "border-themeBlue text-themeBlue font-bold"
                        : "border-transparent text-ink/65 hover:text-themeBlue hover:border-themeBlue/30"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
