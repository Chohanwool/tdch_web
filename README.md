# 더 제자교회 웹사이트 (MVP)

소규모 개척교회 운영에 맞춘 웹사이트 기본 템플릿입니다.

## 단계 1) 프로젝트 세팅

```bash
npm install
cp .env.example .env
npm run dev
```

개발 서버: `http://localhost:3000`

## 단계 2) 페이지 구조 (IA)

- `/` 홈
- `/about` 교회소개
- `/sermons` 말씀/설교
- `/news` 교회소식
- `/newcomer` 새가족안내
- `/contact` 오시는 길/문의
- `/giving` 헌금안내

## 단계 3) 인프라 세팅 (Docker + Caddy)

```bash
cp .env.example .env
# 실제 도메인 입력
# DOMAIN=church.example.org
docker compose up -d --build
```

`infra/Caddyfile`은 `.env`의 `DOMAIN`을 읽어 라우팅합니다.
실배포 시 `DOMAIN`만 실제 도메인으로 바꾸면 Caddy가 HTTPS 인증서를 자동 발급합니다.

## 단계 4) 배포 자동화 (GitHub Actions)

- `CI`: PR/메인 브랜치에서 lint + build 검증
- `Deploy`: 메인 브랜치 푸시 시 배포 서버에서 `docker compose up -d --build`

필요한 GitHub Secrets:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`
- `DEPLOY_PORT`
- `DEPLOY_PATH`

## 단계 5) 운영 데이터 수정 위치

- 연락처/계좌/링크: `.env`
- 예배시간/설교/공지 기본 데이터: `src/lib/site-data.ts`

이후 단계로 CMS 도입(예: Sanity/Notion API) 또는 관리자 페이지를 연결할 수 있습니다.
