'use client'; // Error boundaries는 클라이언트 컴포넌트여야 합니다.

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 실제 운영 환경에서는 Sentry 등의 에러 수집 도구로 에러를 전송할 수 있습니다.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-4">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-red-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        문제가 발생했습니다
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        페이지를 불러오는 중 예기치 않은 에러가 발생했습니다.<br />
        불편을 드려 죄송합니다.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          다시 시도
        </button>
        <Link 
          href="/"
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
