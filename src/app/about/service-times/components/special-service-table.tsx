import type { SpecialServiceData } from "@/lib/site-data";

export default function SpecialServiceTable({ services }: { services: SpecialServiceData[] }) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-cedar/10 bg-white shadow-[0_10px_30px_rgba(16,33,63,0.06)]">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-cedar/10 bg-[#f8fbff]">
            <th className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cedar/70">예배 종류</th>
            <th className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cedar/70">시기</th>
            <th className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cedar/70">장소</th>
            <th className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cedar/70">비고</th>
          </tr>
        </thead>
        <tbody>
          {services.map((svc, i) => (
            <tr
              key={svc.name}
              className={`border-b border-cedar/10 last:border-b-0 ${
                i % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"
              }`}
            >
              <td className="px-5 py-4 text-base font-semibold text-ink">{svc.name}</td>
              <td className="px-5 py-4 text-sm text-ink/72">{svc.date}</td>
              <td className="px-5 py-4 text-sm text-ink/72">{svc.location}</td>
              <td className="px-5 py-4 text-sm text-ink/58">{svc.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
