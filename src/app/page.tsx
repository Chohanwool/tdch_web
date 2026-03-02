import Image from "next/image";
import Link from "next/link";

interface QuickInfoCard {
  href: string;
  title: string;
  enTitle: string;
  description: string;
}

interface NewsPostPreview {
  href: string;
  category: string;
  title: string;
  date: string;
  thumbnail: string;
}

const quickInfoCards: QuickInfoCard[] = [
  {
    href: "/about",
    title: "교회소개",
    enTitle: "Church Intro",
    description: "교회의 비전과 인사말, 연혁을 한 번에 살펴보세요."
  },
  {
    href: "/about#service-times",
    title: "예배 시간 안내",
    enTitle: "Service Times",
    description: "주일예배와 평일 모임 시간을 한눈에 확인하세요."
  },
  {
    href: "/newcomer",
    title: "새가족 안내",
    enTitle: "Newcomer",
    description: "처음 오신 분들을 위한 등록 및 정착 안내입니다."
  },
  {
    href: "/contact#map",
    title: "오시는길/문의",
    enTitle: "Visit & Contact",
    description: "지도, 연락처, 카카오톡 채널 정보를 바로 확인하세요."
  }
];

const newsPosts: NewsPostPreview[] = [
  {
    href: "/news#bulletin",
    category: "주보",
    title: "3월 1주차 주보 안내 (더미)",
    date: "2026.03.02",
    thumbnail: "/images/main_bg_2.jpg"
  },
  {
    href: "/news#notice",
    category: "공지",
    title: "봄 학기 성경공부 신청 안내 (더미)",
    date: "2026.03.01",
    thumbnail: "/images/sample.jpg"
  },
  {
    href: "/sermons#setlist",
    category: "셋 리스트",
    title: "주일 1부 찬양 셋 리스트 (더미)",
    date: "2026.03.01",
    thumbnail: "/images/main_bg_3.jpg"
  },
  {
    href: "/newcomer",
    category: "새가족",
    title: "새가족 환영 모임 안내 (더미)",
    date: "2026.02.28",
    thumbnail: "/images/sample2.jpg"
  },
  {
    href: "/news#bulletin",
    category: "주보",
    title: "2월 4주차 주보 안내 (더미)",
    date: "2026.02.23",
    thumbnail: "/images/sample.jpg"
  },
  {
    href: "/news#notice",
    category: "공지",
    title: "금요 기도회 시간 변경 안내 (더미)",
    date: "2026.02.21",
    thumbnail: "/images/main_bg_2.jpg"
  },
  {
    href: "/sermons#setlist",
    category: "셋 리스트",
    title: "수요 예배 찬양 셋 리스트 (더미)",
    date: "2026.02.20",
    thumbnail: "/images/sample2.jpg"
  },
  {
    href: "/newcomer",
    category: "새가족",
    title: "새가족 등록 절차 요약 (더미)",
    date: "2026.02.18",
    thumbnail: "/images/main_bg_3.jpg"
  }
];

