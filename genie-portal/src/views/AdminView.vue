<script setup>
import { ref, onMounted } from 'vue'

// 1. 상태 변수 정의
const allApplicants = ref([])
const allJobs = ref([])
const selectedJob = ref(null)
const matchedApplicants = ref([])
const activeTab = ref('jobs') // 'jobs' | 'users'

// --- ⬇️ (수정된 영역: 더미데이터) ⬇️ ---

// 2. 확장된 구직자 더미데이터 (7명)
const dummyApplicants = [
  {
    id: 'lee_junho',
    info: { name: '이준호', email: 'junho@kjob.com', phone: '010-3333-4444' },
    resume: {
      education: 'S대학교 정보보호학과 (졸업)',
      experience: '보안분석팀 (2023~2025)\n침해대응, IDS/IPS 로그분석, 모의해킹',
      skills: 'Network, IDS/IPS, Kali Linux, BurpSuite, Security',
      intro: '보안 실무 경험을 쌓으며 위협 대응 역량을 키웠습니다.'
    }
  },
  {
    id: 'kim_minsu',
    info: { name: '김민수', email: 'minsu@kjob.com', phone: '010-1000-2000' },
    resume: {
      education: 'K대학교 컴퓨터공학과 (졸업)',
      experience: 'AI 스타트업 인턴 (2024.03~2025.02)\n데이터 파이프라인 구축 및 모델 검증',
      skills: 'Python, Flask, PostgreSQL, AWS, Docker, Data',
      intro: '성실하고 꼼꼼한 백엔드 개발자입니다. 팀워크와 문제 해결을 중시합니다.'
    }
  },
  {
    id: 'jung_gayoung',
    info: { name: '정가영', email: 'gayoung@kjob.com', phone: '010-5555-6666' },
    resume: {
      education: 'H대학교 AI학부 (졸업)',
      experience: 'AI 연구조교 (2024~2025)\n의료영상 세그멘테이션 모델 연구',
      skills: 'PyTorch, Pandas, MLflow, AI, Python',
      intro: 'AI 연구와 데이터 분석에 열정이 많습니다.'
    }
  },
  {
    id: 'park_jihun',
    info: { name: '박지훈', email: 'jihun@kjob.com', phone: '010-1111-2222' },
    resume: {
      education: 'Y대학교 소프트웨어학과 (재학)',
      experience: '웹 개발 동아리 팀장 (2024~2025)\nReact 기반 교내 커뮤니티 사이트 구축',
      skills: 'React, Vue, JavaScript, TailwindCSS, Web, JS',
      intro: '새로운 기술을 배우는 것을 좋아하는 프론트엔드 개발자 지망생입니다.'
    }
  },
  {
    id: 'choi_sumin',
    info: { name: '최수민', email: 'sumin@kjob.com', phone: '010-7777-8888' },
    resume: {
      education: 'D대학교 컴퓨터공학과 (졸업)',
      experience: 'SI 업체 백엔드 개발 (2022~2025)\n공공기관 유지보수 및 신규 기능 개발',
      skills: 'Java, Spring Boot, JPA, MySQL, Backend',
      intro: '안정적인 서비스 운영 경험이 있는 백엔드 개발자입니다.'
    }
  },
  {
    id: 'yoon_seoah',
    info: { name: '윤서아', email: 'seoah@kjob.com', phone: '010-9876-5432' },
    resume: {
      education: 'E대학교 통계학과 (졸업)',
      experience: '이커머스 기업 인턴 (6개월)\n구매 데이터 분석 및 리포트 작성',
      skills: 'SQL, Python, Pandas, Tableau, Data, 데이터',
      intro: '데이터에서 인사이트를 찾는 데이터 분석가입니다.'
    }
  },
  {
    id: 'kang_taewoo',
    info: { name: '강태우', email: 'taewoo@kjob.com', phone: '010-2468-1357' },
    resume: {
      education: 'GIST AI 대학원 (석사졸업)',
      experience: '자율주행 연구소 (2023~2025)\n객체 탐지 모델 개발',
      skills: 'Python, TensorFlow, CV, AI, C++',
      intro: '딥러닝과 컴퓨터 비전 기술에 강점이 있습니다.'
    }
  }
]

// 3. 확장된 채용 공고 더미데이터 (7개)
const dummyJobs = [
  {
    id: 1001,
    title: 'AI 엔지니어',
    companyOwner: '스마트AI랩 (admin)',
    location: '대전',
    period: '2025-11-01 ~ 11-30',
  },
  {
    id: 1002,
    title: '데이터 분석가 (신입)',
    companyOwner: 'K-Job 데이터센터 (company1)',
    location: '부산',
    period: '2025-11-03 ~ 11-25',
  },
  {
    id: 1003,
    title: '정보 보안 담당자 (경력)',
    companyOwner: '국가정보보호원 (company2)',
    location: '서울',
    period: '2025-11-02 ~ 11-29',
  },
  {
    id: 1004,
    title: 'React 웹 프론트엔드 개발자',
    companyOwner: '네오테크 (company3)',
    location: '서울 (강남)',
    period: '2025-11-05 ~ 12-05',
  },
  {
    id: 1005,
    title: 'Spring 백엔드 개발자 (3년 이상)',
    companyOwner: '하이비전소프트 (company1)',
    location: '판교',
    period: '2025-11-10 ~ 12-10',
  },
  {
    id: 1006,
    title: '컴퓨터 비전(CV) 연구원 (석사 이상)',
    companyOwner: '퓨처데이터랩 (admin)',
    location: '대전',
    period: '2025-11-01 ~ 11-30',
  },
  {
    id: 1007,
    title: 'Node.js 풀스택 개발자',
    companyOwner: '네오테크 (company3)',
    location: '부산 (해운대)',
    period: '2025-11-07 ~ 11-20',
  }
]

