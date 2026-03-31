"use client";

import { useState } from "react";

export interface NewcomerFaqItem {
  question: string;
  answer: string;
}

interface NewcomerFaqAccordionProps {
  items: readonly NewcomerFaqItem[];
}

export default function NewcomerFaqAccordion({
  items,
}: NewcomerFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-5 border-t border-[#e8e1d5] md:mt-6">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article key={item.question} className="border-b border-[#e8e1d5]">
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex min-h-[4.75rem] w-full items-center justify-between gap-4 py-4 text-left md:min-h-[5.1rem] md:py-5"
              onClick={() => {
                setOpenIndex((currentIndex) =>
                  currentIndex === index ? -1 : index
                );
              }}
            >
              <h2 className="text-[1.2rem] font-medium leading-[1.34] tracking-[-0.03em] text-ink">
                {item.question}
              </h2>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className={`h-5 w-5 shrink-0 text-[#a5a5a5] transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                  }`}
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>

            {isOpen ? (
              <div className="pb-5 pr-10 md:pb-6">
                <p className="type-body tracking-[-0.03em] text-ink/58">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
