import type { ServiceTimeData } from "@/lib/site-data";

/* ── 시계 아이콘 (기본 예배) ── */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── 별 아이콘 (하이라이트 예배) ── */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L16.18 19 12 15.77 7.82 19l1.09-6.26L3.82 9l6.09-.74z" />
    </svg>
  );
}

/* ── 기도(새벽) 아이콘 ── */
function PrayerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M19.07 4.93l-2.83 2.83M22 12h-4M4.93 19.07l2.83-2.83M19.07 19.07l-2.83-2.83" strokeLinecap="round" />
      <rect x="8" y="10" width="8" height="12" rx="1" />
    </svg>
  );
}

/* ── 책(수요) 아이콘 ── */
function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  "주일 1부 예배": ClockIcon,
  "주일 2부 예배": StarIcon,
  "주일 3부 예배": ClockIcon,
  "새벽 기도회": PrayerIcon,
  "수요 예배": BookIcon,
  "금요 기도회": ClockIcon,
};

export default function ServiceTimeCard({ data }: { data: ServiceTimeData }) {
  const Icon = iconMap[data.name] ?? ClockIcon;
  const isHighlight = data.highlight;

  return (
    <div
      className={`relative flex flex-col items-center rounded-2xl px-5 py-7 text-center transition-shadow duration-300 ${isHighlight
        ? "bg-gradient-to-br from-[#13243a] via-[#1c2f48] to-[#0f1c2e] text-ivory shadow-[0_16px_34px_rgba(16,33,63,0.22)]"
        : "border border-cedar/10 bg-white text-ink shadow-[0_8px_24px_rgba(16,33,63,0.08)]"
        }`}
    >
      {/* 아이콘 */}
      <Icon className={`h-8 w-8 mb-3 ${isHighlight ? "text-gold" : "text-cedar/50"}`} />

      {/* 예배 이름 */}
      <h3 className={`text-lg font-bold leading-tight ${isHighlight ? "text-ivory" : "text-ink"}`}>
        {data.name}
      </h3>

      {/* 영문 이름 Chip */}
      <p
        className={`mt-1.5 inline-block rounded-full px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${isHighlight
          ? "bg-gold/25 text-gold"
          : "bg-cedar/8 text-cedar/70"
          }`}
      >
        {data.enName}
      </p>

      {/* 시간 */}
      <p className={`mt-4 text-4xl font-extrabold tracking-tight ${isHighlight ? "text-ivory" : "text-ink"}`}>
        {data.time}
        <span className={`ml-1 text-base font-semibold ${isHighlight ? "text-ivory/60" : "text-ink/50"}`}>
          {data.ampm}
        </span>
      </p>

      {/* 요일 · 장소 */}
      <p className={`mt-2 text-sm font-medium ${isHighlight ? "text-ivory/60" : "text-ink/50"}`}>
        ◎ {data.day}
      </p>

      {/* 부가 설명 */}
      {data.note && (
        <p
          className={`mt-2 whitespace-pre-line text-xs leading-relaxed ${isHighlight ? "text-ivory/50" : "text-ink/40"
            }`}
        >
          {data.note}
        </p>
      )}
    </div>
  );
}
