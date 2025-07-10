## 📘 Tictic - 맞춤법 퀴즈 웹 앱

#### [배포 링크 바로가기 🔗](https://tictic-sonjiwoo031105s-projects.vercel.app/)

Tictic은 한국어 맞춤법 퀴즈를 통해 자연스럽게 올바른 표현을 익힐 수 있도록 만든 웹 기반 퀴즈 앱입니다. <br>
단순한 문제풀이를 넘어서 학습 흐름과 기록 관리까지 고려한 기능을 제공합니다.

<br>

## ✨ 주요 기능
- ✅ 퀴즈 플레이: 맞춤법 퀴즈를 풀며 즉시 피드백 제공
- ✅ 자동 진행: 타이머 종료 시 자동으로 다음 문제로 이동
- ✅ 점수 저장 및 결과 보기: 퀴즈 종료 후 결과 확인 가능
- ✅ 사용자 인증: NextAuth + MongoDB로 로그인 기능 구현
- ✅ 상태 저장: Zustand로 클라이언트 상태 안전하게 유지
- ✅ 반응형 UI: 모바일 환경에서도 최적화된 사용 경험

<br>

## 🛠 기술 스택
- Frontend: React, Next.js (App Router), TypeScript, Tailwind CSS
- 상태 관리: Zustand
- 데이터 처리: 직접 작성한 퀴즈 JSON
- API 도구: React Query
- 개발 도구: Vite, ESLint, Prettier
- 배포: Vercel

<br>

## 📂 주요 폴더 구조
```bash
src/
├── app/
│   ├── quiz/               # 퀴즈, 결과 페이지
│   ├── api/                # NextAuth API 라우트
├── components/             # 재사용 가능한 컴포넌트들
├── store/                  # Zustand 상태 관리
├── lib/                    # 퀴즈 fetch 및 유틸
├── types/                  # TypeScript 타입 정의
public/
├── quiz.json               # 맞춤법 퀴즈 데이터
```

<br>

## 🧪 기능 흐름 요약
1. 퀴즈 시작 시 `quiz.json`에서 문제 불러오기
2. 각 문제마다 보기 랜덤 셔플 및 선택
3. 정답 선택 시 즉시 정오답 표시
4. 타이머 종료 시 자동 진행
5. 마지막 문제 후 `/quiz/result` 페이지로 이동
6. 점수 및 오답 정보 Zustand에 저장 후 결과 화면에 표시

<br>

## 🚀 향후 개선 아이디어

- MongoDB로 문제 저장 및 관리 기능
- 퀴즈 카테고리(띄어쓰기, 맞춤법, 외래어 등) 추가
