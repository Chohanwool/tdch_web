import type { AdminMediaDiscoveryActionItem } from "@/app/(admin)/admin/(cms)/media/actions";
import AdminMediaDiscoveryResultsDialog from "@/app/(admin)/admin/(cms)/media/_components/admin-media-discovery-results-dialog";

void AdminMediaDiscoveryResultsDialog;

type AdminMediaDiscoveryResultsDialogProps = Parameters<typeof AdminMediaDiscoveryResultsDialog>[0];

const items: AdminMediaDiscoveryActionItem[] = [
  {
    siteKey: "messages",
    menuName: "Sunday Worship",
    contentKind: "LONG_FORM",
    status: "DRAFT",
    editHref: "/admin/media/messages",
  },
];

const _assertDialogProps: AdminMediaDiscoveryResultsDialogProps = {
  open: true,
  discoveredCount: 1,
  skippedCount: 2,
  items,
  onClose: () => undefined,
};

void _assertDialogProps;
