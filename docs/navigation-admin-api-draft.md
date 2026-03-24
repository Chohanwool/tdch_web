# Navigation Admin API Draft

## 목적

향후 관리자 기능이 붙을 때 필요한 메뉴 관리 API 초안을 정리합니다.

현재 공개 조회 API는 이미 존재합니다.

- `GET /api/v1/navigation`

관리자 API는 아직 구현하지 않았고, 아래 목록은 초안입니다.

## 기본 전제

- 인증은 별도 관리자 인증 체계로 보호합니다.
- 초기 버전은 세션 기반 또는 단순 관리자 토큰 기반으로 시작 가능합니다.
- 삭제보다는 `visible=false` 기반 소프트 숨김을 우선합니다.

## 1. 목록 조회

`GET /api/v1/admin/navigation/items`

용도:

- 메뉴 트리 전체 조회
- 관리자 화면 초기 진입

권장 쿼리:

- `includeHidden=true`
- `parentId`

## 2. 단건 조회

`GET /api/v1/admin/navigation/items/{id}`

용도:

- 편집 폼 진입
- 현재 값 확인

## 3. 메뉴 생성

`POST /api/v1/admin/navigation/items`

권장 요청 필드:

- `parentId`
- `menuKey`
- `label`
- `href`
- `matchPath`
- `linkType`
- `contentSiteKey`
- `headerVisible`
- `mobileVisible`
- `lnbVisible`
- `breadcrumbVisible`
- `sortOrder`
- `defaultLanding`

메모:

- root 메뉴는 `parentId=null`
- child 메뉴는 부모 존재 검증 필요
- `menuKey` 는 unique 보장

## 4. 메뉴 수정

`PATCH /api/v1/admin/navigation/items/{id}`

용도:

- 라벨 변경
- 링크 변경
- 노출 정책 변경
- `matchPath` 수정

권장 수정 가능 필드:

- `label`
- `href`
- `matchPath`
- `linkType`
- `contentSiteKey`
- `headerVisible`
- `mobileVisible`
- `lnbVisible`
- `breadcrumbVisible`
- `defaultLanding`

## 5. 숨김/표시 토글

`PATCH /api/v1/admin/navigation/items/{id}/visibility`

예시 요청:

```json
{
  "visible": false
}
```

용도:

- 삭제 대신 운영 숨김 처리
- 임시 비노출

## 6. 정렬 순서 변경

`PATCH /api/v1/admin/navigation/items/reorder`

예시 요청:

```json
{
  "parentId": 1,
  "items": [
    { "id": 11, "sortOrder": 10 },
    { "id": 12, "sortOrder": 20 },
    { "id": 13, "sortOrder": 30 }
  ]
}
```

용도:

- drag-and-drop 정렬 저장
- 같은 부모 아래 형제 순서 재정렬

## 7. 기본 진입 메뉴 지정

`PATCH /api/v1/admin/navigation/groups/{groupId}/default-landing`

예시 요청:

```json
{
  "itemId": 12
}
```

용도:

- `/about`, `/sermons` 같은 그룹 진입 시 이동할 기본 자식 메뉴 선택

메모:

- 현재 구현은 child 의 `default_landing=true` 로 계산하므로, API 내부에서는 해당 그룹 자식 중 하나만 true 가 되도록 정리합니다.

## 8. 콘텐츠 메뉴 연결 조회

`GET /api/v1/admin/navigation/content-menus`

용도:

- `content_site_key` 선택용 드롭다운 데이터
- `content_menu` 와 연결 가능한 항목 조회

## 9. 메뉴 유효성 검사

`POST /api/v1/admin/navigation/validate`

용도:

- 저장 전 경로/중복/기본 진입 충돌 점검

권장 검증 항목:

- `menuKey` 중복
- 부모 존재 여부
- 동일 부모 아래 정렬 충돌
- 그룹 내 `defaultLanding` 복수 지정 여부
- `linkType=CONTENT_REF` 일 때 `contentSiteKey` 존재 여부

## 10. 감사 로그

초기에는 필수는 아니지만, 관리자 기능이 붙으면 아래 정도는 남기는 것이 좋습니다.

- 누가 수정했는지
- 언제 수정했는지
- 어떤 필드가 바뀌었는지

## 응답 형태 권장안

관리자 API 응답은 공개 API와 최대한 비슷한 구조를 유지하는 편이 좋습니다.

이유:

- 백오피스와 프론트 공용 모델 재사용이 쉽습니다.
- 관리자 저장 후 즉시 미리보기 반영이 간단해집니다.
