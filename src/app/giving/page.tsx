import SectionTitle from "@/components/section-title";

const bank = process.env.NEXT_PUBLIC_GIVING_BANK ?? "국민은행 000-00-0000-000";
const owner = process.env.NEXT_PUBLIC_GIVING_OWNER ?? "더 제자교회";

export default function GivingPage() {
  return (
    <div className="section-shell space-y-8 pb-16 pt-10 md:space-y-10 md:pb-20 md:pt-12">
      <SectionTitle
        eyebrow="Giving"
        title="헌금 안내"
        description="온라인 헌금은 아래 계좌를 통해 가능합니다. 입금자명은 성함+헌금종류로 표기해 주세요."
      />

      <section className="surface-card-strong rounded-3xl p-6 text-sm text-ink/85 md:p-8">
        <p className="chip bg-clay/12 text-clay">Account</p>
        <p className="mt-4 text-xl font-semibold text-ink">{bank}</p>
        <p className="mt-2 text-base">예금주: {owner}</p>
      </section>

      <section className="surface-card rounded-2xl p-5 text-sm text-ink/75 md:p-6">
        <h3 className="text-lg font-semibold text-ink">헌금 종류 표기 예시</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <p className="rounded-xl bg-white/70 p-3">주일헌금: 홍길동주일</p>
          <p className="rounded-xl bg-white/70 p-3">감사헌금: 홍길동감사</p>
          <p className="rounded-xl bg-white/70 p-3">선교헌금: 홍길동선교</p>
        </div>
      </section>
    </div>
  );
}
