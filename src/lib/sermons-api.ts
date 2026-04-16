import "server-only";

import { SERVER_MEDIA_API_BASE_URL } from "@/lib/server-config";

export type SermonContentForm = "LONGFORM" | "SHORTFORM";

export interface PublicSermonSummary {
  videoId: string;
  title: string;
  preacherName: string | null;
  publishedAt: string | null;
  thumbnailUrl: string | null;
  scriptureReference: string | null;
  summary: string | null;
  contentForm: SermonContentForm;
  href: string;
}

export interface PublicSermonList {
  form: SermonContentForm;
  featured: PublicSermonSummary | null;
  items: PublicSermonSummary[];
}

export interface PublicSermonPlaylistLink {
  label: string;
  href: string;
}

export interface PublicSermonDetail {
  videoId: string;
  title: string;
  sourceTitle: string;
  preacherName: string | null;
  publishedAt: string | null;
  thumbnailUrl: string | null;
  scriptureReference: string | null;
  scriptureBody: string | null;
  messageBody: string | null;
  summary: string | null;
  description: string | null;
  contentForm: SermonContentForm;
  playlists: PublicSermonPlaylistLink[];
  related: PublicSermonSummary[];
}

export async function getPublicSermonList(form: SermonContentForm): Promise<PublicSermonList | null> {
  try {
    const response = await fetch(
      `${SERVER_MEDIA_API_BASE_URL}/api/v1/public/sermons?form=${encodeURIComponent(form)}`,
      {
        next: {
          revalidate: 300,
          tags: ["sermons"],
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    return response.json() as Promise<PublicSermonList>;
  } catch {
    return null;
  }
}

export async function getPublicSermonDetail(videoId: string): Promise<PublicSermonDetail | null> {
  try {
    const response = await fetch(
      `${SERVER_MEDIA_API_BASE_URL}/api/v1/public/sermons/${encodeURIComponent(videoId)}`,
      {
        next: {
          revalidate: 300,
          tags: ["sermons"],
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    return response.json() as Promise<PublicSermonDetail>;
  } catch {
    return null;
  }
}
