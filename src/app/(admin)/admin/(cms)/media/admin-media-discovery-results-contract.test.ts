import { discoverAdminPlaylistsAction } from "@/app/(admin)/admin/(cms)/media/actions";

type DiscoverPlaylistsActionResult = Awaited<ReturnType<typeof discoverAdminPlaylistsAction>>;

type DiscoveredDraftItemContract = {
  siteKey: string;
  menuName: string;
  contentKind: "LONG_FORM" | "SHORT";
  status: "DRAFT";
  editHref: `/admin/media/${string}`;
};

// This contract should exist once discovery returns the rows needed for a result panel.
const _assertDiscoveryResultPayload: DiscoverPlaylistsActionResult = {
  success: true,
  discoveredCount: 2,
  skippedCount: 0,
  items: [
    {
      siteKey: "messages",
      menuName: "Sunday Worship",
      contentKind: "LONG_FORM",
      status: "DRAFT",
      editHref: "/admin/media/messages",
    },
    {
      siteKey: "kids",
      menuName: "Kids Praise",
      contentKind: "SHORT",
      status: "DRAFT",
      editHref: "/admin/media/kids",
    },
  ] satisfies DiscoveredDraftItemContract[],
};

void _assertDiscoveryResultPayload;
