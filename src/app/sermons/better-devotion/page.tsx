import type { Metadata } from "next";
import ComingSoonPage from "@/components/coming-soon-page";

export const metadata: Metadata = {
  title: "더 좋은 묵상 | The 제자교회",
  description: "The 제자교회 더 좋은 묵상 페이지는 현재 구현 예정입니다.",
};

export default function BetterDevotionPage() {
  return (
    <ComingSoonPage
      title="더 좋은 묵상"
      subtitle="BETTER DEVOTION"
      description="하루를 시작하는 묵상 콘텐츠를 준비 중입니다. 곧 이 페이지에서 더 좋은 묵상을 만나보실 수 있습니다."
    />
  );
}
