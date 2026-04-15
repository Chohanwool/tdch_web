"use client";

import { useActionState, useEffect, useState } from "react";
import type { AdminMediaDiscoveryActionState } from "../actions";
import AdminMediaDiscoveryResultsDialog from "./admin-media-discovery-results-dialog";

interface DiscoverPlaylistsButtonProps {
  action: (
    prev: AdminMediaDiscoveryActionState,
    formData: FormData,
  ) => Promise<AdminMediaDiscoveryActionState>;
}

export default function DiscoverPlaylistsButton({ action }: DiscoverPlaylistsButtonProps) {
  const [state, formAction, isPending] = useActionState<AdminMediaDiscoveryActionState, FormData>(action, {});
  const [toastState, setToastState] = useState<AdminMediaDiscoveryActionState | null>(null);
  const [discoveryResult, setDiscoveryResult] = useState<AdminMediaDiscoveryActionState | null>(null);

  useEffect(() => {
    if (!state.message) return;
    setToastState(state);
    if (state.success && state.items?.length) {
      setDiscoveryResult(state);
    }
    const timer = window.setTimeout(() => setToastState(null), 4000);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <>
      {toastState?.message && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-lg ${
            toastState.success ? "border-emerald-100 bg-white" : "border-red-100 bg-white"
          }`}
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              toastState.success ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
            }`}
          >
            {toastState.success ? "✓" : "!"}
          </span>
          <p className="text-[13px] text-[#1e2f45]">{toastState.message}</p>
          <button
            type="button"
            onClick={() => setToastState(null)}
            className="ml-auto shrink-0 text-[#8fa3bb] hover:text-[#374151]"
            aria-label="닫기"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <form action={formAction}>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#bfd0ea] bg-[#edf4ff] px-4 text-[13px] font-semibold text-[#2d5da8] transition hover:bg-[#e4efff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M11.5 6.5a5 5 0 1 1-1.27-3.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11.5 2.25v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isPending ? "불러오는 중..." : "미연결 재생목록 불러오기"}
        </button>
      </form>

      <AdminMediaDiscoveryResultsDialog
        open={Boolean(discoveryResult)}
        discoveredCount={discoveryResult?.discoveredCount ?? 0}
        skippedCount={discoveryResult?.skippedCount ?? 0}
        items={discoveryResult?.items ?? []}
        onClose={() => setDiscoveryResult(null)}
      />
    </>
  );
}
