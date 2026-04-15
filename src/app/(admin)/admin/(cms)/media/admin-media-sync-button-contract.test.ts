import AdminMediaPage from "@/app/(admin)/admin/(cms)/media/page";
import AdminMediaSyncButton from "@/app/(admin)/admin/(cms)/media/_components/admin-media-sync-button";
import { runAdminMediaSyncAction } from "@/app/(admin)/admin/(cms)/media/actions";

void AdminMediaPage;
void AdminMediaSyncButton;
void runAdminMediaSyncAction;

type AdminMediaPageProps = Parameters<typeof AdminMediaPage>[0];
type AdminMediaSyncButtonProps = Parameters<typeof AdminMediaSyncButton>[0];
type RunAdminMediaSyncActionResult = Awaited<ReturnType<typeof runAdminMediaSyncAction>>;

const _assertPageProps: AdminMediaPageProps = {};

void _assertPageProps;

const _assertButtonProps: AdminMediaSyncButtonProps = {
  action: runAdminMediaSyncAction,
};

void _assertButtonProps;

const _assertActionResult: RunAdminMediaSyncActionResult = {
  success: true,
  message: "수동 sync를 완료했습니다. 성공 1건, 실패 0건",
  messageKey: Date.now(),
};

void _assertActionResult;
