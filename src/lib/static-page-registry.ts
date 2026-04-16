export interface StaticPageSeoEntry {
  title: string;
  description: string;
}

export const STATIC_PAGE_SEO: Record<string, StaticPageSeoEntry> = {
  "about.greeting": {
    title: "교회 소개",
    description: "The 제자교회가 추구하는 비전과 공동체의 방향을 소개합니다.",
  },
  "about.pastor": {
    title: "담임목사 소개",
    description:
      "The 제자교회 이진욱(Timothy Lee) 담임목사를 소개합니다. 17년간의 필리핀 선교 사역과 교육 과정, 사역 이력을 확인하세요.",
  },
  "about.service-times": {
    title: "예배 시간 안내",
    description:
      "The 제자교회 주일예배, 수요예배, 새벽기도회, 금요기도회 등 예배 시간 안내 및 특별 예배 일정을 확인하세요.",
  },
  "about.location": {
    title: "오시는 길",
    description:
      "The 제자교회 오시는 길 안내입니다. 예배 장소, 지하철과 버스 노선, 주차와 연락 정보를 확인하세요.",
  },
  "about.history": {
    title: "교회 연혁",
    description:
      "The 제자교회의 교회 연혁을 확인하세요. 2026년 1월 개척을 시작으로 함께 써 내려갈 이야기.",
  },
  "about.giving": {
    title: "헌금안내",
    description: "온라인 헌금 방법, 입금자명 작성 예시, 온라인 계좌 안내를 확인하실 수 있습니다.",
  },
  "newcomer.guide": {
    title: "새가족 안내",
    description: "The 제자교회 새가족 안내와 제자 양육 비전을 소개합니다.",
  },
  "newcomer.care": {
    title: "새가족 양육",
    description: "The 제자교회 새가족 양육 5주 과정과 침례 안내 페이지입니다.",
  },
  "newcomer.disciples": {
    title: "제자 훈련",
    description: "The 제자교회 제자훈련 단계와 커리큘럼, 신청 안내를 확인하세요.",
  },
  "commission.summary": {
    title: "지상명령 개요",
    description: "The 제자교회 지상명령 개요와 3D 선교 비전을 소개합니다.",
  },
  "commission.nextgen": {
    title: "지상명령 다음세대",
    description: "The 제자교회 지상명령 다음세대 사역과 부모·교사 참여 안내를 소개합니다.",
  },
  "commission.culture": {
    title: "지상명령 다문화",
    description: "The 제자교회 지상명령 다문화 사역과 참여 안내를 소개합니다.",
  },
  "commission.ethnic": {
    title: "지상명령 다민족",
    description: "The 제자교회 지상명령 다민족 사역과 선교 참여 안내를 소개합니다.",
  },
};

export function getStaticPageSeoEntry(staticPageKey: string): StaticPageSeoEntry | null {
  return STATIC_PAGE_SEO[staticPageKey] ?? null;
}
