<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

/* ─────────────────────────────────────────
  공통 상태
────────────────────────────────────────── */
const role = ref(localStorage.getItem('kjob.role') || 'user')
const username = ref(localStorage.getItem('kjob.username') || '')

/* ─────────────────────────────────────────
  기업 회원용 상태
────────────────────────────────────────── */
const companyJobs = ref([])
const selectedJob = ref(null)
const showDetail = ref(false)
const showApplicantModal = ref(false)
const selectedApplicant = ref(null)

const newJobTitle = ref('')
const newJobLocation = ref('')
const newJobPeriod = ref('')

const editJobId = ref(null)
const editTitle = ref('')
const editLocation = ref('')
const editPeriod = ref('')

/* ─────────────────────────────────────────
  구직자 상태
────────────────────────────────────────── */
const activeTab = ref('jobs') // jobs | match
const applicant = ref(JSON.parse('{"name": "이준호 (샘플)", "email": "junho@kjob.com", "job": "보안, AI"}'))
const appliedJobs = ref([])
const allJobs = ref([])

/* ─────────────────────────────────────────
  더미 지원자 (12명 풀)
────────────────────────────────────────── */
function dummyApplicantsFor(title) {
  const pool = [
    {
      name: '이준호',
      email: 'junho@kjob.com',
      phone: '010-3333-4444',
      education: 'S대학교 정보보호학과 (졸업)',
      experience: '보안분석팀 (2023~2025)\n침해대응, IDS/IPS 로그분석, 모의해킹',
      skills: 'Network, IDS/IPS, Kali Linux, BurpSuite, Security',
      intro: '보안 실무 경험을 쌓으며 위협 대응 역량을 키웠습니다.',
      date: '2025-11-06',
      status: '서류심사 중',
    },
    {
      name: '김민수',
      email: 'minsu@kjob.com',
      phone: '010-1000-2000',
      education: 'K대학교 컴퓨터공학과 (졸업)',
      experience: 'AI 스타트업 인턴 (2024.03~2025.02)\n데이터 파이프라인 구축 및 모델 검증',
      skills: 'Python, Flask, PostgreSQL, AWS, Docker, Data, Backend, SQL',
      intro: '성실하고 꼼꼼한 백엔드 개발자입니다. 팀워크와 문제 해결을 중시합니다.',
      date: '2025-11-05',
      status: '지원완료',
    },
    {
      name: '정가영',
      email: 'gayoung@kjob.com',
      phone: '010-5555-6666',
      education: 'H대학교 AI학부 (졸업)',
      experience: 'AI 연구조교 (2024~2025)\n의료영상 세그멘테이션 모델 연구',
      skills: 'PyTorch, Pandas, MLflow, AI, Python, Data',
      intro: 'AI 연구와 데이터 분석에 열정이 많습니다.',
      date: '2025-11-07',
      status: '면접 예정',
    },
    {
      name: '박지훈',
      email: 'jihun@kjob.com',
      phone: '010-1111-2222',
      education: 'Y대학교 소프트웨어학과 (재학)',
      experience: '웹 개발 동아리 팀장 (2024~2025)\nReact 기반 교내 커뮤니티 사이트 구축',
      skills: 'React, Vue, JavaScript, TailwindCSS, Web, JS',
      intro: '새로운 기술을 배우는 것을 좋아하는 프론트엔드 개발자 지망생입니다.',
      date: '2025-11-08',
      status: '지원완료',
    },
    {
      name: '최수민',
      email: 'sumin@kjob.com',
      phone: '010-7777-8888',
      education: 'D대학교 컴퓨터공학과 (졸업)',
      experience: 'SI 업체 백엔드 개발 (2022~2025)\n공공기관 유지보수 및 신규 기능 개발',
      skills: 'Java, Spring Boot, JPA, MySQL, Backend, SQL',
      intro: '안정적인 서비스 운영 경험이 있는 백엔드 개발자입니다.',
      date: '2025-11-09',
      status: '서류심사 중',
    },
    {
      name: '윤서아',
      email: 'seoah@kjob.com',
      phone: '010-9876-5432',
      education: 'E대학교 통계학과 (졸업)',
      experience: '이커머스 기업 인턴 (6개월)\n구매 데이터 분석 및 리포트 작성',
      skills: 'SQL, Python, Pandas, Tableau, Data, 데이터',
      intro: '데이터에서 인사이트를 찾는 데이터 분석가입니다.',
      date: '2025-11-10',
      status: '면접 예정',
    },
    {
      name: '강태우',
      email: 'taewoo@kjob.com',
      phone: '010-2468-1357',
      education: 'GIST AI 대학원 (석사졸업)',
      experience: '자율주행 연구소 (2023~2025)\n객체 탐지 모델 개발',
      skills: 'Python, TensorFlow, CV, AI, C++',
      intro: '딥러닝과 컴퓨터 비전 기술에 강점이 있습니다.',
      date: '2025-11-11',
      status: '지원완료',
    },
    {
      name: '안효진',
      email: 'hyojin@kjob.com',
      phone: '010-3121-4151',
      education: 'P대학교 시각디자인학과 (졸업)',
      experience: '디자인 에이전시 (2023~2025)\nUX/UI 디자인, 프로토타이핑',
      skills: 'Figma, Adobe XD, UI, UX, Web',
      intro: '사용자 중심의 직관적인 디자인을 추구합니다.',
      date: '2025-11-12',
      status: '서류심사 중',
    },
    {
      name: '문철수',
      email: 'chulsoo@kjob.com',
      phone: '010-1234-5678',
      education: 'B대학교 시스템공학과 (졸업)',
      experience: '반도체 장비 엔지니어 (2022~2025)\n장비 셋업 및 유지보수',
      skills: 'Semiconductor, SCM, CAD, Python',
      intro: '꼼꼼하고 책임감 있는 엔지니어입니다.',
      date: '2025-11-12',
      status: '지원완료',
    },
    {
      name: '백예빈',
      email: 'yebin@kjob.com',
      phone: '010-8765-4321',
      education: 'C대학교 영어영문학과 (졸업)',
      experience: 'IT 기업 해외 마케팅 (2024~2025)\nSNS 채널 관리 및 콘텐츠 번역',
      skills: 'English, Marketing, SNS, SQL',
      intro: '데이터 분석이 가능한 글로벌 마케터입니다.',
      date: '2025-11-13',
      status: '면접 예정',
    },
    {
      name: '홍길동',
      email: 'gildong@kjob.com',
      phone: '010-0000-1111',
      education: 'A대학교 컴퓨터공학과 (신입)',
      experience: '졸업 프로젝트 - AI 챗봇\nNode.js와 Python(Flask)을 연동하여 개발',
      skills: 'Node, JS, Python, AI, Backend',
      intro: '신입이지만 열정이 넘치는 백엔드 개발자입니다.',
      date: '2025-11-14',
      status: '지원완료',
    },
    {
      name: '신유나',
      email: 'yuna@kjob.com',
      phone: '010-2222-3333',
      education: 'S대학교 사이버보안학과 (재학)',
      experience: '교내 보안 동아리\n웹 취약점 분석 및 리포팅',
      skills: 'Web, Security, BurpSuite, Network',
      intro: '화이트 해커를 꿈꾸는 학생입니다. 웹 보안에 자신있습니다.',
      date: '2025-11-15',
      status: '서류심사 중',
    }
  ]
  // 12명 중 랜덤으로 4~7명을 뽑아서 반환
  const shuffled = pool.sort(() => 0.5 - Math.random())
  const count = Math.floor(Math.random() * 4) + 4 // 4~7명
  return shuffled.slice(0, count).map(p => ({ ...p, job: title }))
}

