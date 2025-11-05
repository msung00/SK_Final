<script setup>
import { ref, onMounted, nextTick } from 'vue'

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

// 공고 등록 폼
const newJobTitle = ref('')
const newJobLocation = ref('')
const newJobPeriod = ref('')

/* ─────────────────────────────────────────
  구직자 탭(기존 구조 최소 유지)
────────────────────────────────────────── */
const activeTab = ref('resume')
const applicant = ref(JSON.parse(localStorage.getItem('kjob.applicant') || 'null'))
const appliedJobs = ref(JSON.parse(localStorage.getItem('kjob.applied') || '[]'))

const name = ref('')
const phone = ref('')
const email = ref('')
const job = ref('')

const matchList = [
  { title: '백엔드 개발자', company: 'K-Job 데이터센터', score: 95, location: '서울' },
  { title: 'AI 연구원', company: '스마트AI연구소', score: 93, location: '대전' },
  { title: '정보보호 담당자', company: 'K-Security', score: 91, location: '부산' },
]
const jobs = [
  { id: 1, title: 'AI 엔지니어', company: 'K-Job AI팀', location: '대전', date: '2025-11-10 ~ 11-30' },
  { id: 2, title: '정보보안 담당자', company: 'K-Security', location: '서울', date: '2025-11-01 ~ 11-25' },
  { id: 3, title: '데이터 분석가', company: 'SmartData', location: '부산', date: '2025-11-05 ~ 11-27' },
]

function saveApplicant() {
  if (!name.value || !phone.value || !email.value || !job.value) {
    alert('모든 항목을 입력해주세요.')
    return
  }
  const data = { name: name.value, phone: phone.value, email: email.value, job: job.value }
  localStorage.setItem('kjob.applicant', JSON.stringify(data))
  applicant.value = data
  alert('이력서가 등록되었습니다!')
}

function apply(jobRow) {
  if (!applicant.value) {
    alert('먼저 이력서를 등록해주세요.')
    return
  }
  const list = JSON.parse(localStorage.getItem('kjob.applied') || '[]')
  list.push({ ...jobRow, applicant: applicant.value.name, dateApplied: new Date().toLocaleString() })
  localStorage.setItem('kjob.applied', JSON.stringify(list))
  appliedJobs.value = list
  alert(`"${jobRow.title}" 공고에 지원이 완료되었습니다.`)
}

/* ─────────────────────────────────────────
  더미 지원자 생성 (중복 제거 + 줄바꿈 처리 대응)
────────────────────────────────────────── */
function dummyApplicantsFor(title) {
  const pool = [
    {
      name: '김민수',
      email: 'minsu@kjob.com',
      phone: '010-1000-2000',
      education: 'K대학교 컴퓨터공학과 (졸업)',
      experience: 'AI 스타트업 인턴 (2024.03~2025.02)\n데이터 파이프라인 구축 및 모델 검증',
      skills: 'Python, Flask, PostgreSQL, AWS, Docker',
      intro: '성실하고 꼼꼼한 백엔드 개발자입니다.\n팀워크와 문제 해결을 중시합니다.',
      date: '2025-11-05',
      status: '지원완료',
    },
    {
      name: '이준호',
      email: 'junho@kjob.com',
      phone: '010-3333-4444',
      education: 'S대학교 정보보호학과 (졸업)',
      experience: '보안분석팀 (2023~2025)\n침해대응, IDS/IPS 로그분석, 모의해킹',
      skills: 'Network, IDS/IPS, Kali Linux, BurpSuite',
      intro: '보안 실무 경험을 쌓으며 위협 대응 역량을 키웠습니다.',
      date: '2025-11-06',
      status: '서류심사 중',
    },
    {
      name: '정가영',
      email: 'gayoung@kjob.com',
      phone: '010-5555-6666',
      education: 'H대학교 AI학부 (졸업)',
      experience: 'AI 연구조교 (2024~2025)\n의료영상 세그멘테이션 모델 연구',
      skills: 'PyTorch, Pandas, MLflow',
      intro: 'AI 연구와 데이터 분석에 열정이 많습니다.',
      date: '2025-11-07',
      status: '면접 예정',
    },
    {
      name: '박민호',
      email: 'minho@kjob.com',
      phone: '010-7777-8888',
      education: 'D대학교 소프트웨어학과 (졸업)',
      experience: '풀스택 개발자 (2023~현재)\nERP 및 Vue 기반 관리시스템 구축',
      skills: 'Java, Spring Boot, Vue.js, MySQL',
      intro: '사용자 중심의 직관적인 시스템을 설계합니다.',
      date: '2025-11-08',
      status: '1차합격',
    },
    {
      name: '이수진',
      email: 'soojin@kjob.com',
      phone: '010-9999-1212',
      education: 'E대학교 데이터사이언스학과 (졸업)',
      experience: '데이터 분석 인턴 (2024~2025)\nETL, 대시보드 시각화',
      skills: 'Python, Airflow, BigQuery, Tableau',
      intro: '데이터에서 가치를 찾는 분석가로 성장 중입니다.',
      date: '2025-11-09',
      status: '최종합격',
    },
  ]

  const count = Math.min(pool.length, Math.floor(Math.random() * 3) + 3)
  const applicants = []

  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    const chosen = pool.splice(idx, 1)[0]
    applicants.push({ ...chosen, job: title })
  }

  return applicants
}

