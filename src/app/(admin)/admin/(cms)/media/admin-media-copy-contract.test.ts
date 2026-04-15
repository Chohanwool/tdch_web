import {
  discoveryResultTitle,
  discoveryEmptyTitle,
  playlistListEmptyTitle,
  playlistListEmptyDescription,
  playlistSearchEmptyTitle,
  playlistVideosEmpty,
} from "@/lib/admin-media-copy";

type ExpectedCopy = {
  discoveryResultTitle: "미연결 재생목록 불러오기 결과",
  discoveryEmptyTitle: "새로 생성된 초안이 없습니다.",
  playlistListEmptyTitle: "등록된 예배 영상 메뉴가 없습니다.",
  playlistListEmptyDescription: "우측 상단 버튼으로 미연결 재생목록을 먼저 불러오세요.",
  playlistSearchEmptyTitle: "검색 결과가 없습니다.",
  playlistVideosEmpty: "아직 sync된 영상이 없습니다.",
};

const _assertCopy = {
  discoveryResultTitle,
  discoveryEmptyTitle,
  playlistListEmptyTitle,
  playlistListEmptyDescription,
  playlistSearchEmptyTitle,
  playlistVideosEmpty,
} satisfies ExpectedCopy;

void _assertCopy;
