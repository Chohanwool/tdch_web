export default function ServiceNotice({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-cedar/10 bg-[#f8fafd] px-6 py-5 md:px-8 md:py-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink/70">
        <svg className="h-4 w-4 text-cedar/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
        안내사항
      </div>
      <ul className="space-y-1.5">
        {items.map((text, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink/55">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cedar/30" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
