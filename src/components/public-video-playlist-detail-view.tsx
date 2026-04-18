import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import PageHeader from "@/components/page-header";
import PublicShortformVideoDetailExperience from "@/components/public-shortform-video-detail-experience";
import type { PublicPlaylistDetail, PublicVideoDetail, PublicVideoSummary } from "@/lib/videos-api";

function formatLongDate(value: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function buildMetaLine(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(" · ");
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 6.5V17.5L17 12L8 6.5Z" fill="currentColor" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 5H19V10M19 5L11 13M10 7H8.6C7.48 7 6.92 7 6.492 7.218C6.115 7.41 5.81 7.715 5.618 8.092C5.4 8.52 5.4 9.08 5.4 10.2V15.4C5.4 16.52 5.4 17.08 5.618 17.508C5.81 17.885 6.115 18.19 6.492 18.382C6.92 18.6 7.48 18.6 8.6 18.6H13.8C14.92 18.6 15.48 18.6 15.908 18.382C16.285 18.19 16.59 17.885 16.782 17.508C17 17.08 17 16.52 17 15.4V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.8V12L14.8 13.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 16L16 8M16 8H10.5M16 8V13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LongformRelatedCard({ video }: { video: PublicVideoSummary }) {
  const publishedAt = formatLongDate(video.publishedAt);
  const metaLine = buildMetaLine([video.scriptureReference, video.preacherName, "The 제자교회"]);

  return (
    <Link
      href={video.href}
      className="group flex items-center gap-3 rounded-[12px] px-2 py-1 transition hover:bg-white/70"
    >
      <div className="relative h-[78px] w-[120px] shrink-0 overflow-hidden rounded-[12px] bg-[#242c39]">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover opacity-70 transition duration-300 group-hover:scale-[1.03]"
            sizes="120px"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#242c39]/78" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[14px] font-medium leading-[1.55] text-[#10213f] md:line-clamp-1">
          {video.title}
        </p>
        {metaLine ? (
          <p className="mt-1 line-clamp-2 text-[12px] leading-[1.35] text-[#10213f]/78">
            {metaLine}
          </p>
        ) : null}
        {publishedAt ? (
          <p className="mt-1 text-[12px] leading-[1.3] text-[#10213f]">
            {publishedAt} 업로드
          </p>
        ) : null}
      </div>
    </Link>
  );
}

function DetailAccordion({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <details className="group rounded-[20px] bg-[#f2f2f2] px-[30px] open:pb-7">
      <summary className="flex h-[60px] cursor-pointer list-none items-center justify-between text-[#10213f]">
        <span className="type-accordion-title font-medium">{title}</span>
        <ChevronIcon className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="whitespace-pre-line pb-1 text-[15px] leading-8 text-[#334155]">
        {content}
      </div>
    </details>
  );
}

function LongformDetailView({
  playlist,
  video,
}: {
  playlist: PublicPlaylistDetail;
  video: PublicVideoDetail;
}) {
  const publishedAt = formatLongDate(video.publishedAt);
  const metaLine = buildMetaLine([video.scriptureReference, video.preacherName]);
  const taxonomyLine = buildMetaLine(["말씀 / 설교", playlist.groupLabel ?? "예배 영상", publishedAt]);
  const descriptionContent = video.summary || video.description;
  const scriptureContent = buildMetaLine([video.scriptureReference, video.scriptureBody])
    ? [video.scriptureReference, video.scriptureBody].filter(Boolean).join("\n\n")
    : null;

  return (
    <div className="pb-16">
      <PageHeader title={video.title} subtitle={playlist.title} />
      <Breadcrumb />

      <section className="section-shell py-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,935px)_367px] xl:items-start">
          <div className="min-w-0 space-y-4">
            <div className="w-full overflow-hidden rounded-[16px] bg-[#242c39] shadow-[0_18px_40px_rgba(16,33,63,0.12)]">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#242c39]">
                <iframe
                  title={video.title}
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  className="absolute inset-0 block h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 via-black/30 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 px-6 py-4 text-white">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full border border-white/30 bg-white/95" />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-[14px] font-bold leading-[1.2] md:line-clamp-1 md:text-[16px]">
                        {video.title}
                        {metaLine ? `  |  ${metaLine}` : ""}
                        {"  |  The 제자교회"}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-white/85 md:text-[12px]">The 제자 교회</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 space-y-2 px-5 py-4 md:px-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="rounded-full bg-black/30 px-2 py-[4px] text-[12px] font-medium text-white">
                      0:00 {video.description ? "/ --:--" : ""}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white">
                      <ExpandIcon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/35" />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full text-white">
                        <ShareIcon className="h-5 w-5" />
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full text-white">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <Link
                        href={playlist.fullPath}
                        className="rounded-full bg-black/30 px-4 py-2 text-[14px] font-medium text-white backdrop-blur-sm transition hover:bg-black/40"
                      >
                        동영상 더보기
                      </Link>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[14px] font-bold tracking-[-0.04em] text-white"
                      >
                        <PlayIcon className="h-[30px] w-[30px] rounded-full bg-white/95 p-[4px] text-[#242c39]" />
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 px-1">
              <div className="space-y-4 text-[#10213f]">
                <h1 className="line-clamp-2 text-[30px] font-bold leading-[1.15] tracking-[-0.04em] lg:line-clamp-1 md:text-[24px]">
                  {video.title}
                  {metaLine ? ` | ${metaLine}` : ""}
                  {" | The 제자교회"}
                </h1>
                {taxonomyLine ? (
                  <p className="text-[16px] font-normal leading-none text-[#10213f]/90">
                    {taxonomyLine}
                  </p>
                ) : null}
              </div>

              <div className="space-y-[15px]">
                {descriptionContent ? <DetailAccordion title="영상 설명" content={descriptionContent} /> : null}
                {scriptureContent ? <DetailAccordion title="본문 말씀" content={scriptureContent} /> : null}
              </div>
            </div>
          </div>

          <aside className="rounded-[16px] border border-[#e6e7eb] bg-[#f7f8fb] p-[18px]">
            <div className="flex items-center justify-between">
              <div className="space-y-[10px] text-[#10213f]">
                <p className="text-[12px] font-normal uppercase tracking-[0.18em]">Related Videos</p>
                <h2 className="text-[14px] font-bold leading-none">관련 영상</h2>
              </div>
              <Link
                href={playlist.fullPath}
                className="text-[12px] font-medium leading-none text-[#2a4f8f] transition hover:text-[#1f3b6d]"
              >
                전체 보기
              </Link>
            </div>

            <div className="mt-6 space-y-[18px]">
              {video.related.map((related) => (
                <LongformRelatedCard key={related.videoId} video={related} />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default function PublicVideoPlaylistDetailView({
  playlist,
  video,
  playlistVideos,
}: {
  playlist: PublicPlaylistDetail;
  video: PublicVideoDetail;
  playlistVideos?: PublicVideoSummary[];
}) {
  if (video.contentForm === "SHORTFORM") {
    return (
      <PublicShortformVideoDetailExperience
        playlist={playlist}
        initialVideo={video}
        playlistVideos={playlistVideos ?? []}
      />
    );
  }

  return <LongformDetailView playlist={playlist} video={video} />;
}
