"use client";

import Link from "next/link";
import type { AdminMediaDiscoveryActionItem } from "../actions";
import { ADMIN_CONTENT_KIND_META, ADMIN_PLAYLIST_STATUS_META } from "@/lib/admin-media-shared";
import { discoveryEmptyTitle, discoveryResultTitle } from "@/lib/admin-media-copy";

interface AdminMediaDiscoveryResultsDialogProps {
  open: boolean;
  discoveredCount: number;
  skippedCount: number;
  items: AdminMediaDiscoveryActionItem[];
  onClose: () => void;
}

function MetaBadge({ label, cls }: { label: string; cls: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>{label}</span>;
}

function DiscoveryResultEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-[#dbe5f0] bg-[#f8fbff] px-5 py-8 text-center">
      <p className="text-[14px] font-semibold text-[#31445f]">{discoveryEmptyTitle}</p>
      <p className="mt-1 text-[12px] text-[#7b8ba1]">이미 연결된 재생목록만 있었는지 확인해 보세요.</p>
    </div>
  );
}

function DiscoveryResultItem({ item }: { item: AdminMediaDiscoveryActionItem }) {
  return (
    <article className="rounded-2xl border border-[#e2e8f0] bg-[#fbfdff] px-5 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <MetaBadge {...ADMIN_PLAYLIST_STATUS_META[item.status]} />
            <MetaBadge {...ADMIN_CONTENT_KIND_META[item.contentKind]} />
          </div>
          <h3 className="mt-3 text-[15px] font-semibold text-[#132033]">{item.menuName}</h3>
          <p className="mt-1 text-[12px] text-[#7b8ba1]">{item.siteKey}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={item.editHref}
            className="inline-flex h-9 items-center rounded-lg bg-[#2d5da8] px-4 text-[13px] font-semibold text-white transition hover:bg-[#264f8d]"
          >
            상세 편집
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function AdminMediaDiscoveryResultsDialog({
  open,
  discoveredCount,
  skippedCount,
  items,
  onClose,
}: AdminMediaDiscoveryResultsDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172acc] px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="발견된 재생목록 결과"
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] px-6 py-5">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8fa3bb]">Discovery Result</p>
            <h2 className="mt-1 text-xl font-bold text-[#0f1c2e]">{discoveryResultTitle}</h2>
            <p className="mt-2 text-[13px] text-[#5d6f86]">
              신규 {discoveredCount}건, 건너뜀 {skippedCount}건
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe5f0] text-[#8fa3bb] transition hover:border-[#bfd0ea] hover:text-[#3f74c7]"
            aria-label="결과 닫기"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <DiscoveryResultEmptyState />
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <DiscoveryResultItem key={item.siteKey} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