// 4. 컴포넌트 마운트 시 더미데이터 할당
onMounted(() => {
  // localStorage 로드 로직 대신 더미데이터를 직접 할당
  allApplicants.value = dummyApplicants
  allJobs.value = dummyJobs
})

// --- ⬆️ (수정된 영역) ⬆️ ---

/**
 * 5. 관리자용 매칭 로직 (더미데이터 스킬 기반으로 수정)
 */
function calculateAdminMatch(applicant, job) {
  if (!applicant || !job || !applicant.resume) return 0
  
  const title = job.title.toLowerCase()
  const skills = (applicant.resume.skills || '').toLowerCase()
  let score = 0

  // 키워드 기반 점수 부여 (예시 로직)
  if (title.includes('ai') && (skills.includes('ai') || skills.includes('python') || skills.includes('pytorch') || skills.includes('tensorflow'))) score += 50
  if (title.includes('데이터') && (skills.includes('data') || skills.includes('sql') || skills.includes('pandas') || skills.includes('데이터'))) score += 50
  if (title.includes('보안') && (skills.includes('security') || skills.includes('보안') || skills.includes('burpsuite') || skills.includes('ids'))) score += 50
  if (title.includes('웹') && (skills.includes('js') || skills.includes('react') || skills.includes('vue') || skills.includes('web'))) score += 40
  if (title.includes('백엔드') && (skills.includes('java') || skills.includes('spring') || skills.includes('node') || skills.includes('backend'))) score += 40
  if (title.includes('cv') && (skills.includes('cv') || skills.includes('tensorflow'))) score += 60 // CV는 가중치

  return Math.min(score, 100) // 100점 만점
}

/**
 * 6. 특정 공고에 대한 추천 인재 찾기
 */
function findMatches(job) {
  selectedJob.value = job
  
  const matches = allApplicants.value.map(app => {
    return {
      ...app,
      matchScore: calculateAdminMatch(app, job)
    }
  })
  
  // 점수가 0보다 크고, 점수 순으로 정렬
  matchedApplicants.value = matches
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
}

</script>

<template>
  <div class="bg-white rounded-xl shadow p-8 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-govblue mb-8">
      👑 관리자 대시보드
    </h1>

    <div class="flex gap-6 border-b border-slate-200 mb-8 justify-center">
      <button 
        @click="activeTab = 'jobs'" 
        :class="['pb-2 font-semibold', activeTab === 'jobs' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']">
        전체 채용 공고 ({{ allJobs.length }})
      </button>
      <button 
        @click="activeTab = 'users'" 
        :class="['pb-2 font-semibold', activeTab === 'users' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']">
        전체 구직자 ({{ allApplicants.length }})
      </button>
    </div>

    <div v-if="activeTab === 'jobs'">
      <h2 class="text-2xl font-bold text-govblue mb-6">📋 전체 채용 공고</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-govblue text-white">
            <th class="p-3">공고명</th>
            <th class="p-3">기업명 (ID)</th>
            <th class="p-3">근무지</th>
            <th class="p-3">기간</th>
            <th class="p-3 text-center">추천</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in allJobs" :key="job.id" class="border-b hover:bg-slate-50">
            <td class="p-3 font-semibold">{{ job.title }}</td>
            <td class="p-3">{{ job.companyOwner }}</td>
            <td class="p-3">{{ job.location }}</td>
            <td class="p-3">{{ job.period }}</td>
            <td class="p-3 text-center">
              <button 
                @click="findMatches(job)"
                class="bg-govblue text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                인재 찾기
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="selectedJob" class="mt-10 border-t pt-6">
        <h3 class="text-xl font-bold text-blue-700 mb-4">
          🎯 "{{ selectedJob.title }}" 공고 추천 인재
        </h3>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="p-3">적합도</th>
              <th class="p-3">이름 (ID)</th>
              <th class="p-3">이메일</th>
              <th class="p-3">보유 기술</th>
              <th class="p-3">경력 요약</th>
            </tr>
          </thead>
          <tbody>
            <tr vIif="!matchedApplicants.length">
              <td colspan="5" class="p-4 text-center text-slate-500">추천할 인재가 없습니다.</td>
            </tr>
            <tr v-for="app in matchedApplicants" :key="app.id" class="border-b hover:bg-slate-50">
              <td class="p-3 font-bold text-blue-600">{{ app.matchScore }}%</td>
              <td class="p-3 font-semibold">{{ app.info.name || app.id }} ({{ app.id }})</td>
              <td class="p-3">{{ app.info.email }}</td>
              <td class="p-3 text-sm">{{ app.resume.skills }}</td>
              <td class="p-3 text-sm">{{ app.resume.experience.split('\n')[0] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="activeTab === 'users'">
      <h2 class="text-2xl font-bold text-govblue mb-6">👤 전체 구직자 목록</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-govblue text-white">
            <th class="p-3">이름 (ID)</th>
            <th class="p-3">이메일</th>
            <th class="p-3">전화번호</th>
            <th class="p-3">보유 기술</th>
            <th class="p-3">경력 요약</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in allApplicants" :key="app.id" class="border-b hover:bg-slate-50">
            <td class="p-3 font-semibold">{{ app.info.name }} ({{ app.id }})</td>
            <td class="p-3">{{ app.info.email }}</td>
            <td class="p-3">{{ app.info.phone }}</td>
            <td class="p-3 text-sm">{{ app.resume.skills }}</td>
            <td class="p-3 text-sm">{{ app.resume.experience.split('\n')[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>