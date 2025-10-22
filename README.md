# 🏛️ Genie Portal | ISMS-P 인증 대응 공공기관 포털 사이트

> **Vue.js + Tailwind CSS 기반의 공공기관형 웹 포털**  
> ISMS-P 인증 항목(개인정보 처리방침, 이용약관, 접근제어 등)을 반영한  
> **보안·행정 통합형 포털 시연 프로젝트**입니다.

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/76bb9fc8-3c74-4bbc-966e-59c51f8bb779" />

  <br>
  <em>지니 포털 메인 화면 (공공기관 스타일)</em>
</p>

---

## 🚀 주요 기능

### 🔐 ISMS-P 인증 대응 콘텐츠
- **개인정보처리방침**: 수집 목적·보유 기간·제3자 제공 등 항목별 세부 내용 포함  
- **이용약관 / 저작권정책**: 법적 필수 조항 구성 및 Tailwind UI로 정리  
- **기관소개 / 오시는 길**: 실제 위치(`서울특별시 중구 충무로5가 73-1`) 및 조직도 표시  

### 🏢 공공기관 스타일 UX/UI
- 중앙정부·산하기관 포털 레이아웃 모티브  
- Tailwind 기반 반응형 카드형 서비스 안내 구성  
- 공공색상(`govblue`, `govsky`) 사용으로 신뢰감 강화  

### 🧭 주요 메뉴 구조
| 메뉴 | 설명 |
|------|------|
| 메인 | 기관 비전 및 서비스 안내 |
| 민원 안내 | 통합 민원 신청 및 발급 정보 |
| 정보공개 | 공공데이터 및 사전정보공표 |
| 기관소개 | 조직도, 위치 안내 |
| 오시는 길 | Google Maps 기반 위치 표시 |
| 정책 문서 | 개인정보처리방침 / 이용약관 / 저작권정책 |

---

## 🛠️ 기술 스택

<p align="center">
  <strong>Frontend:</strong><br>
  <img src="https://img.shields.io/badge/Vue.js-42B883?style=for-the-badge&logo=vue.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

---

## ⚙️ 설치 및 실행 방법

1. **레포지토리 클론**
    ```bash
    git clone https://github.com/your-username/genie-portal.git
    cd genie-portal
    ```

2. **의존성 설치**
    ```bash
    npm install
    ```

3. **개발 서버 실행**
    ```bash
    npm run dev
    ```
    → 브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

4. **프로덕션 빌드**
    ```bash
    npm run build
    ```

---

## 📂 프로젝트 구조

```bash
📦 genie-portal/
├── 📁 src/
│   ├── 📁 assets/
│   │   └── tailwind.css
│   ├── 📁 images/
│   │   ├── 조직도.png
│   │   ├── genie.png
│   │   ├── lamp.png
│   │   └── portal.png
│   ├── 📁 router/
│   │   └── index.js
│   ├── 📁 views/
│   │   ├── AboutView.vue
│   │   ├── CivilView.vue
│   │   ├── CopyrightView.vue
│   │   ├── CSView.vue
│   │   ├── HomeView.vue
│   │   ├── MapView.vue
│   │   ├── NewsView.vue
│   │   ├── OpenInfoView.vue
│   │   ├── PolicyView.vue
│   │   ├── PrivacyView.vue
│   │   ├── RecruitView.vue
│   │   └── TermsView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js

