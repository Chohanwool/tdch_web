import SectionTitle from "@/components/section-title";
import { newcomerSteps } from "@/lib/site-data";

const kakao = process.env.NEXT_PUBLIC_KAKAO_URL ?? "#";
const phone = process.env.NEXT_PUBLIC_CHURCH_PHONE ?? "010-0000-0000";

export default function NewcomerPage() {
  return (
    <div className="section-shell space-y-8 pb-16 pt-10 md:space-y-10 md:pb-20 md:pt-12">
      <SectionTitle
        eyebrow="New Here"
        title="새가족 안내"
        description="더 제자교회는 처음 오신 분을 환영합니다. 아래 순서대로 함께 안내해드릴게요."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr,0.9fr]">
        <ol className="stagger grid grid-cols-1 gap-4 md:grid-cols-2">
          {newcomerSteps.map((step, idx) => (
            <li key={step} className="surface-card rounded-2xl p-5 md:p-6">
              <p className="chip bg-clay/12 text-clay">STEP {idx + 1}</p>
              <p className="mt-3 text-lg font-semibold text-ink">{step}</p>
            </li>
          ))}
        </ol>

        <aside className="surface-card-strong rounded-3xl p-6 md:p-7">
          <h3 className="font-serif text-2xl text-ink">등록 및 상담</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/75 md:text-base">
            카카오톡 오픈채팅이나 전화로 연락 주시면 예배 전후 동선과 등록을 도와드립니다.
          </p>
          <div className="mt-5 space-y-3">
            <a
              href={kakao}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-clay px-4 py-3 text-sm font-semibold text-ivory transition hover:bg-cedar"
            >
              카카오톡으로 문의
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cedar/25 px-4 py-3 text-sm font-semibold text-cedar transition hover:border-clay hover:text-clay"
            >
              전화 문의
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
