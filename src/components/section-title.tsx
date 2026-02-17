interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-clay">
        <span className="h-px w-8 bg-clay/55" />
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-ink md:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-ink/70 md:text-base">{description}</p>
      ) : null}
    </div>
  );
}
