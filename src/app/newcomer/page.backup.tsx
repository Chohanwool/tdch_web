import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import NewcomerFaqAccordion from "./components/newcomer-faq-accordion.backup";
import Breadcrumb from "@/components/breadcrumb";
import PageHeader from "@/components/page-header";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const newcomerIntroParagraphs = [
  "The 제자교회는 예수님의 지상명령에 따라 제자를 삼고, 제자를 삼는 제자를 양육합니다.",
  "필리핀 17년 선교 사역의 열매로 정립된 체계적인 제자훈련 시스템을 통해 4세대까지 재생산하는 제자를 세웁니다.",
] as const;

const newcomerVisionQuote =
  "그러므로 너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의 이름으로 침례를 베풀고 내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라";

const newcomerCoreValues = [
  {
    number: "01",
    title: "기도",
    description: "위로부터 부어지는 능력을 받는 교회",
  },
  {
    number: "02",
    title: "전도",
    description: "제자 삼는 교회 (예수님의 3대 사역)",
  },
  {
    number: "03",
    title: "침례",
    description: "성령공동체",
  },
  {
    number: "04",
    title: "훈련",
    description: "모든 것을 가르쳐 지키게 하는 교회",
  },
  {
    number: "05",
    title: "선교",
    description: "함께하는 교회 (땅 끝까지)",
  },
] as const;

const newcomerGettingStartedSteps = [
  {
    number: "01",
    title: "첫 방문",
    details: ["주일 예배 참석", "새가족부서 인사", "환영 선물 수령", "새가족 카드 작성"],
  },
  {
    number: "02",
    title: "새가족 환영",
    details: ["담임목사님 인사", "새가족부 교사 연결", "교회 소개 책자 제공", "소그룹 안내"],
  },
  {
    number: "03",
    title: "새가족 양육 신청",
    details: ["5주 과정 안내", "교재 무료 제공", "담당 교사 배정", "일정 조율"],
  },
  {
    number: "04",
    title: "침례 및 등록",
    details: ["새가족 양육 5주 이수", "침례 신청", "침례식", "정식 교인 등록"],
  },
  {
    number: "05",
    title: "제자 훈련 시작",
    details: ["1단계 제자훈련 신청(12주)", "소그룹 배정", "섬김 사역 안내", "평생 제자도의 시작"],
  },
] as const;

