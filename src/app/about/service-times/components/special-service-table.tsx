import type { SpecialServiceData } from "@/lib/site-data";

export default function SpecialServiceTable({ services }: { services: SpecialServiceData[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-cedar/10">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-[#13243a] via-[#1c2f48] to-[#0f1c2e] text-ivory">
            <th className="py-3 px-4 text-left font-semibold">예배 종류</th>
            <th className="py-3 px-4 text-left font-semibold">시기</th>
            <th className="py-3 px-4 text-left font-semibold">장소</th>
            <th className="py-3 px-4 text-left font-semibold">비고</th>
          </tr>
        </thead>
        <tbody>
          {services.map((svc, i) => (
            <tr
              key={svc.name}
              className={`border-t border-cedar/8 transition hover:bg-surface/60 ${
                i % 2 === 0 ? "bg-white" : "bg-[#f8fafd]"
              }`}
            >
              <td className="py-3 px-4 font-semibold text-ink">{svc.name}</td>
              <td className="py-3 px-4 text-ink/70">{svc.date}</td>
              <td className="py-3 px-4 text-ink/70">{svc.location}</td>
              <td className="py-3 px-4 text-ink/55">{svc.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
