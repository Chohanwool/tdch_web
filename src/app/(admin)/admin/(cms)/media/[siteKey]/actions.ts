"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession, isAdminSession } from "@/auth";
import {
  toFriendlyAdminMediaMessage,
  updateAdminPlaylist,
  type AdminContentKind,
  type AdminPlaylistStatus,
} from "@/lib/admin-media-api";

const CONTENT_KINDS: AdminContentKind[] = ["LONG_FORM", "SHORT"];
const PLAYLIST_STATUSES: AdminPlaylistStatus[] = ["DRAFT", "PUBLISHED", "INACTIVE"];

export interface AdminMediaDetailActionState {
  errors?: Partial<Record<"menuName" | "slug" | "contentKind" | "status" | "sortOrder" | "youtubePlaylistId", string>>;
  message?: string;
  success?: boolean;
  messageKey?: number;
}

function buildState(message: string, success = false): AdminMediaDetailActionState {
  return { message, success, messageKey: Date.now() };
}

function parseBoolean(formData: FormData, key: string) {
  return String(formData.get(key) ?? "false") === "true";
}

export async function updateAdminMediaDetailAction(
  siteKey: string,
  _prev: AdminMediaDetailActionState,
  formData: FormData,
): Promise<AdminMediaDetailActionState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return buildState("관리자 로그인 후 다시 시도해 주세요.");
  }

  const actorId = session.user.id ?? "";
  if (!actorId) {
    return buildState("관리자 계정 정보가 확인되지 않았습니다. 다시 로그인해 주세요.");
  }

  const menuName = String(formData.get("menuName") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const contentKind = String(formData.get("contentKind") ?? "").trim().toUpperCase() as AdminContentKind;
  const status = String(formData.get("status") ?? "").trim().toUpperCase() as AdminPlaylistStatus;
  const sortOrderRaw = String(formData.get("sortOrder") ?? "0").trim();
  const youtubePlaylistId = String(formData.get("youtubePlaylistId") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const errors: AdminMediaDetailActionState["errors"] = {};
  if (!menuName) errors.menuName = "메뉴명을 입력해 주세요.";
  if (!slug) errors.slug = "slug를 입력해 주세요.";
  else if (!/^[a-z0-9-]+$/.test(slug)) errors.slug = "slug는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.";
  if (!CONTENT_KINDS.includes(contentKind)) errors.contentKind = "콘텐츠 유형을 선택해 주세요.";
  if (!PLAYLIST_STATUSES.includes(status)) errors.status = "운영 상태를 선택해 주세요.";
  if (!youtubePlaylistId) errors.youtubePlaylistId = "YouTube Playlist ID를 입력해 주세요.";

  const sortOrder = Number.parseInt(sortOrderRaw, 10);
  if (!Number.isFinite(sortOrder)) {
    errors.sortOrder = "정렬 순서는 숫자로 입력해 주세요.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    await updateAdminPlaylist(actorId, siteKey, {
      menuName,
      slug,
      contentKind,
      youtubePlaylistId,
      syncEnabled: parseBoolean(formData, "syncEnabled"),
      active: parseBoolean(formData, "active"),
      status,
      navigationVisible: parseBoolean(formData, "navigationVisible"),
      sortOrder,
      description: description || null,
    });
  } catch (error) {
    return buildState(
      toFriendlyAdminMediaMessage(error, "예배 영상 메뉴를 저장하지 못했습니다. 입력한 내용을 확인한 뒤 다시 시도해 주세요."),
    );
  }

  revalidatePath("/admin/media");
  revalidatePath(`/admin/media/${siteKey}`);
  return buildState("예배 영상 메뉴를 저장했습니다.", true);
}