/* ─────────────────────────────────────────
  로컬스토리지 관리
────────────────────────────────────────── */
function storageKey() {
  return `kjob.jobs.${username.value}`
}
function saveJobs() {
  localStorage.setItem(storageKey(), JSON.stringify(companyJobs.value))
}
function seedIfEmpty() {
  const saved = JSON.parse(localStorage.getItem(storageKey()) || '[]')
  if (saved.length) {
    companyJobs.value = saved
    return
  }
  
  // --- (기존 3개 -> 7개로 확장) ---
  companyJobs.value = [
    {
      id: 1001,
      title: 'AI 엔지니어',
      location: '대전',
      period: '2025-11-01 ~ 11-30',
      applicants: dummyApplicantsFor('AI 엔지니어'),
    },
    {
      id: 1002,
      title: '데이터 분석가 (신입)',
      location: '부산',
      period: '2025-11-03 ~ 11-25',
      applicants: dummyApplicantsFor('데이터 분석가'),
    },
    {
      id: 1003,
      title: '정보 보안 담당자 (경력)',
      location: '서울',
      period: '2025-11-02 ~ 11-29',
      applicants: dummyApplicantsFor('보안 담당자'),
    },
    {
      id: 1004,
      title: 'React 웹 프론트엔드 개발자',
      location: '서울 (강남)',
      period: '2025-11-05 ~ 12-05',
      applicants: dummyApplicantsFor('React 웹 프론트엔드 개발자'),
    },
    {
      id: 1005,
      title: 'Spring 백엔드 개발자 (3년 이상)',
      location: '판교',
      period: '2025-11-10 ~ 12-10',
      applicants: dummyApplicantsFor('Spring 백엔드 개발자'),
    },
    {
      id: 1006,
      title: '컴퓨터 비전(CV) 연구원 (석사 이상)',
      location: '대전',
      period: '2025-11-01 ~ 11-30',
      applicants: dummyApplicantsFor('컴퓨터 비전(CV) 연구원'),
    },
    {
      id: 1007,
      title: 'Node.js 풀스택 개발자',
      location: '부산 (해운대)',
      period: '2025-11-07 ~ 11-20',
      applicants: dummyApplicantsFor('Node.js 풀스택 개발자'),
    }
  ]
  saveJobs()
}

