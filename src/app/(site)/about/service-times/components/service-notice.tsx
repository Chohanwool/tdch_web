import type { ReactNode } from "react";

export default function ServiceNotice({ items }: { items: ReactNode[] }) {
  return (
    <ul className="type-body space-y-3 text-black/88">
      {items.map((content, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="list-bullet list-bullet--navy mt-[0.45em] shrink-0" />
          <span className="flex-1">{content}</span>
        </li>
      ))}
    </ul>
  );
}
