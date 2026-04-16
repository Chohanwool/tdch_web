import Link from "next/link";
import PageHeader from "@/components/page-header";
import type { PublicSermonList, PublicSermonSummary, SermonContentForm } from "@/lib/sermons-api";

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function SermonTabs({ currentForm }: { currentForm: SermonContentForm }) {
  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="section-shell flex gap-2 overflow-x-auto py-3">
        {[
          { href: "/sermons", label: "롱폼 설교", form: "LONGFORM" as const },
          { href: "/sermons/shorts", label: "숏폼 설교", form: "SHORTFORM" as const },
        ].map((tab) => {
          const active = tab.form === currentForm;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                active
                  ? "bg-[#13243a] text-white"
                  : "bg-[#f8fafc] text-[#475569] hover:bg-[#edf4ff] hover:text-[#2d5da8]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SummaryMeta({ sermon }: { sermon: PublicSermonSummary }) {
  const publishedAt = formatDate(sermon.publishedAt);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#64748b]">
      {publishedAt && <span>{publishedAt}</span>}
      {sermon.preacherName && <span>{sermon.preacherName}</span>}
      {sermon.scriptureReference && <span>{sermon.scriptureReference}</span>}
    </div>
  );
}

function LongformCard({ sermon }: { sermon: PublicSermonSummary }) {
  return (
    <Link
      href={sermon.href}
      className="grid gap-4 rounded-3xl border border-[#dbe4f0] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[280px_minmax(0,1fr)]"
    >
      <div className="overflow-hidden rounded-2xl bg-[#0f172a]">
        {sermon.thumbnailUrl ? (
          <img src={sermon.thumbnailUrl} alt={sermon.title} className="aspect-video h-full w-full object-cover" />
        ) : (
          <div className="aspect-video bg-[#e2e8f0]" />
        )}
      </div>
      <div className="min-w-0">
        <SummaryMeta sermon={sermon} />
        <h2 className="mt-3 text-xl font-bold text-[#13243a]">{sermon.title}</h2>
        <p className="mt-3 line-clamp-3 text-[14px] leading-7 text-[#475569]">
          {sermon.summary || "설교 요약이 아직 등록되지 않았습니다."}
        </p>
      </div>
    </Link>
  );
}

function ShortformCard({ sermon }: { sermon: PublicSermonSummary }) {
  return (
    <Link
      href={sermon.href}
      className="overflow-hidden rounded-[28px] border border-[#dbe4f0] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="overflow-hidden bg-[#0f172a]">
        {sermon.thumbnailUrl ? (
          <img src={sermon.thumbnailUrl} alt={sermon.title} className="aspect-[9/14] h-full w-full object-cover" />
        ) : (
          <div className="aspect-[9/14] bg-[#e2e8f0]" />
        )}
      </div>
      <div className="space-y-2 p-4">
        <SummaryMeta sermon={sermon} />
        <h2 className="line-clamp-2 text-[17px] font-bold leading-6 text-[#13243a]">{sermon.title}</h2>
        <p className="line-clamp-2 text-[13px] leading-6 text-[#64748b]">
          {sermon.summary || "설교 요약이 아직 등록되지 않았습니다."}
        </p>
      </div>
    </Link>
  );
}

export default function PublicSermonListView({
  sermons,
}: {
  sermons: PublicSermonList;
}) {
  const isShortform = sermons.form === "SHORTFORM";

  return (
    <div className="pb-16">
      <PageHeader
        title={isShortform ? "숏폼 설교" : "설교"}
        subtitle={isShortform ? "Short Sermons" : "Sermons"}
      />
      <SermonTabs currentForm={sermons.form} />

      <section className="section-shell py-10">
        {!isShortform && sermons.featured && (
          <div className="mb-8">
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2d5da8]">
              Latest Message
            </div>
            <LongformCard sermon={sermons.featured} />
          </div>
        )}

        {isShortform ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sermons.items.map((sermon) => (
              <ShortformCard key={sermon.videoId} sermon={sermon} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sermons.items.map((sermon) => (
              <LongformCard key={sermon.videoId} sermon={sermon} />
            ))}
          </div>
        )}

        {sermons.featured === null && sermons.items.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white px-6 py-12 text-center text-[14px] text-[#64748b]">
            아직 공개된 설교가 없습니다.
          </div>
        )}
      </section>
    </div>
  );
}