/* ─────────────────────────────────────────
  공고 CRUD
────────────────────────────────────────── */
function addJob() {
  if (!newJobTitle.value || !newJobLocation.value || !newJobPeriod.value) {
    alert('모든 항목을 입력해주세요.')
    return
  }
  const newJob = {
    id: Date.now(),
    title: newJobTitle.value,
    location: newJobLocation.value,
    period: newJobPeriod.value,
    applicants: dummyApplicantsFor(newJobTitle.value),
  }
  companyJobs.value.push(newJob)
  saveJobs()
  newJobTitle.value = newJobLocation.value = newJobPeriod.value = ''
  alert('채용공고가 등록되었습니다.')
}
function editJob(job) {
  editJobId.value = job.id
  editTitle.value = job.title
  editLocation.value = job.location
  editPeriod.value = job.period
}
function saveEdit(job) {
  job.title = editTitle.value
  job.location = editLocation.value
  job.period = editPeriod.value
  editJobId.value = null
  saveJobs()
  alert('공고가 수정되었습니다.')
}
function deleteJob(job) {
  if (!confirm(`"${job.title}" 공고를 삭제하시겠습니까?`)) return
  companyJobs.value = companyJobs.value.filter(j => j.id !== job.id)
  saveJobs()
  alert('공고가 삭제되었습니다.')
}

/* ─────────────────────────────────────────
  상세보기 관련
────────────────────────────────────────── */
async function openJobDetail(job) {
  selectedJob.value = job
  showDetail.value = true
  await nextTick()
}
function closeDetail() {
  selectedJob.value = null
  showDetail.value = false
}
function openApplicantDetail(a) {
  selectedApplicant.value = a
  showApplicantModal.value = true
}
function closeApplicantDetail() {
  selectedApplicant.value = null
  showApplicantModal.value = false
}

/* ─────────────────────────────────────────
  구직자 지원
────────────────────────────────────────── */
function applyJob(job) {
  const list = [...appliedJobs.value] 
  
  if (list.some(a => a.id === job.id)) {
    alert('이미 지원한 공고입니다.')
    return
  }
  list.push({
    ...job,
    applicant: username.value,
    dateApplied: new Date().toLocaleString(),
  })
  
  appliedJobs.value = list
  alert(`"${job.title}" 공고에 지원이 완료되었습니다.`)
}