/* ─────────────────────────────────────────
  공고 데이터 저장/불러오기
────────────────────────────────────────── */
function storageKey() {
  return `kjob.jobs.${username.value}`
}

function loadJobs() {
  const saved = JSON.parse(localStorage.getItem(storageKey()) || '[]')
  companyJobs.value = saved
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
      title: '데이터 분석가',
      location: '부산',
      period: '2025-11-03 ~ 11-25',
      applicants: dummyApplicantsFor('데이터 분석가'),
    },
    {
      id: 1003,
      title: '보안 담당자',
      location: '서울',
      period: '2025-11-02 ~ 11-29',
      applicants: dummyApplicantsFor('보안 담당자'),
    },
  ]
  saveJobs()
}

/* ─────────────────────────────────────────
  공고 등록 / 전환 / 모달
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
  companyJobs.value = [...companyJobs.value, newJob]
  saveJobs()
  newJobTitle.value = newJobLocation.value = newJobPeriod.value = ''
  alert('채용공고가 등록되었습니다.')
}

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

onMounted(() => {
  if (!localStorage.getItem('kjob.role')) {
    localStorage.setItem('kjob.role', 'company')
    role.value = 'company'
  }
  if (!username.value) {
    localStorage.setItem('kjob.username', 'demo_company')
    username.value = 'demo_company'
  }

  if (role.value === 'company') {
    seedIfEmpty()
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold text-govblue mb-8">참여·채용</h1>

    <!-- 🏢 기업회원 화면 -->
    <div v-if="role === 'company'">
      <h2 class="text-2xl font-bold mb-4 text-blue-700">기업 채용관리 대시보드</h2>

      <!-- 공고 등록 -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold mb-4">새 채용공고 등록</h3>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <input v-model="newJobTitle" placeholder="공고명 (예: 백엔드 개발자)" class="border rounded p-2" />
          <input v-model="newJobLocation" placeholder="근무지 (예: 서울)" class="border rounded p-2" />
          <input v-model="newJobPeriod" placeholder="채용기간 (예: 11-01 ~ 11-30)" class="border rounded p-2" />
        </div>
        <button @click="addJob" class="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
          공고 등록
        </button>
      </div>

      <!-- 공고 목록 -->
      <div v-if="!showDetail">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-blue-700 text-white">
              <th class="p-3">공고명</th>
              <th class="p-3">근무지</th>
              <th class="p-3">채용기간</th>
              <th class="p-3 text-center">지원자 수</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in companyJobs"
              :key="job.id"
              class="border-b hover:bg-slate-50 cursor-pointer transition"
            >
              <td class="p-3 font-semibold">{{ job.title }}</td>
              <td class="p-3">{{ job.location }}</td>
              <td class="p-3">{{ job.period }}</td>
              <td class="p-3 text-center">
                <button
                  class="text-blue-700 underline hover:text-blue-900"
                  @click="openJobDetail(job)"
                >
                  {{ job.applicants.length }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 지원자 목록 -->
      <div v-else>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-govblue">{{ selectedJob.title }} 지원자 목록</h2>
          <button
            @click="closeDetail"
            class="text-sm border px-4 py-1.5 rounded hover:bg-slate-100"
          >
            ← 공고 목록으로 돌아가기
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
              <th class="p-3 text-center">상세보기</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a in selectedJob.applicants"
              :key="a.email"
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 font-semibold">{{ a.name }}</td>
              <td class="p-3">{{ a.email }}</td>
              <td class="p-3">{{ a.phone }}</td>
              <td class="p-3">{{ a.education }}</td>
              <td class="p-3">{{ a.experience.split('\n')[0] }}</td>
              <td class="p-3">{{ a.skills }}</td>
              <td class="p-3 text-center">
                <button
                  @click.stop="openApplicantDetail(a)"
                  class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  상세보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 상세 이력서 모달 -->
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
            <p class="whitespace-pre-line"><strong>경력:</strong> {{ selectedApplicant.experience }}</p>
            <p><strong>보유 기술:</strong> {{ selectedApplicant.skills }}</p>
            <p class="mt-3 text-slate-700 whitespace-pre-line">
              <strong>자기소개:</strong> {{ selectedApplicant.intro }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 👤 구직자 화면 (기존 유지) -->
    <div v-else>
      <div class="text-slate-500 text-center py-6">구직자 화면은 기존 구조 그대로 유지됩니다.</div>
    </div>
  </div>
</template>
