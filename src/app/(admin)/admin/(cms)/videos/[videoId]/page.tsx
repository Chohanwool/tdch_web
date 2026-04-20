import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getAdminVideoDetail } from "@/lib/admin-videos-api";
import { AdminApiError } from "@/lib/admin-api";
import VideoEditClient from "./_components/video-edit-client";

interface AdminVideoDetailPageProps {
  params: Promise<{ videoId: string }>;
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function AdminVideoDetailPage({ params }: AdminVideoDetailPageProps) {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/videos");
  }

  const { videoId } = await params;

  let detail;
  try {
    detail = await getAdminVideoDetail(videoId);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[#8fa3bb]">
        <Link href="/admin" className="flex items-center transition hover:text-[#3f74c7]">홈</Link>
        <Chevron />
        <span className="text-[#4a6484]">운영</span>
        <Chevron />
        <span className="text-[#4a6484]">미디어</span>
        <Chevron />
        <Link href="/admin/videos" className="text-[#4a6484] transition hover:text-[#3f74c7]">
          영상 관리
        </Link>
        <Chevron />
        <span className="max-w-[200px] truncate font-medium text-[#132033]">{detail.sourceTitle}</span>
      </nav>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0f1c2e]">{detail.title}</h1>
          <p className="mt-1 font-mono text-[12px] text-[#8fa3bb]">{detail.videoId}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={`https://www.youtube.com/watch?v=${encodeURIComponent(detail.videoId)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-lg border border-[#d7e3f4] bg-white px-3 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f0f6ff]"
          >
            유튜브 열기
          </a>
          {detail.publicHref && (
            <a
              href={detail.publicHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center rounded-lg border border-[#d7e3f4] bg-white px-3 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f0f6ff]"
            >
              공개 화면 보기
            </a>
          )}
        </div>
      </div>

      <VideoEditClient initialDetail={detail} />
    </div>
  );
}
