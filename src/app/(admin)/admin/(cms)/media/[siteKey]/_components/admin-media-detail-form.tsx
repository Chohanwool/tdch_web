"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import {
  ADMIN_CONTENT_KIND_META,
  ADMIN_PLAYLIST_STATUS_META,
  type AdminPlaylistDetailResponse,
} from "@/lib/admin-media-shared";
import type { AdminMediaDetailActionState } from "../actions";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[12px] text-red-500">{message}</p>;
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold text-[#1e2f45]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-[13px] text-[#132033] outline-none transition focus:ring-2 focus:ring-[#3f74c7]/30 ${
    hasError ? "border-red-300 bg-red-50/40 focus:border-red-400" : "border-[#dde4ef] bg-white focus:border-[#3f74c7]"
  }`;
}

function ToggleField({
  name,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex items-start justify-between gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
      <div>
        <p className="text-[13px] font-semibold text-[#132033]">{label}</p>
        <p className="mt-1 text-[11px] text-[#8fa3bb]">{description}</p>
      </div>
      <div className="shrink-0">
        <input type="hidden" name={name} value={checked ? "true" : "false"} />
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => setChecked((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            checked ? "bg-[#3f74c7]" : "bg-[#d1dbe6]"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white shadow transition ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </label>
  );
}

interface AdminMediaDetailFormProps {
  playlist: AdminPlaylistDetailResponse;
  saveAction: (
    prev: AdminMediaDetailActionState,
    formData: FormData,
  ) => Promise<AdminMediaDetailActionState>;
}

export default function AdminMediaDetailForm({ playlist, saveAction }: AdminMediaDetailFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<AdminMediaDetailActionState, FormData>(saveAction, {});
  const [toast, setToast] = useState<{ message: string; success: boolean } | null>(null);

  useEffect(() => {
    if (!state.message) {
      return;
    }

    setToast({ message: state.message, success: Boolean(state.success) });
    if (state.success) {
      router.refresh();
    }

    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [router, state.message, state.messageKey, state.success]);

  return (
    <>
      {toast && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-lg ${
            toast.success ? "border-emerald-100 bg-white" : "border-red-100 bg-white"
          }`}
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              toast.success ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
            }`}
          >
            {toast.success ? "✓" : "!"}
          </span>
          <p className="text-[13px] text-[#1e2f45]">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-auto text-[#8fa3bb] hover:text-[#374151]" aria-label="닫기">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="border-b border-[#f0f4f8] px-6 py-4">
            <h2 className="text-[14px] font-bold text-[#0f1c2e]">기본 정보</h2>
          </div>
          <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="menuName" required>메뉴명</Label>
              <input id="menuName" name="menuName" defaultValue={playlist.menuName} className={inputCls(!!state.errors?.menuName)} />
              <FieldError message={state.errors?.menuName} />
            </div>
            <div>
              <Label htmlFor="slug" required>slug</Label>
              <input id="slug" name="slug" defaultValue={playlist.slug} className={inputCls(!!state.errors?.slug)} />
              <FieldError message={state.errors?.slug} />
            </div>
            <div>
              <Label htmlFor="youtubePlaylistId" required>YouTube Playlist ID</Label>
              <input
                id="youtubePlaylistId"
                name="youtubePlaylistId"
                defaultValue={playlist.youtubePlaylistId}
                className={`${inputCls(!!state.errors?.youtubePlaylistId)} font-mono`}
              />
              <FieldError message={state.errors?.youtubePlaylistId} />
            </div>
            <div>
              <Label htmlFor="sortOrder" required>정렬 순서</Label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={playlist.sortOrder}
                className={inputCls(!!state.errors?.sortOrder)}
              />
              <FieldError message={state.errors?.sortOrder} />
            </div>
            <div>
              <Label htmlFor="contentKind" required>콘텐츠 유형</Label>
              <select id="contentKind" name="contentKind" defaultValue={playlist.contentKind} className={inputCls(!!state.errors?.contentKind)}>
                {Object.entries(ADMIN_CONTENT_KIND_META).map(([value, meta]) => (
                  <option key={value} value={value}>
                    {meta.label}
                  </option>
                ))}
              </select>
              <FieldError message={state.errors?.contentKind} />
            </div>
            <div>
              <Label htmlFor="status" required>운영 상태</Label>
              <select id="status" name="status" defaultValue={playlist.status} className={inputCls(!!state.errors?.status)}>
                {Object.entries(ADMIN_PLAYLIST_STATUS_META).map(([value, meta]) => (
                  <option key={value} value={value}>
                    {meta.label}
                  </option>
                ))}
              </select>
              <FieldError message={state.errors?.status} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="description">설명</Label>
              <textarea
                id="description"
                name="description"
                defaultValue={playlist.description ?? ""}
                rows={4}
                className={`${inputCls(false)} resize-y`}
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="border-b border-[#f0f4f8] px-6 py-4">
            <h2 className="text-[14px] font-bold text-[#0f1c2e]">노출 및 Sync 설정</h2>
          </div>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-3">
            <ToggleField
              name="active"
              label="활성 URL"
              description="비활성화하면 사용자 상세 경로가 404 처리됩니다."
              defaultChecked={playlist.active}
            />
            <ToggleField
              name="navigationVisible"
              label="메뉴 노출"
              description="헤더와 LNB에 이 메뉴를 노출합니다."
              defaultChecked={playlist.navigationVisible}
            />
            <ToggleField
              name="syncEnabled"
              label="Sync 사용"
              description="정기 sync 대상에 이 재생목록을 포함합니다."
              defaultChecked={playlist.syncEnabled}
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/media")}
            className="rounded-xl border border-[#d7e0ea] px-4 py-2.5 text-[13px] font-semibold text-[#4a6484] transition hover:bg-[#f8fafc]"
          >
            목록으로
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#3f74c7] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#325ea1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </>
  );
}