export default function Home() {
  const youtubeUrl =
    process.env.NEXT_PUBLIC_YOUTUBE_URL ??
    "https://www.youtube.com/@%EB%8D%94%EC%A0%9C%EC%9E%90%EA%B5%90%ED%9A%8C";

  return (
    <div className="section-shell flex w-full flex-col pb-16 pt-0 md:pb-20 md:pt-0">
      <section className="relative left-1/2 w-[min(2200px,122vw)] -translate-x-1/2 overflow-hidden rounded-b-[2rem] shadow-[0_20px_46px_rgba(16,33,63,0.2)]">
        <div className="relative min-h-[430px] md:min-h-[560px]">
          <Image
            src="/images/sample2.jpg"
            alt="더 제자교회 메인 히어로 이미지"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/78 via-ink/52 to-ink/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent" />

          <div className="relative z-10 flex min-h-[430px] items-end pb-8 pt-24 md:min-h-[560px] md:pb-10 md:pt-28">
            <div className="section-shell w-full">
              <div className="grid items-end gap-2 lg:grid-cols-[minmax(0,1fr),286px] lg:items-stretch lg:gap-2">
                <div className="w-full max-w-xl space-y-4 rounded-2xl bg-black/30 px-4 py-5 text-ivory backdrop-blur-[2px] md:space-y-5 md:max-w-[680px] md:px-5 md:py-6">
                  <p className="chip w-fit bg-gold/30 text-ivory">VISION</p>
                  <h1 className="font-serif text-4xl leading-[1.18] md:text-6xl">
                    성령으로
                    <br />
                    제자삼는 교회
                  </h1>
                  <div className="mt-2 text-base font-medium leading-relaxed text-ivory/90 md:mt-3 md:text-lg">
                    <p>
                      예수께서 나아와 말씀하여 이르시되 하늘과 땅의 모든 권세를 내게 주셨으니
                      <br />
                      너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의 이름으로 세례를 베풀고
                      <br />
                      내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라
                    </p>
                    <p className="flex items-end justify-between gap-3">
                      <span>볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라</span>
                      <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white md:text-base">
                        마태복음 28:18-20
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 lg:h-full lg:grid-rows-2 lg:gap-4">
                  <Link
                    href="/about#location"
                    id="hero-location-card"
                    className="group flex h-[138px] flex-col items-center justify-center rounded-[2rem] border border-white/70 bg-[#f1f3f5] px-4 text-center text-ink shadow-[0_18px_26px_rgba(16,33,63,0.18)] transition duration-300 hover:-translate-y-1 lg:h-full"
                  >
                    <lord-icon
                      src="/images/wired-outline-18-location-pin-hover-jump.json"
                      trigger="hover"
                      target="#hero-location-card"
                      style={{ width: "72px", height: "72px" }}
                    ></lord-icon>
                    <p className="mt-1 text-[1.72rem] font-bold leading-none tracking-[-0.01em]">오시는 길</p>
                    <p className="mt-1 text-[1.02rem] font-medium leading-none text-ink/65">Location</p>
                  </Link>

                  <a
                    href={youtubeUrl}
                    id="hero-youtube-card"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-[138px] flex-col items-center justify-center rounded-[2rem] border border-white/70 bg-[#f1f3f5] px-4 text-center text-ink shadow-[0_18px_26px_rgba(16,33,63,0.18)] transition duration-300 hover:-translate-y-1 lg:h-full"
                  >
                    <lord-icon
                      src="/images/wired-outline-2547-logo-youtube-hover-pinch.json"
                      trigger="hover"
                      target="#hero-youtube-card"
                      style={{ width: "72px", height: "72px" }}
                    ></lord-icon>
                    <p className="mt-1 text-[1.48rem] font-bold leading-none tracking-[-0.01em]">
                      유튜브 채널
                    </p>
                    <p className="mt-1 text-[0.94rem] font-medium leading-none text-ink/65">
                      Youtube Channel
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 px-2 py-2 text-center md:mt-12">
        <h2 className="font-serif text-3xl font-bold leading-tight text-ink md:text-5xl">
          더 제자교회에 오신 것을 환영합니다
        </h2>
      </section>

      <section className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickInfoCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-3xl border border-cedar/12 bg-white/92 p-5 shadow-[0_12px_28px_rgba(16,33,63,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(16,33,63,0.16)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cedar/70">{card.enTitle}</p>
            <h2 className="mt-2 text-xl font-bold leading-tight text-ink">{card.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/72">{card.description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-11 grid gap-4 lg:grid-cols-[1.2fr,1fr]">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="group overflow-hidden rounded-3xl border border-cedar/14 bg-white shadow-[0_16px_34px_rgba(16,33,63,0.15)]"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/main_bg_3.jpg"
              alt="최신 예배 설교 하이라이트"
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-black/8" />
            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
              Featured Sermon
            </div>
          </div>
          <div className="space-y-2 p-5">
            <h2 className="text-2xl font-bold leading-tight text-ink">말씀 / 예배 하이라이트</h2>
            <p className="text-sm leading-relaxed text-ink/75">
              최신 주일 예배 설교 영상과 핵심 메시지를 홈에서 바로 확인하세요. (더미 데이터)
            </p>
          </div>
        </a>

        <Link
          href="/news#bulletin"
          className="group overflow-hidden rounded-3xl border border-cedar/14 bg-white shadow-[0_16px_34px_rgba(16,33,63,0.13)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(16,33,63,0.16)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/main_bg_2.jpg"
              alt="금주 주보 썸네일"
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/5" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
              This Week Bulletin
            </span>
          </div>
          <div className="space-y-2 p-5">
            <h3 className="text-2xl font-bold leading-tight text-ink">금주 주보</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              이번 주 예배 순서와 교회 소식을 한눈에 확인하세요. (더미 데이터)
            </p>
          </div>
        </Link>
      </section>

      <section className="mt-11 rounded-3xl border border-cedar/14 bg-white/95 p-5 shadow-[0_16px_34px_rgba(16,33,63,0.12)] md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cedar/70">Church News</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">교회 소식</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-cedar/10 px-3 py-1 text-xs font-semibold text-cedar">주보</span>
            <span className="rounded-full bg-cedar/10 px-3 py-1 text-xs font-semibold text-cedar">공지</span>
            <span className="rounded-full bg-cedar/10 px-3 py-1 text-xs font-semibold text-cedar">
              셋 리스트
            </span>
            <span className="rounded-full bg-cedar/10 px-3 py-1 text-xs font-semibold text-cedar">새가족</span>
          </div>
        </div>

        <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto pb-1">
          {newsPosts.map((post) => (
            <Link
              key={`${post.category}-${post.title}`}
              href={post.href}
              className="group w-[260px] min-w-[260px] overflow-hidden rounded-2xl border border-cedar/12 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(16,33,63,0.14)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={`${post.category} 썸네일`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="space-y-2 p-4">
                <span className="inline-flex rounded-full bg-cedar/12 px-2.5 py-1 text-xs font-semibold text-cedar">
                  {post.category}
                </span>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink">{post.title}</h3>
                <p className="text-xs font-medium text-ink/55">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
