import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getAdminVideos, type AdminVideoSummary } from "@/lib/admin-videos-api";
import { getAdminYouTubePlaylists, type AdminYouTubePlaylist } from "@/lib/admin-menu-api";
import VideoListClient from "./_components/video-list-client";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

async function resolveInitialState(actorId: string): Promise<{
  playlists: AdminYouTubePlaylist[];
  initialPlaylistMenuId: number | null;
  initialItems: AdminVideoSummary[];
}> {
  const { playlists } = await getAdminYouTubePlaylists(actorId);
  const firstPlaylist = playlists[0] ?? null;

  if (!firstPlaylist) {
    return { playlists, initialPlaylistMenuId: null, initialItems: [] };
  }

  const { items } = await getAdminVideos({ menuId: firstPlaylist.menuId });

  return { playlists, initialPlaylistMenuId: firstPlaylist.menuId, initialItems: items };
}

export default async function AdminVideosPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/videos");
  }

  const { playlists, initialPlaylistMenuId, initialItems } =
    await resolveInitialState(session.user.id ?? "");

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[#8fa3bb]">
        <Link href="/admin" className="flex items-center transition hover:text-[#3f74c7]">홈</Link>
        <Chevron />
        <span className="text-[#4a6484]">운영</span>
        <Chevron />
        <span className="text-[#4a6484]">미디어</span>
        <Chevron />
        <span className="font-medium text-[#132033]">영상 관리</span>
      </nav>

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">영상 관리</h1>
        <p className="text-[13px] text-[#5d6f86]">재생목록별로 영상 메타를 관리하고 숨김 여부를 설정합니다.</p>
      </div>

      <VideoListClient
        playlists={playlists}
        initialPlaylistMenuId={initialPlaylistMenuId}
        initialItems={initialItems}
      />
    </div>
  );
}
