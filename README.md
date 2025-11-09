# 🏛️ K-Job 인재 헌터스 포털 (Genie Portal)

> **Vue.js + Tailwind CSS 기반의 다중 역할 스마트 고용 매칭 플랫폼**
> ISMS-P 인증 항목(개인정보 처리방침, 이용약관 등)을 포함한 공공기관 포털의 기본 기능과,  
> **구직자-기업-관리자** 3가지 역할을 기반으로 한 **스마트 고용 매칭** 기능을 통합한  
> **보안·행정·채용 통합 포털 시연 프로젝트**입니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b6751feb-7b34-402b-af4b-c143978d215f" />
  <em>K-Job 인재 헌터스 포털 메인 화면</em>
</p>

## 🚀 주요 기능

본 프로젝트는 **구직자(User), 기업(Company), 관리자(Admin)** 3가지 사용자 역할을 중심으로 기능이 구현되어 있습니다.

### 👤 구직자 (User)
* **회원가입 및 로그인**: 일반 회원(구직자)으로 회원가입 및 로그인을 수행합니다.
* **약관 동의**: 회원가입 시 이용약관 및 개인정보처리방침을 확인하고 동의합니다. (클릭 시 내용 펼치기)
* **본인 인증**: `AuthVerifyModal` 컴포넌트를 통한 휴대전화 본인 인증 시뮬레이션.
* **마이페이지**: 개인정보 및 이력서(학력, 경력, 보유 기술)를 등록하고 수정합니다.
* **채용 공고 조회**: 전체 채용 공고를 확인하고 '지원하기' 버튼으로 지원합니다.
* **AI 매칭 추천**: 본인의 이력서 키워드를 기반으로 적합한 공고를 추천받습니다.

### 🏢 기업 (Company)
* **회원가입 및 로그인**: 기업 회원으로 회원가입 및 로그인을 수행합니다.
* **본인 인증**: 사업자등록번호 및 대표자 정보 기반의 본인 인증 시뮬레이션.
* **채용 공고 관리 (CRUD)**: 기업 소유의 채용 공고를 등록, 수정, 삭제합니다.
* **지원자 관리**: 자사 공고에 지원한 구직자 목록을 확인하고, 상태(서류 통과, 면접 등)를 변경합니다.
* **지원자 적합도 확인**: 지원자의 이력서와 공고의 직무를 비교한 '적합도(%)'를 확인합니다.

### 👑 관리자 (Admin)
* **관리자 로그인**: 'admin' ID로 로그인 시 관리자 전용 대시보드로 이동합니다.
* **관리자 대시보드**: 전체 구직자 목록과 전체 채용 공고 목록을 한눈에 모니터링합니다.
* **전체 구직자 관리**: 시스템에 등록된 모든 구직자의 프로필과 이력서 정보를 조회합니다.
* **전체 공고 관리**: 모든 기업이 등록한 채용 공고를 조회합니다.
* **핵심 기능 (인재 추천)**:
    * 특정 공고를 선택하고 "인재 찾기" 버튼을 클릭합니다.
    * 시스템의 모든 구직자 데이터와 공고를 비교하여 **적합도가 높은 순으로 인재를 정렬**합니다.
    * 관리자가 "매칭하기" 버튼을 눌러 기업에게 인재를 추천(매칭)하는 기능을 시연합니다.

### 🏛️ 공공기관 포털 (공통)
* **ISMS-P 인증 콘텐츠**: 개인정보처리방침, 이용약관, 저작권정책 등 법적 필수 조항 페이지.
* **기관 정보**: 기관소개, 비전, 조직도, 오시는 길(Google Maps 연동) 등.
* **소식 및 정책**: 공지사항, 보도자료, 정보공개, 주요 정책 등 공공기관 필수 메뉴.

## 🛠️ 기술 스택

<p align="center">
  <strong>Frontend:</strong><br>
  <img src="https://img.shields.io/badge/Vue.js-42B883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js"/>
  <img src="https://img.shields.io/badge/Vue_Router-42B883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue Router"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>
<p align="center">
  <strong>Database (Simulation):</strong><br>
  <img src="https://img.shields.io/badge/LocalStorage-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="LocalStorage"/>
</p>

## ⚙️ 설치 및 실행 방법

1.  **레포지토리 클론**
    ```bash
    git clone [https://github.com/your-username/genie-portal.git](https://github.com/your-username/genie-portal.git)
    cd genie-portal
    ```

2.  **의존성 설치**
    ```bash
    npm install
    ```

3.  **개발 서버 실행**
    ```bash
    npm run dev
    ```
    → 브라우저에서 `http://localhost:5173` 접속

4.  **(필수) 관리자 계정 생성 및 테스트**
    * 본 프로젝트는 `localStorage`를 DB로 사용합니다. 관리자 기능 테스트를 위해 **브라우저 개발자 도구(F12)의 Console**에서 아래 코드를 실행하여 'admin' 계정을 수동으로 생성해야 합니다.
    ```javascript
    let users = JSON.parse(localStorage.getItem('kjob.users') || '{}');
    users['admin'] = { password: '1234', role: 'admin', verified: true };
    localStorage.setItem('kjob.users', JSON.stringify(users));
    console.log('✅ admin 계정 생성 완료 (ID: admin, PW: 1234)');
    ```
    * 이후 `admin` / `1234`로 로그인합니다.
    * 일반 구직자 및 기업회원은 회원가입 페이지에서 직접 생성할 수 있습니다.

## 📂 프로젝트 구조

```bash
📦 genie-portal/
├── 📁 src/
│   ├── 📁 assets/
│   │   └── tailwind.css
│   ├── 📁 images/
│   │   ├── logo.png
│   │   ├── KJob.png
│   │   └── 조직도.png
│   ├── 📁 router/
│   │   └── index.js         (Vue Router 설정, 네비게이션 가드 포함)
│   ├── 📁 views/
│   │   ├── AboutView.vue        (기관소개)
│   │   ├── AdminView.vue        (👑 관리자 대시보드)
│   │   ├── AuthVerifyModal.vue  (🔐 본인 인증 모달)
│   │   ├── CivilView.vue        (서비스 안내)
│   │   ├── CopyrightView.vue    (저작권정책)
│   │   ├── CSView.vue           (고객센터)
│   │   ├── HomeView.vue         (메인 페이지)
│   │   ├── JobsView.vue         (채용정보 조회)
│   │   ├── LoginView.vue        (🔑 로그인)
│   │   ├── MapView.vue          (오시는 길)
│   │   ├── MatchingView.vue     (AI 매칭 결과)
│   │   ├── MyPage.vue           (👤 마이페이지 - 구직자/기업)
│   │   ├── NewsView.vue         (알림·소식)
│   │   ├── OpenInfoView.vue     (정보공개)
│   │   ├── PolicyView.vue       (정책·사업)
│   │   ├── PrivacyView.vue      (개인정보처리방침)
│   │   ├── RecruitManageView.vue(🏢 채용 관리)
│   │   ├── RecruitView.vue      (💼 참여·채용 - 역할 분기)
│   │   ├── RegistersView.vue    (🔑 회원가입)
│   │   ├── RegisterView.vue     (구직자 등록)
│   │   └── TermsView.vue        (이용약관)
│   ├── App.vue                (메인 레이아웃: 헤더/푸터)
│   ├── eventBus.js            (로그인 상태 전역 관리)
│   └── main.js                (Vue 앱 마운트)
├── index.html
├── package.json
└── vite.config.js
