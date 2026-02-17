import SectionTitle from "@/components/section-title";
import { sermons } from "@/lib/site-data";

const youtube = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#";

export default function SermonsPage() {
  return (
    <div className="section-shell space-y-8 pb-16 pt-10 md:space-y-10 md:pb-20 md:pt-12">
      <SectionTitle
        eyebrow="Sermons"
        title="말씀 / 설교"
        description="주일 설교 요약과 다시보기 링크를 매주 업데이트합니다."
      />

      <section className="surface-card-strong rounded-3xl p-5 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-relaxed text-ink/75 md:text-base">
            최근 설교는 유튜브 채널과 함께 제공됩니다. 지난 설교를 묵상 자료로 활용해보세요.
          </p>
          <a
            href={youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-cedar px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-ink"
          >
            유튜브 채널 보기
          </a>
        </div>
      </section>

      <div className="stagger space-y-4 md:space-y-5">
        {sermons.map((sermon) => (
          <article key={sermon.title} className="surface-card rounded-2xl p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-clay/12 text-clay">Sunday Message</span>
              <p className="text-xs text-ink/55">{sermon.date}</p>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-ink">{sermon.title}</h3>
            <p className="mt-1 text-sm font-semibold text-cedar">{sermon.pastor}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{sermon.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
