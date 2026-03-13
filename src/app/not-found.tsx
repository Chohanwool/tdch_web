import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-8xl font-black text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        요청하신 페이지가 사라졌거나, 잘못된 경로입니다.<br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <Link 
        href="/"
        className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
