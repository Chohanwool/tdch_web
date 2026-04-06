"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { AdminNavigationSet } from "@/lib/admin-navigation-api";

interface NavigationSetTabsProps {
  sets: AdminNavigationSet[];
  currentSetKey: string;
}

export default function NavigationSetTabs({ sets, currentSetKey }: NavigationSetTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSetChange(setKey: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("set", setKey);
    // 세트 변경 시 필터·limit 초기화
    params.delete("limit");
    params.delete("status");
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-xl bg-[#e9edf3] p-1" style={{ width: "fit-content" }}>
      {sets.map((set) => {
        const active = set.setKey === currentSetKey;
        return (
          <button
            key={set.setKey}
            type="button"
            onClick={() => handleSetChange(set.setKey)}
            title={set.description ?? set.label}
            className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-all ${
              active
                ? "bg-white text-[#0f1c2e] shadow-sm"
                : "text-[#8fa3bb] hover:text-[#4a6484]"
            }`}
          >
            {set.setKey}
          </button>
        );
      })}
      <button
        type="button"
        className="rounded-lg px-3 py-1.5 text-[12px] text-[#8fa3bb] transition hover:text-[#4a6484]"
        title="새 메뉴 세트 추가 (추후 지원 예정)"
        disabled
      >
        + 세트 추가
      </button>
    </div>
  );
}
