import Link from "next/link";
import { getAdminNavigationItems, getAdminContentMenus } from "@/lib/admin-navigation-api";
import NavigationForm from "../_components/navigation-form";
import { createNavigationItemAction } from "../actions";

export default async function NavigationNewPage() {
  const [{ groups }, { items: contentMenus }] = await Promise.all([
    getAdminNavigationItems(true),
    getAdminContentMenus(),
  ]);

  // 1depth 메뉴만 상위 선택지로 제공
  const parentOptions = groups.map(({ id, label, menuKey }) => ({ id, label, menuKey }));

  return (
    <div className="space-y-5">
      {/* ── 경로(breadcrumb) ── */}
      <nav className="flex items-center gap-1.5 text-[12px] text-[#8fa3bb]">
        <Link href="/admin" className="flex items-center transition hover:text-[#3f74c7]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mr-1">
            <path d="M1.5 7.5L7 2l5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6.5V12h3V9h2v3h3V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          홈
        </Link>
        <Chevron />
        <span className="text-[#4a6484]">운영</span>
        <Chevron />
        <Link href="/admin/navigation" className="text-[#4a6484] transition hover:text-[#3f74c7]">
          내비게이션 메뉴
        </Link>
        <Chevron />
        <span className="font-medium text-[#132033]">메뉴 추가</span>
      </nav>

      {/* ── 페이지 헤더 ── */}
      <h1 className="text-xl font-bold text-[#0f1c2e]">메뉴 추가</h1>

      {/* ── 폼 ── */}
      <NavigationForm
        mode="new"
        parentOptions={parentOptions}
        contentMenuOptions={contentMenus}
        createAction={createNavigationItemAction}
      />
    </div>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
