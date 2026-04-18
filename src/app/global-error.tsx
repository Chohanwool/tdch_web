'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="bg-white text-[#111827] antialiased">
        <div className="flex min-h-screen items-center justify-center px-4 py-16">
          <div className="w-full max-w-[560px] rounded-[28px] border border-[#e5e7eb] bg-white px-6 py-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] md:px-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2]">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 text-[#dc2626]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3.75h.008v.008H12v-.008Zm8.25-.75c0 1.242-1.008 2.25-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15.75V8.25C3 7.008 4.008 6 5.25 6h13.5C19.992 6 21 7.008 21 8.25v7.5Z"
                />
              </svg>
            </div>
            <p className="mb-3 text-sm font-semibold tracking-[0.28em] text-[#b45309]">
              TEMPORARY SERVICE ISSUE
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-[-0.03em] text-[#111827]">
              일시적인 서비스 장애가 발생했습니다
            </h1>
            <p className="mx-auto max-w-[420px] text-[15px] leading-7 text-[#4b5563]">
              페이지를 불러오는 중 연결 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => reset()}
                className="inline-flex min-w-[148px] items-center justify-center rounded-full bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f2937]"
              >
                다시 시도
              </button>
              <Link
                href="/"
                className="inline-flex min-w-[148px] items-center justify-center rounded-full border border-[#d1d5db] px-6 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb]"
              >
                홈으로 가기
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
