import {
  issueAdminUploadToken,
  toFriendlyAdminUploadMessage,
  type AdminUploadAssetKind,
  type AdminUploadTokenRequest,
  type AdminUploadTokenResponse,
} from "@/lib/admin-upload-api";

const _assertInlineImageKind: AdminUploadAssetKind = "INLINE_IMAGE";
const _assertFileAttachmentKind: AdminUploadAssetKind = "FILE_ATTACHMENT";

const _assertTokenRequest: AdminUploadTokenRequest = {
  kind: _assertInlineImageKind,
  boardId: "board-123",
  maxByteSize: 5_000_000,
  allowedMimeTypes: ["image/png", "image/jpeg"],
};

const _assertMinimalTokenRequest: AdminUploadTokenRequest = {
  kind: _assertFileAttachmentKind,
};

async function assertIssueAdminUploadTokenContract() {
  const response = await issueAdminUploadToken("admin-42", _assertTokenRequest);
  const _assertRawToken: string = response.rawToken;

  return _assertRawToken;
}

const _assertTokenResponse: AdminUploadTokenResponse = {
  rawToken: "upload-token",
};

const _assertFriendlyMessage: string = toFriendlyAdminUploadMessage(
  new Error("upstream failed"),
  "업로드 토큰을 발급하지 못했습니다.",
);

void _assertInlineImageKind;
void _assertFileAttachmentKind;
void _assertMinimalTokenRequest;
void _assertTokenResponse;
void _assertFriendlyMessage;
void assertIssueAdminUploadTokenContract;
