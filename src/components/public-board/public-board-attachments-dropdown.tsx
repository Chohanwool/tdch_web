"use client";

import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu";

type AttachmentItem = {
  id: string;
  storedPath: string;
  filename: string;
  byteSize: number;
};

type PublicBoardAttachmentsDropdownProps = {
  attachments: AttachmentItem[];
};

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M10 3.5v7m0 0 3-3m-3 3-3-3M4.5 13.5v1A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5v-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatByteSize(value: number) {
  if (value >= 1024 * 1024) {
    return `${(value / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (value >= 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${value} B`;
}

function buildDownloadHref(item: AttachmentItem) {
  const params = new URLSearchParams({
    storedPath: item.storedPath,
    filename: item.filename,
  });
  return `/api/public/attachments/download?${params.toString()}`;
}

function triggerAttachmentDownload(item: AttachmentItem) {
  const anchor = document.createElement("a");
  anchor.href = buildDownloadHref(item);
  anchor.download = item.filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

export default function PublicBoardAttachmentsDropdown({
  attachments,
}: PublicBoardAttachmentsDropdownProps) {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const downloadableAttachments = useMemo(
    () => attachments.filter((attachment) => attachment.storedPath),
    [attachments],
  );

  if (downloadableAttachments.length === 0) {
    return null;
  }

  async function handleDownloadAll() {
    if (isDownloadingAll) {
      return;
    }

    setIsDownloadingAll(true);

    try {
      for (const attachment of downloadableAttachments) {
        triggerAttachmentDownload(attachment);
        await new Promise((resolve) => window.setTimeout(resolve, 180));
      }
    } finally {
      setIsDownloadingAll(false);
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="type-body-small inline-flex shrink-0 items-center gap-1 self-start font-semibold text-cedar underline underline-offset-4 transition hover:text-site-ink"
          aria-label="첨부파일 다운로드 메뉴 열기"
        >
          첨부파일 다운로드
          <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[260px]">
        <DropdownMenuLabel>첨부 파일</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              void handleDownloadAll();
            }}
            disabled={isDownloadingAll}
            className="flex items-center justify-between gap-4"
          >
            <span className="inline-flex items-center gap-2">
              <DownloadIcon />
              {isDownloadingAll ? "일괄 다운로드 중..." : "전체 다운로드"}
            </span>
            <span className="type-label text-site-muted">{downloadableAttachments.length}개</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {downloadableAttachments.map((attachment) => (
            <DropdownMenuItem
              key={attachment.id}
            onSelect={(event) => {
              event.preventDefault();
              triggerAttachmentDownload(attachment);
            }}
            className="flex items-center justify-between gap-4"
          >
              <span className="min-w-0 truncate text-site-ink">{attachment.filename}</span>
              <span className="type-label shrink-0 text-site-muted">{formatByteSize(attachment.byteSize)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