/* ─────────────────────────────────────────
  기업용 - 지원자 적합도 계산 (세분화)
────────────────────────────────────────── */
function calculateSuitability(applicant, job) {
  const jobTitle = job.title.toLowerCase()
  const applicantSkills = (applicant.skills || '').toLowerCase()
  let score = 20 // 기본 점수

  // 이름 대신 스킬 기반으로 변경
  if (jobTitle.includes('ai') || jobTitle.includes('cv')) {
    if (applicantSkills.includes('python')) score += 20
    if (applicantSkills.includes('ai')) score += 20
    if (applicantSkills.includes('pytorch') || applicantSkills.includes('tensorflow')) score += 30
    if (applicantSkills.includes('cv')) score += 10
  }
  else if (jobTitle.includes('데이터')) {
    if (applicantSkills.includes('sql')) score += 25
    if (applicantSkills.includes('python')) score += 20
    if (applicantSkills.includes('pandas')) score += 20
    if (applicantSkills.includes('tableau')) score += 15
  }
  else if (jobTitle.includes('보안')) {
    if (applicantSkills.includes('security') || applicantSkills.includes('보안')) score += 30
    if (applicantSkills.includes('network')) score += 20
    if (applicantSkills.includes('burpsuite') || applicantSkills.includes('kali')) score += 25
  }
  else if (jobTitle.includes('프론트') || jobTitle.includes('react')) {
    if (applicantSkills.includes('react')) score += 40
    if (applicantSkills.includes('vue')) score += 20
    if (applicantSkills.includes('js')) score += 20
  }
  else if (jobTitle.includes('백엔드') || jobTitle.includes('spring')) {
    if (applicantSkills.includes('java') || applicantSkills.includes('spring')) score += 40
    if (applicantSkills.includes('sql') || applicantSkills.includes('mysql')) score += 20
    if (applicantSkills.includes('docker')) score += 10
  }
  else if (jobTitle.includes('node')) {
    if (applicantSkills.includes('node')) score += 40
    if (applicantSkills.includes('js')) score += 20
  }
  
  // 랜덤값 추가
  let randomFactor = Math.floor(Math.random() * 7) - 3;
  score += randomFactor;
  
  return Math.min(Math.max(score, 10), 98) // 10 ~ 98점 사이로 보정
}


/* ─────────────────────────────────────────
  구직자 매칭 로직
────────────────────────────────────────── */
const matchedJobs = computed(() => {
  if (!applicant.value) return []
  
  const userKeywords = applicant.value.job?.toLowerCase().split(/[\s,]+/).filter(Boolean) || []
  if (!userKeywords.length) return []

  const matches = []

  allJobs.value.forEach(job => {
    const title = job.title.toLowerCase()
    let score = 0
    
    if (userKeywords.includes('ai') && (title.includes('ai') || title.includes('엔지니어') || title.includes('cv'))) {
      score += 50
    }
    if (userKeywords.includes('보안') && title.includes('보안')) {
      score += 50
    }
    if (userKeywords.includes('데이터') && title.includes('데이터')) {
      score += 50
    }
    if (userKeywords.includes('프론트') && (title.includes('프론트') || title.includes('react'))) {
      score += 40
    }
    if (userKeywords.includes('백엔드') && (title.includes('백엔드') || title.includes('spring') || title.includes('node'))) {
      score += 40
    }
    
    if (score > 0) {
      matches.push({
        job: job,
        score: Math.min(score, 100)
      })
    }
  })

  return matches.sort((a, b) => b.score - a.score)
})

