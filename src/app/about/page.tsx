import SectionTitle from "@/components/section-title";

const values = [
  {
    title: "복음 중심",
    body: "성경 말씀을 삶에 적용하는 제자도를 교회의 중심 가치로 둡니다."
  },
  {
    title: "작은 공동체",
    body: "소규모 교회의 강점을 살려 서로를 깊이 돌보는 교회를 지향합니다."
  },
  {
    title: "지역 섬김",
    body: "교회 안에 머무르지 않고 마을과 이웃을 섬기는 실천을 이어갑니다."
  }
];

export default function AboutPage() {
  return (
    <div className="section-shell space-y-8 pb-16 pt-10 md:space-y-10 md:pb-20 md:pt-12">
      <SectionTitle
        eyebrow="About"
        title="더 제자교회 소개"
        description="더 제자교회는 막 개척한 작은 교회이지만, 복음의 본질에 충실한 건강한 공동체를 세워가고 있습니다."
      />

      <section className="surface-card-strong rounded-3xl p-6 md:p-8">
        <p className="chip bg-clay/12 text-clay">Vision</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">
          더 제자교회는 한 사람을 제자로 세우는 일에 집중합니다. 규모보다 말씀과 기도, 그리고 실제적인
          돌봄을 통해 지역 속에서 복음을 드러내는 교회가 되고자 합니다.
        </p>
      </section>

      <section className="stagger grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="surface-card rounded-2xl p-5 md:p-6">
            <h3 className="font-serif text-xl text-ink">{value.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{value.body}</p>
          </article>
        ))}
      </section>

      <section className="surface-card rounded-3xl p-5 text-sm text-ink/80 md:p-7">
        <p className="chip bg-moss/10 text-moss">Pastor&apos;s Message</p>
        <h3 className="mt-4 font-serif text-xl text-ink md:text-2xl">담임목사 인사</h3>
        <p className="mt-3 leading-relaxed">
          &quot;교회가 크기보다 본질을 지키는 것이 중요하다고 믿습니다. 말씀과 기도로 한 사람을 제자로
          세우는 일에 집중하겠습니다.&quot;
        </p>
      </section>
    </div>
  );
}
