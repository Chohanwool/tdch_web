"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAdminNavigationItem,
  updateAdminNavigationItem,
  deleteAdminNavigationItem,
  type AdminNavigationLinkType,
} from "@/lib/admin-navigation-api";
import { AdminApiError } from "@/lib/admin-api";

export interface NavigationFormState {
  errors?: Partial<Record<string, string>>;
  message?: string;
}

function parseBoolean(val: FormDataEntryValue | null): boolean {
  return val === "true" || val === "on";
}

function parseNullableString(val: FormDataEntryValue | null): string | null {
  const s = typeof val === "string" ? val.trim() : "";
  return s.length > 0 ? s : null;
}

function parseNullableNumber(val: FormDataEntryValue | null): number | null {
  const n = Number.parseInt(typeof val === "string" ? val : "", 10);
  return Number.isFinite(n) ? n : null;
}

const VALID_LINK_TYPES: AdminNavigationLinkType[] = ["INTERNAL", "ANCHOR", "EXTERNAL", "CONTENT_REF"];

// ── 공통 payload 파싱 & 유효성 검사 ────────────────────────────────────────
function parsePayload(formData: FormData): {
  payload?: Parameters<typeof createAdminNavigationItem>[0];
  errors?: Partial<Record<string, string>>;
} {
  const errors: Partial<Record<string, string>> = {};

  const label = (formData.get("label") as string | null)?.trim() ?? "";
  const menuKey = (formData.get("menuKey") as string | null)?.trim() ?? "";
  const href = (formData.get("href") as string | null)?.trim() ?? "";
  const linkType = (formData.get("linkType") as string | null) ?? "";

  if (!label) errors.label = "메뉴명을 입력해주세요.";
  if (!menuKey) errors.menuKey = "메뉴 키를 입력해주세요.";
  else if (!/^[a-z0-9_-]+$/.test(menuKey)) errors.menuKey = "영소문자, 숫자, -, _ 만 사용 가능합니다.";
  if (!href) errors.href = "연결 주소를 입력해주세요.";
  if (!VALID_LINK_TYPES.includes(linkType as AdminNavigationLinkType))
    errors.linkType = "올바른 링크 타입을 선택해주세요.";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    payload: {
      parentId: parseNullableNumber(formData.get("parentId")),
      menuKey,
      label,
      href,
      matchPath: parseNullableString(formData.get("matchPath")),
      linkType: linkType as AdminNavigationLinkType,
      contentSiteKey: parseNullableString(formData.get("contentSiteKey")),
      visible: parseBoolean(formData.get("visible")),
      headerVisible: parseBoolean(formData.get("headerVisible")),
      mobileVisible: parseBoolean(formData.get("mobileVisible")),
      lnbVisible: parseBoolean(formData.get("lnbVisible")),
      breadcrumbVisible: parseBoolean(formData.get("breadcrumbVisible")),
      defaultLanding: parseBoolean(formData.get("defaultLanding")),
      sortOrder: parseNullableNumber(formData.get("sortOrder")) ?? 0,
    },
  };
}

// ── 메뉴 생성 ────────────────────────────────────────────────────────────────
export async function createNavigationItemAction(
  _prev: NavigationFormState,
  formData: FormData,
): Promise<NavigationFormState> {
  const { payload, errors } = parsePayload(formData);
  if (errors) return { errors };

  try {
    await createAdminNavigationItem(payload!);
  } catch (err) {
    const msg = err instanceof AdminApiError ? err.message : "메뉴 생성에 실패했습니다.";
    return { message: msg };
  }

  revalidatePath("/admin/navigation");
  redirect("/admin/navigation");
}

// ── 메뉴 수정 ────────────────────────────────────────────────────────────────
export async function updateNavigationItemAction(
  id: number,
  _prev: NavigationFormState,
  formData: FormData,
): Promise<NavigationFormState> {
  const { payload, errors } = parsePayload(formData);
  if (errors) return { errors };

  try {
    await updateAdminNavigationItem(id, payload!);
  } catch (err) {
    const msg = err instanceof AdminApiError ? err.message : "메뉴 수정에 실패했습니다.";
    return { message: msg };
  }

  revalidatePath("/admin/navigation");
  revalidatePath(`/admin/navigation/${id}`);
  redirect("/admin/navigation");
}

// ── 메뉴 삭제 ────────────────────────────────────────────────────────────────
export async function deleteNavigationItemAction(id: number): Promise<void> {
  try {
    await deleteAdminNavigationItem(id);
  } catch (err) {
    const msg = err instanceof AdminApiError ? err.message : "메뉴 삭제에 실패했습니다.";
    throw new Error(msg);
  }

  revalidatePath("/admin/navigation");
  redirect("/admin/navigation");
}
