interface BulletListProps {
  items: readonly string[];
  theme?: "light" | "dark";
}

export default function BulletList({
  items,
  theme = "light",
}: BulletListProps) {
  const dotClassName =
    theme === "dark" ? "list-bullet list-bullet--gold" : "list-bullet list-bullet--navy";
  const textClassName = theme === "dark" ? "text-[#4a4845] md:text-white" : "text-[#4a4845]";

  return (
      <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`mt-[0.56rem] h-2 w-2 shrink-0 ${dotClassName}`} />
          <span className={`type-body leading-[1.5] tracking-[0.02em] ${textClassName}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
