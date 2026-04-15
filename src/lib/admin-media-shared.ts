export type AdminPlaylistStatus = "DRAFT" | "PUBLISHED" | "INACTIVE";
export type AdminContentKind = "LONG_FORM" | "SHORT";

export const ADMIN_PLAYLIST_STATUS_META = {
  DRAFT: { label: "초안", cls: "bg-[#fff7ed] text-[#c2410c]" },
  PUBLISHED: { label: "게시", cls: "bg-[#ecfdf5] text-[#047857]" },
  INACTIVE: { label: "비활성", cls: "bg-[#f1f5f9] text-[#64748b]" },
} as const satisfies Record<AdminPlaylistStatus, { label: string; cls: string }>;

export const ADMIN_CONTENT_KIND_META = {
  LONG_FORM: { label: "롱폼", cls: "bg-[#eff6ff] text-[#1d4ed8]" },
  SHORT: { label: "숏폼", cls: "bg-[#f5f3ff] text-[#7c3aed]" },
} as const satisfies Record<AdminContentKind, { label: string; cls: string }>;

export interface AdminPlaylist {
  id: number;
  menuName: string;
  siteKey: string;
  slug: string;
  contentKind: AdminContentKind;
  status: AdminPlaylistStatus;
  active: boolean;
  navigationVisible: boolean;
  sortOrder: number;
  description: string | null;
  discoveredAt: string | null;
  publishedAt: string | null;
  lastModifiedBy: number | null;
  youtubePlaylistId: string;
  itemCount: number;
  syncEnabled: boolean;
  lastSyncedAt: string | null;
}

export interface AdminPlaylistListResponse {
  data: AdminPlaylist[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface AdminPlaylistDetailResponse {
  id: number;
  menuName: string;
  siteKey: string;
  slug: string;
  contentKind: AdminContentKind;
  status: AdminPlaylistStatus;
  active: boolean;
  navigationVisible: boolean;
  sortOrder: number;
  description: string | null;
  discoveredAt: string | null;
  publishedAt: string | null;
  lastModifiedBy: number | null;
  youtubePlaylistId: string;
  youtubeTitle: string;
  youtubeDescription: string;
  channelTitle: string;
  thumbnailUrl: string;
  itemCount: number;
  syncEnabled: boolean;
  lastSyncedAt: string | null;
}

export interface AdminPlaylistDiscoveryItem {
  siteKey: string;
  menuName: string;
  slug: string;
  contentKind: AdminContentKind;
  status: AdminPlaylistStatus;
  navigationVisible: boolean;
  youtubePlaylistId: string;
  youtubeTitle: string;
  channelTitle: string | null;
  itemCount: number;
  syncEnabled: boolean;
}

export interface AdminPlaylistDiscoveryResponse {
  discoveredCount: number;
  skippedCount: number;
  items: AdminPlaylistDiscoveryItem[];
}

export interface AdminSyncJob {
  id: number;
  triggerType: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  totalPlaylists: number;
  succeededPlaylists: number;
  failedPlaylists: number;
  itemCount: number;
  failedItemCount: number;
  errorSummary: string | null;
}

export interface AdminSyncJobListResponse {
  data: AdminSyncJob[];
}

export interface UpdateAdminPlaylistPayload {
  menuName: string;
  slug: string;
  contentKind: AdminContentKind;
  youtubePlaylistId?: string | null;
  syncEnabled: boolean;
  active: boolean;
  status: AdminPlaylistStatus;
  navigationVisible: boolean;
  sortOrder: number;
  description?: string | null;
}

export function formatAdminMediaDate(value: string | null, fallback: string): string {
  if (!value) {
    return fallback;
  }

  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