const newcomerFaqItems = [
  {
    question: "새가족 양육은 꼭 받아야 하나요?",
    answer:
      "침례를 받고 정식 교인이 되기 위해서는 새가족 양육 5주 과정을 이수해야 합니다. 신앙의 기초를 든든히 하고 교회 가족이 되는 중요한 과정입니다.",
  },
  {
    question: "양육은 언제 시작하나요?",
    answer: "매월 첫째 주에 새로운 기수가 시작됩니다. 연중 언제든지 신청 가능합니다.",
  },
  {
    question: "양육 시간은 어떻게 되나요?",
    answer: "주일 오후 1시 또는 수요일 저녁 7시 중 선택 가능합니다. (각 60-90분 소요)",
  },
  {
    question: "신앙이 확실하지 않아도 받을 수 있나요?",
    answer:
      "물론입니다! 새가족 양육은 바로 그런 분들을 위한 과정입니다. 하나님, 인간, 예수님, 교회, 제자에 대해 차근차근 배우게 됩니다.",
  },
  {
    question: "양육비는 얼마인가요?",
    answer: "모든 양육은 무료입니다. 교재도 무료로 제공됩니다.",
  },
  {
    question: "혼자 오기 부담스러워요.",
    answer: "가족, 친구와 함께 오셔도 좋습니다. 담당 교사가 친절하게 안내해 드립니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "새가족 안내 | The 제자교회",
  description: "The 제자교회 새가족 안내와 제자 양육 비전을 소개합니다.",
};

const koreanSectionTitleClassName =
  "type-section-title font-[var(--font-serif)] font-bold text-ink";

const koreanSubsectionTitleClassName =
  "type-subsection-title font-[var(--font-serif)] font-bold text-ink";

export default function NewcomerPageBackup() {
  return (
    <div className="flex w-full flex-col">
      <PageHeader
        title="새가족 안내"
        subtitle="NEWCOMER"
        backgroundImageUrl="/images/main_bg/main_bg_sec1.png"
      />
      <Breadcrumb />
      <main className="pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-20">
        <section
          aria-labelledby="newcomer-intro-title"
          className="section-shell section-shell--narrow"
        >
          <div className="mb-5">
            <p className="type-label mb-2 font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              New Comer
            </p>
            <h1
              id="newcomer-intro-title"
              className={koreanSectionTitleClassName}
            >
              새가족 안내
            </h1>
          </div>

          <blockquote className="mt-10 md:mt-12">
            <div className="rounded-r-[0.4rem] border-l-[3px] border-[#8C745B] bg-[#F7F7F4] pl-3 md:pl-8 lg:pl-4">
              <div className="text-[1.3rem] font-[var(--font-section-title)] tracking-[-0.03em] text-[#1A2744] pl-4 pr-24 py-8">
                <p>&quot;{newcomerVisionQuote}&quot;</p>
              </div>

              <div className="px-4 pb-8">
                <p className="type-body-strong font-bold font-[var(--font-sans)] tracking-[-0.02em] text-[#7A7060]">
                  마태복음 28:19-20
                </p>
              </div>
            </div>
          </blockquote>

          <div className="mt-12 md:mt-14">
            {newcomerIntroParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="type-body-strong tracking-[-0.03em] text-ink"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="newcomer-church-vision-title"
          className="section-shell section-shell--narrow mt-20 md:mt-24 lg:mt-28"
        >
          <div className="mb-5">
            <p className="type-label mb-2 font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              Church Vision
            </p>

            <h1
              id="newcomer-church-vision-title"
              className={koreanSectionTitleClassName}
            >
              The 제자교회는?
            </h1>
          </div>

          <p className="type-body-strong mt-2 tracking-[-0.03em] text-ink md:mt-3">
            우리는 필리핀 산타로사 꿈의교회에서 약 17년간의 선교 사역을 마치고 한국으로 돌아와 2026년 개척한 교회입니다.
          </p>

          <h2 className={`${koreanSubsectionTitleClassName} mt-12 md:mt-14`}>
            5대 핵심가치
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-5 lg:gap-4">
            {newcomerCoreValues.map((value) => (
              <article
                key={value.number}
                className="overflow-hidden rounded-[1.5rem] bg-[#F8F7F4]"
              >
                <div className="h-1.5 w-full bg-[#d1ac50]" />
                <div className="flex flex-col items-center justify-center text-center px-3 py-5">
                  <p
                    className={`${cormorantGaramond.className} type-card-title font-bold leading-none tracking-[0.08em] text-[#d1ac50]`}
                  >
                    {value.number}
                  </p>
                  <h3 className="type-lead mt-2 font-[var(--font-sans)] font-bold tracking-[-0.04em] text-ink">
                    {value.title}
                  </h3>
                  <p className="type-body-strong mt-4 whitespace-pre-line tracking-[-0.03em] text-[#7A7060]">
                    {value.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="newcomer-getting-started-title"
          className="section-shell section-shell--narrow mt-20 md:mt-24 lg:mt-28"
        >
          <div className="mb-5">
            <p className="type-label mb-2 font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              Getting Started
            </p>

            <h1
              id="newcomer-getting-started-title"
              className={koreanSectionTitleClassName}
            >
              새가족을 위한 안내
            </h1>
          </div>

          <div className="relative mt-5 space-y-5 md:mt-6 md:space-y-6">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[2.25rem] top-0 w-px -translate-x-1/2 bg-[#d8d6d1] md:left-[2.5rem]"
            />
            {newcomerGettingStartedSteps.map((step, index) => {
              const cardSurfaceClassName =
                index % 2 === 0
                  ? "bg-[#F8F7F4]"
                  : "bg-white";

              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-6"
                >
                  <div className="relative z-10 flex min-h-[120px] items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d1ac50] bg-themeBlue text-[#d1ac50] shadow-[0_10px_24px_rgba(16,33,63,0.1)] md:h-[4.5rem] md:w-[4.5rem]">
                      <span
                        className={`${cormorantGaramond.className} relative -translate-y-[0.06em] text-[2rem] font-bold leading-none tracking-[0.05em]`}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <article className={`rounded-[1.4rem] px-5 py-5 md:px-7 md:py-6 ${cardSurfaceClassName}`}>
                    <h2 className="type-lead font-[var(--font-sans)] font-bold tracking-[-0.03em] text-ink">
                      {step.title}
                    </h2>

                    <p className="type-body tracking-[-0.03em] text-ink/58">
                      {step.details.map((detail, detailIndex) => (
                        <span key={detail}>
                          {detailIndex > 0 ? <span className="px-2 text-ink/28">·</span> : null}
                          {detail}
                        </span>
                      ))}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="newcomer-faq-title"
          className="section-shell section-shell--narrow mt-20 md:mt-24 lg:mt-28"
        >
          <div className="mb-5">
            <p className="type-label mb-2 font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              FAQ
            </p>

            <h1
              id="newcomer-faq-title"
              className={koreanSectionTitleClassName}
            >
              자주 묻는 질문
            </h1>
          </div>

          <NewcomerFaqAccordion items={newcomerFaqItems} />
        </section>
      </main>
    </div>
  );
}
