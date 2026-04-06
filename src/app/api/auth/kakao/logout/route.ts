import { NextResponse } from "next/server";

const DEFAULT_CALLBACK_PATH = "/admin/login";

function resolveCallbackPath(rawValue: string | null) {
  if (!rawValue) {
    return DEFAULT_CALLBACK_PATH;
  }

  if (!rawValue.startsWith("/") || rawValue.startsWith("//")) {
    return DEFAULT_CALLBACK_PATH;
  }

  return rawValue;
}

function isSupportedKakaoLogoutRedirect(url: URL) {
  if (url.protocol !== "https:") {
    return false;
  }

  return !url.port || url.port === "443";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const callbackPath = resolveCallbackPath(requestUrl.searchParams.get("callbackUrl"));
  const callbackUrl = new URL(callbackPath, requestUrl.origin);

  if (!isSupportedKakaoLogoutRedirect(callbackUrl)) {
    return NextResponse.redirect(callbackUrl);
  }

  const clientId = process.env.KAKAO_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(callbackUrl);
  }

  const kakaoLogoutUrl = new URL("https://kauth.kakao.com/oauth/logout");
  kakaoLogoutUrl.searchParams.set("client_id", clientId);
  kakaoLogoutUrl.searchParams.set("logout_redirect_uri", callbackUrl.toString());

  return NextResponse.redirect(kakaoLogoutUrl);
}
