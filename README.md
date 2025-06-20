# 🧠 Tictic

**Tictic**은 오픈 API를 기반으로 만든 반응형 퀴즈 웹 애플리케이션입니다.  
문제를 풀며 두뇌를 자극하고, 다른 사람들과 점수를 비교할 수 있습니다.

<br/>

## 🚀 프로젝트 개요

- **개발 목적**: 포트폴리오용 프로젝트 + 모바일 대응 UX + 실무에 적용할 수 있는 기술 학습
- **주요 특징**: 오픈 API 활용, 한글 번역 지원, 사용자 점수 기록 및 랭킹 시스템

<br/>

## 🛠 기술 스택

| 범주 | 기술 |
|------|------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Authentication** | NextAuth.js (Google OAuth) |
| **Data Fetching** | React Query |
| **API** | Open Trivia DB, 추후 QuizAPI.io 연동 예정 |
| **Backend** | Route Handlers (Next.js), Prisma + PlanetScale |
| **i18n** | Papago 또는 Google Translate API (한글 번역용) |
| **Deployment** | Vercel |
| **Etc.** | TypeScript, ESLint, Prettier |

<br/>

## ✨ 주요 기능

- ✅ 오픈 API 기반 퀴즈 문제 제공 (카테고리/난이도 선택 가능)
- ✅ 제한 시간 타이머 및 점수 계산
- ✅ 문제 랜덤 셔플 및 UI 피드백
- ✅ 한글 자동 번역 기능 (캐싱 및 서버 처리 예정)
- ✅ 로그인 기반 점수 기록 저장 및 랭킹
- ✅ 반응형 UI (모바일 최적화)

<br/>

## 📁 폴더 구조 (예시)

```bash
/app
├ /quiz # 퀴즈 플레이 관련 페이지
├ /result # 결과 페이지
└ /history # 유저 퀴즈 기록

/components
├ QuizCard.tsx
├ Timer.tsx
└ ScoreBar.tsx

/lib
├ getQuiz.ts # Open Trivia DB 호출
├ translate.ts # 번역 API 연동
└ shuffle.ts # 보기 섞기 로직

/api
└ /translate # 서버에서 번역 + 캐시 처리

/prisma
└ schema.prisma
```


<br/>

## 🔮 향후 계획

- [ ] QuizAPI.io 연동 (전문 분야 퀴즈 추가)
- [ ] 한글 번역 캐시 시스템 구축 (DB 활용)
- [ ] 실시간 대결 모드 (Socket.io or Pusher)
- [ ] 힌트 아이템, 시간 보너스 등 게임화 요소 추가
- [ ] 퀴즈 생성 및 공유 기능

<br/>

## 📸 스크린샷 (추가 예정)

> 추후 UI 완성 후 이미지 업로드 예정

<br/>

## 🧑‍💻 개발자

- [손지우 (Son Jiwoo)](https://github.com/sonjiwoo031105)
- 📫 Contact: [sonjiwoo031105@gmail.com](mailto:sonjiwoo031105@gmail.com)

---