/* ─────────────────────────────────────────
  Mounted
────────────────────────────────────────── */
onMounted(() => {
  if (role.value === 'company') {
    seedIfEmpty()
  }
  
  // --- (기존 3개 -> 7개로 확장) ---
  // 구직자('user')가 보는 'allJobs' 목록도 seed 데이터와 일치시킴
  if (role.value === 'user') {
    allJobs.value = [
      {
        id: 1001,
        title: 'AI 엔지니어',
        location: '대전',
        period: '2025-11-01 ~ 11-30',
      },
      {
        id: 1002,
        title: '데이터 분석가 (신입)',
        location: '부산',
        period: '2025-11-03 ~ 11-25',
      },
      {
        id: 1003,
        title: '정보 보안 담당자 (경력)',
        location: '서울',
        period: '2025-11-02 ~ 11-29',
      },
      {
        id: 1004,
        title: 'React 웹 프론트엔드 개발자',
        location: '서울 (강남)',
        period: '2025-11-05 ~ 12-05',
      },
      {
        id: 1005,
        title: 'Spring 백엔드 개발자 (3년 이상)',
        location: '판교',
        period: '2025-11-10 ~ 12-10',
      },
      {
        id: 1006,
        title: '컴퓨터 비전(CV) 연구원 (석사 이상)',
        location: '대전',
        period: '2025-11-01 ~ 11-30',
      },
      {
        id: 1007,
        title: 'Node.js 풀스택 개발자',
        location: '부산 (해운대)',
        period: '2025-11-07 ~ 11-20',
      }
    ]
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold text-govblue mb-8">참여·채용</h1>

    <div v-if="role === 'company'">
      <h2 class="text-2xl font-bold mb-4 text-blue-700">기업 채용관리 대시보드</h2>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold mb-4">새 채용공고 등록</h3>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <input
            v-model="newJobTitle"
            placeholder="공고명"
            class="border rounded p-2"
          />
          <input
            v-model="newJobLocation"
            placeholder="근무지"
            class="border rounded p-2"
          />
          <input
            v-model="newJobPeriod"
            placeholder="채용기간"
            class="border rounded p-2"
          />
        </div>
        <button
          @click="addJob"
          class="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          공고 등록
        </button>
      </div>

      <div v-if="!showDetail">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-blue-700 text-white">
              <th class="p-3">공고명</th>
              <th class="p-3">근무지</th>
              <th class="p-3">채용기간</th>
              <th class="p-3 text-center">지원자 수</th>
              <th class="p-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in companyJobs"
              :key="job.id"
              class="border-b hover:bg-slate-50"
            >
              <template v-if="editJobId === job.id">
                <td class="p-2">
                  <input v-model="editTitle" class="border rounded p-1 w-full" />
                </td>
                <td class="p-2">
                  <input v-model="editLocation" class="border rounded p-1 w-full" />
                </td>
                <td class="p-2">
                  <input v-model="editPeriod" class="border rounded p-1 w-full" />
                </td>
                <td class="p-2 text-center text-blue-700">
                  {{ job.applicants.length }}
                </td>
                <td class="p-2 text-center">
                  <button
                    @click="saveEdit(job)"
                    class="bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    저장
                  </button>
                </td>
              </template>
              <template v-else>
                <td class="p-3 font-semibold">{{ job.title }}</td>
                <td class="p-3">{{ job.location }}</td>
                <td class="p-3">{{ job.period }}</td>
                <td class="p-3 text-center">
                  <button class="text-blue-700 underline" @click="openJobDetail(job)">
                    {{ job.applicants.length }}
                  </button>
                </td>
                <td class="p-3 text-center space-x-2">
                  <button
                    @click="editJob(job)"
                    class="text-sm text-blue-600 underline"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteJob(job)"
                    class="text-sm text-red-600 underline"
                  >
                    삭제
                  </button>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-govblue">{{ selectedJob.title }} 지원자 목록</h2>
          <button
            @click="closeDetail"
            class="text-sm border px-4 py-1.5 rounded hover:bg-slate-100"
          >
            ← 공고 목록으로
          </button>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-govblue text-white">
              <th class="p-3">이름</th>
              <th class="p-3">이메일</th>
              <th class="p-3">전화번호</th>
              <th class="p-3">학력</th>
              <th class="p-3">경력 요약</th>
              <th class="p-3">보유 기술</th>
              <th class="p-3 text-center">적합도</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a in selectedJob.applicants"
              :key="a.email"
              class="border-b hover:bg-slate-50"
            >
              <td class="p-3">
                <div class="font-semibold">{{ a.name }}</div>
                <button
                  @click.stop="openApplicantDetail(a)"
                  class="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  이력서 보기
                </button>
              </td>
              <td class="p-3">{{ a.email }}</td>
              <td class="p-3">{{ a.phone }}</td>
              <td class="p-3">{{ a.education }}</td>
              <td class="p-3">{{ a.experience.split('\n')[0] }}</td>
              <td class="p-3">{{ a.skills }}</td>
              <td class="p-3 text-center font-bold text-blue-600">
                {{ calculateSuitability(a, selectedJob) }}%
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="showApplicantModal && selectedApplicant"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-xl shadow-lg p-6 w-[520px] relative">
            <button
              @click="closeApplicantDetail"
              class="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            <h3 class="text-2xl font-bold text-govblue mb-4">
              {{ selectedApplicant.name }} 님의 이력서
            </h3>
            <p><strong>이메일:</strong> {{ selectedApplicant.email }}</p>
            <p><strong>전화번호:</strong> {{ selectedApplicant.phone }}</p>
            <p><strong>학력:</strong> {{ selectedApplicant.education }}</p>
            <p class="whitespace-pre-line">
              <strong>경력:</strong> {{ selectedApplicant.experience }}
            </p>
            <p><strong>보유 기술:</strong> {{ selectedApplicant.skills }}</p>
            <p class="mt-3 text-slate-700 whitespace-pre-line">
              <strong>자기소개:</strong> {{ selectedApplicant.intro }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="flex gap-6 border-b border-slate-200 mb-8 justify-center">
        <button
          @click="activeTab = 'jobs'"
          :class="[
            'pb-2 font-semibold',
            activeTab === 'jobs'
              ? 'text-govblue border-b-2 border-govblue'
              : 'text-slate-500',
          ]"
        >
          💼 전체 공고
        </button>
        <button
          @click="activeTab = 'match'"
          :class="[
            'pb-2 font-semibold',
            activeTab === 'match'
              ? 'text-govblue border-b-2 border-govblue'
              : 'text-slate-500',
          ]"
        >
          🎯 매칭 추천
        </button>
      </div>

      <div v-if="activeTab === 'jobs'">
        <h2 class="text-2xl font-bold text-govblue mb-6">전체 채용공고</h2>
        <div v-if="!allJobs.length" class="text-center text-slate-500 py-8">
          등록된 공고가 없습니다.
        </div>
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-govblue text-white">
              <th class="p-3">공고명</th>
              <th class="p-3">근무지</th>
              <th class="p-3">기간</th>
              <th class="p-3 text-center">지원</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="j in allJobs"
              :key="j.id"
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 font-semibold">{{ j.title }}</td>
              <td class="p-3">{{ j.location }}</td>
              <td class="p-3">{{ j.period }}</td>
              <td class="p-3 text-center">
                <button
                  v-if="!appliedJobs.some(a => a.id === j.id)"
                  @click="applyJob(j)"
                  class="bg-govblue text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                >
                  지원하기
                </button>
                <span v-else class="text-slate-500 text-sm">지원 완료</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <h2 class="text-2xl font-bold text-govblue mb-6">🎯 맞춤 공고 추천</h2>
        <div v-if="!applicant" class="text-center text-slate-500 py-8">
          📝 먼저 이력서를 등록해주세요.
        </div>
        <div v-else-if="!matchedJobs.length" class="text-center text-slate-500 py-8">
          현재 조건에 맞는 공고가 없습니다.
        </div>

        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="p-3">공고명</th>
              <th class="p-3">근무지</th>
              <th class="p-3">기간</th>
              <th class="p-3 text-center">적합도</th>
              <th class="p-3 text-center">지원</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="match in matchedJobs"
              :key="match.job.id"
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 font-semibold">{{ match.job.title }}</td>
              <td class="p-3">{{ match.job.location }}</td>
              <td class="p-3">{{ match.job.period }}</td>
              <td class="p-3 text-center font-bold text-blue-600">{{ match.score }}%</td>
              <td class="p-3 text-center">
                <button
                  v-if="!appliedJobs.some(a => a.id === match.job.id)"
                  @click="applyJob(match.job)"
                  class="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                >
                  지원하기
                </button>
                <span v-else class="text-slate-500 text-sm">지원 완료</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>