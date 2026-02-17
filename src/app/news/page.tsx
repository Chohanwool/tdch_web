import SectionTitle from "@/components/section-title";
import { newsPosts } from "@/lib/site-data";

export default function NewsPage() {
  return (
    <div className="section-shell space-y-8 pb-16 pt-10 md:space-y-10 md:pb-20 md:pt-12">
      <SectionTitle
        eyebrow="Church News"
        title="교회소식"
        description="주보, 공지, 행사 소식을 한 곳에서 확인하세요."
      />

      <div className="stagger space-y-4 md:space-y-5">
        {newsPosts.map((post) => (
          <article key={post.title} className="surface-card rounded-2xl p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-moss/10 text-moss">{post.category}</span>
              <p className="text-xs text-ink/55">{post.date}</p>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-ink">{post.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
