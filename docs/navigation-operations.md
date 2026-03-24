# Navigation Operations

## 목적

상단 헤더, 모바일 메뉴, 브레드크럼, LNB가 공통으로 사용하는 사이트 메뉴 운영 기준을 정리합니다.

현재 메뉴의 실제 조회 원본은 백엔드 DB 테이블 `site_navigation_item` 입니다.  
프론트는 `GET /api/v1/navigation` 응답을 사용하고, API가 실패하면 `src/lib/site-data.ts` 의 `fallbackNavigationResponse` 로 내려갑니다.

## 현재 소스 오브 트루스

- 사이트 메뉴 구조: `site_navigation_item`
- 설교/영상 콘텐츠 카테고리: `content_menu`
- 프론트 fallback: `tdch_web/src/lib/site-data.ts`

중요한 점:

- `site_navigation_item` 은 사이트 내비게이션 전용입니다.
- `content_menu` 는 설교/영상 도메인 전용입니다.
- 둘은 역할이 다르므로 섞지 않습니다.

## 현재 반영 범위

`GET /api/v1/navigation` 에서 내려온 메뉴는 아래 UI에 공통 반영됩니다.

- 상단 헤더
- 모바일 전체 메뉴
- 브레드크럼
- LNB
- `/about`, `/sermons` 기본 진입 리다이렉트

## 운영 변경 원칙

관리자 화면이 아직 없으므로 메뉴 변경은 아래 기준으로 구분합니다.

### 1. 단순 운영 변경

대상:

- 메뉴 숨김/표시
- 정렬 순서 변경
- 기존 링크 수정
- 기본 진입 서브메뉴 변경

방법:

- 운영 DB의 `site_navigation_item` 값을 수정합니다.

예시 컬럼:

- `visible`
- `header_visible`
- `mobile_visible`
- `lnb_visible`
- `breadcrumb_visible`
- `sort_order`
- `default_landing`
- `href`
- `match_path`

반영 시점:

- 프론트는 메뉴 응답을 `revalidate 300` 으로 읽으므로 보통 5분 이내에 반영됩니다.

### 2. 구조 변경

대상:

- 새 메뉴 추가
- 메뉴 삭제
- 부모/자식 관계 변경
- 새 top-level 메뉴 추가

방법:

- Flyway 마이그레이션으로 반영하는 것을 기본으로 합니다.

이유:

- 환경별 이력 추적이 됩니다.
- 로컬/스테이징/운영을 같은 방식으로 맞출 수 있습니다.
- rollback 기준을 남기기 쉽습니다.

## 변경 전 체크리스트

- 연결할 프론트 라우트가 실제로 존재하는지 확인
- 메뉴가 가리키는 페이지가 공개 가능한 상태인지 확인
- `match_path` 가 브레드크럼/LNB 활성화 기준과 맞는지 확인
- `default_landing` 이 그룹당 하나만 선택됐는지 확인
- `header_visible`, `mobile_visible` 정책이 의도와 맞는지 확인

## 변경 후 체크리스트

- 데스크톱 헤더 드롭다운 확인
- 모바일 메뉴 확인
- 브레드크럼과 LNB 활성 상태 확인
- `/about`, `/sermons` 같은 진입 페이지 리다이렉트 확인
- 설교 메뉴일 경우 `content_site_key` 연결이 맞는지 확인

## `match_path` 운영 규칙

해시 링크를 쓰는 메뉴는 `href` 와 `match_path` 를 분리합니다.

예:

- `href=/about/location#map`
- `match_path=/about/location`

이유:

- 브라우저 경로 매칭은 hash 없는 pathname 기준으로 동작하기 때문입니다.
- 이렇게 해야 브레드크럼/LNB 활성 상태가 안정적으로 맞습니다.

## fallback 운영 규칙

현재 프론트는 API 실패 시 `fallbackNavigationResponse` 를 사용합니다.

그래서 아래 경우에는 fallback 도 함께 맞춰야 합니다.

- top-level 메뉴 추가/삭제
- 기본 진입 경로 변경
- 해시 링크 구조 변경
- 운영 중 API 장애 시에도 최소한 같은 메뉴를 보여줘야 하는 변경

즉, 운영 DB만 바꾸고 fallback 을 오래 방치하면 장애 시 이전 메뉴가 노출될 수 있습니다.

## 권장 운영 절차

1. 변경 목적을 정리합니다.
2. 단순 운영 변경인지 구조 변경인지 구분합니다.
3. 구조 변경이면 Flyway 마이그레이션부터 작성합니다.
4. fallback 구조와 괴리가 생기면 `fallbackNavigationResponse` 도 같이 맞춥니다.
5. 로컬에서 헤더/모바일/LNB/리다이렉트를 확인합니다.
6. 운영 반영 후 5분 이내 실서비스 메뉴 반영을 확인합니다.

## 관리자 기능 도입 전까지의 기준

- 메뉴 수정 UI는 아직 없습니다.
- 운영 DB 수정 또는 Flyway 마이그레이션이 공식 변경 경로입니다.
- 관리자 기능이 붙으면 이 문서는 “수동 SQL/Flyway 절차” 대신 “관리자 화면 절차”로 대체합니다.
