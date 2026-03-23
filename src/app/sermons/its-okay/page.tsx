import type { Metadata } from "next";
import ComingSoonPage from "@/components/coming-soon-page";

export const metadata: Metadata = {
  title: "그래도 괜찮아 | The 제자교회",
  description: "The 제자교회 그래도 괜찮아 페이지는 현재 구현 예정입니다.",
};

export default function ItsOkayPage() {
  return (
    <ComingSoonPage
      title="그래도 괜찮아"
      subtitle="IT'S OKAY"
      description="위로와 회복을 전하는 콘텐츠를 준비 중입니다. 곧 이 페이지에서 관련 메시지를 확인하실 수 있습니다."
    />
  );
}
