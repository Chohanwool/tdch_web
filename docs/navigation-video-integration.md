# Navigation+Video Integration

공개 사이트 내비게이션과 영상 메뉴 연결 방식의 기준 문서입니다.

## Summary

- 공개 메뉴는 기본적으로 `GET /api/v1/public/menu` 응답을 사용합니다.
- API 장애 시 프론트는 정적 fallback 내비게이션으로 내려갑니다.
- 현재 정적 fallback 범위는 `about`, `newcomer` 두 그룹입니다.
- 영상 섹션은 정적 fallback에 강제로 포함하지 않고, 백엔드 메뉴/콘텐츠를 기준으로 노출합니다.

## Admin/Ops

- 관리자 CMS에서 메뉴 구조를 수정하면 공개 메뉴 응답도 함께 검증합니다.
- 운영 점검 시 `GET /api/v1/public/menu` 응답과 실제 공개 헤더/LNB 노출을 같이 확인합니다.
- 메뉴 API 장애 상황에서는 `about`, `newcomer` fallback만 유지되는 것이 현재 의도된 동작입니다.
- 영상 메뉴는 백엔드 데이터가 복구되기 전까지 정적 메뉴로 대체하지 않습니다.

## Final Status

- 공개 사이트는 백엔드 메뉴 API 우선 구조로 동작합니다.
- 프론트 fallback 내비게이션은 최소 안전 범위만 유지하도록 축소되었습니다.
- contract test는 README 링크와 canonical 문서 섹션, fallback 동작을 함께 검증합니다.
