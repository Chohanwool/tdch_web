import type { MediaListResponse } from "@/lib/media-api";
import ShortsInfiniteGrid from "@/app/(site)/sermons/components/shorts-infinite-grid";

interface ShortsArchivePageProps {
  rootHref: string;
  siteKey?: string;
  response: MediaListResponse | null;
  title?: string;
  subtitle?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function ShortsArchivePage({
  rootHref,
  siteKey,
  response,
  title,
  subtitle = "Shorts",
  emptyTitle,
  emptyDescription,
}: ShortsArchivePageProps) {
  const items = response?.items ?? [];
  const menuTitle = title ?? response?.menu.name ?? "쇼츠";
  const resolvedEmptyTitle = emptyTitle ?? `${menuTitle} 영상이 아직 준비되지 않았습니다.`;
  const resolvedEmptyDescription =
    emptyDescription ?? "백엔드 sync가 완료되면 이 페이지에서 쇼츠 목록을 확인할 수 있습니다.";

  if (items.length === 0) {
    return (
      <section className="rounded-[24px] px-6 py-12">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-cedar/60">{subtitle}</p>
        <h2 className="mt-3 text-[1.8rem] font-bold tracking-[-0.03em] text-ink">{resolvedEmptyTitle}</h2>
        <p className="mt-4 text-[1rem] leading-8 text-ink/68">
          {resolvedEmptyDescription}
        </p>
      </section>
    );
  }

  return (
    <section className="section-shell section-shell--wide px-5 py-6 md:px-6 md:py-7">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-cedar/60">{subtitle}</p>
          <h2 className="mt-2 text-[1.45rem] font-bold tracking-[-0.03em] text-ink">{menuTitle}</h2>
        </div>
      </div>

      <ShortsInfiniteGrid
        rootHref={rootHref}
        siteKey={siteKey ?? response?.menu.slug ?? ""}
        initialItems={items}
        initialPage={response?.page ?? 0}
        totalPages={response?.totalPages ?? 0}
        pageSize={response?.size ?? 24}
      />
    </section>
  );
}
