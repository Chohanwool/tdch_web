interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-ink/70 sm:text-base">{description}</p> : null}
    </div>
  );
}
