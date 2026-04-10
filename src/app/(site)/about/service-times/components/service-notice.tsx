import type { ReactNode } from "react";

export default function ServiceNotice({ items }: { items: ReactNode[] }) {
  return (
    <ul className="type-body space-y-3 text-black/88">
      {items.map((content, index) => (
        <li key={index} className="flex items-center gap-3">
          <span className="list-bullet list-bullet--navy shrink-0" />
          <span>{content}</span>
        </li>
      ))}
    </ul>
  );
}
