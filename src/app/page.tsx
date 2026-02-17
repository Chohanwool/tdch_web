import Link from "next/link";

import SectionTitle from "@/components/section-title";
import { newsPosts, serviceTimes, sermons } from "@/lib/site-data";

const youtube = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#";

const quickHighlights = [
  { label: "개척 시작", value: "2026" },
  { label: "주일예배", value: "오전 11:00" },
  { label: "첫방문 안내", value: "상시 운영" }
];

export default function Home() {
  return (
    <div className="section-shell flex w-full flex-col gap-12 pb-16 pt-10 md:gap-16 md:pb-20 md:pt-12">
      <section className="fade-up surface-card-strong grid gap-8 rounded-3xl p-6 md:p-10 lg:grid-cols-[1.15fr,0.85fr] lg:gap-10 lg:p-12">
        <div>
          <p className="chip bg-clay/12 text-clay">The Disciple Church</p>
          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,6vw,3.4rem)] leading-tight text-ink">
            작은 시작이지만,
            <br />
            복음으로 도시를 섬기는
            <br />
            더 제자교회입니다.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink/70 md:text-base">
            누구나 편하게 오실 수 있는 교회가 되겠습니다. 주일 예배와 새가족 안내를 확인하고 함께
            예배해 주세요.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/newcomer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-clay px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-cedar sm:w-auto"
            >
              새가족 등록하기
            </Link>
            <a
              href={youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cedar/30 px-5 py-3 text-sm font-semibold text-cedar transition hover:border-clay hover:text-clay sm:w-auto"
            >
              예배 영상 보기
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickHighlights.map((item) => (
              <article key={item.label} className="rounded-2xl border border-cedar/10 bg-white/65 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-cedar/70">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-ink">{item.value}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="surface-card rounded-3xl p-5 md:p-6">
          <p className="chip bg-moss/10 text-moss">이번 주 예배</p>
          <div className="mt-4 space-y-3">
            {serviceTimes.map((item) => (
              <div key={item.title} className="rounded-xl border border-cedar/10 bg-white/70 p-4">
                <p className="text-xs font-semibold text-cedar/80">{item.title}</p>
                <p className="mt-1 text-base font-semibold text-ink">{item.time}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-ink px-4 py-3 text-sm leading-relaxed text-ivory/90">
            “말씀 안에서 서로를 세우는 공동체가 되겠습니다.”
          </p>
        </aside>
      </section>

      <section className="space-y-5 md:space-y-6">
        <SectionTitle eyebrow="Sermons" title="최근 말씀" />
        <div className="stagger grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <article key={sermon.title} className="surface-card rounded-2xl p-5 md:p-6">
              <p className="text-xs text-ink/50">{sermon.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{sermon.title}</h3>
              <p className="mt-1 text-sm text-cedar">{sermon.pastor}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{sermon.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5 md:space-y-6">
        <SectionTitle eyebrow="News" title="이번 주 교회 소식" />
        <div className="stagger grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newsPosts.map((post) => (
            <article key={post.title} className="surface-card rounded-2xl p-5 md:p-6">
              <span className="chip bg-moss/10 text-moss">{post.category}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{post.title}</h3>
              <p className="mt-1 text-xs text-ink/50">{post.date}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{post.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card-strong rounded-3xl p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="chip bg-clay/12 text-clay">First Visit</p>
            <h2 className="font-serif text-2xl text-ink md:text-3xl">처음 오셨나요?</h2>
            <p className="text-sm leading-relaxed text-ink/70 md:text-base">
              예배 전에 연락 주시면 좌석 안내와 새가족 안내를 도와드립니다.
            </p>
          </div>
          <Link
            href="/newcomer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-cedar px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-ink"
          >
            새가족 안내 페이지로
          </Link>
        </div>
      </section>
    </div>
  );
}
