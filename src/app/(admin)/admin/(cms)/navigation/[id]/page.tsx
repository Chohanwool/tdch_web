import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminNavigationItem, getAdminNavigationItems, getAdminContentMenus } from "@/lib/admin-navigation-api";
import { AdminApiError } from "@/lib/admin-api";
import NavigationForm from "../_components/navigation-form";
import {
  createNavigationItemAction,
  updateNavigationItemAction,
  deleteNavigationItemAction,
} from "../actions";

interface NavigationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NavigationDetailPage({ params }: NavigationDetailPageProps) {
  const { id: rawId } = await params;
  const id = Number.parseInt(rawId, 10);

  if (!Number.isFinite(id) || id <= 0) notFound();

  // 병렬 패치
  const [itemResult, groupsResult, contentMenusResult] = await Promise.allSettled([
    getAdminNavigationItem(id),
    getAdminNavigationItems(true),
    getAdminContentMenus(),
  ]);

  if (itemResult.status === "rejected") {
    const err = itemResult.reason;
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  const item = itemResult.value;
  const allGroups = groupsResult.status === "fulfilled" ? groupsResult.value.groups : [];
  const contentMenuOptions = contentMenusResult.status === "fulfilled" ? contentMenusResult.value.items : [];

  // 자기 자신은 상위 선택지에서 제외
  const parentOptions = allGroups
    .filter((g: { id: number }) => g.id !== id)
    .map(({ id: gid, label, menuKey }: { id: number; label: string; menuKey: string }) => ({ id: gid, label, menuKey }));

  // update/delete action에 id를 바인딩
  const boundUpdateAction = updateNavigationItemAction.bind(null, id);
  const boundDeleteAction = deleteNavigationItemAction.bind(null, id);

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
        <span className="font-medium text-[#132033]">{item.label}</span>
      </nav>

      {/* ── 페이지 헤더 ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0f1c2e]">{item.label}</h1>
          <p className="mt-0.5 text-[12px] text-[#8fa3bb]">{item.menuKey}</p>
        </div>
        {/* 마지막 수정일 */}
        <div className="shrink-0 rounded-xl border border-[#e9edf3] bg-[#f8fafc] px-3 py-2 text-right">
          <p className="text-[10px] text-[#8fa3bb]">마지막 수정</p>
          <p className="mt-0.5 text-[12px] font-medium text-[#374151]">
            {new Date(item.updatedAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* ── 폼 ── */}
      <NavigationForm
        mode="edit"
        item={item}
        parentOptions={parentOptions}
        contentMenuOptions={contentMenuOptions}
        createAction={createNavigationItemAction}
        updateAction={boundUpdateAction}
        deleteAction={boundDeleteAction}
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
