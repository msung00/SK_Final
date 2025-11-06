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

// 'AI' 키워드를 추가하여 매칭 공고를 2개로 늘림
const applicant = ref(JSON.parse('{"name": "이준호 (샘플)", "email": "junho@kjob.com", "job": "보안, AI"}'))

// 새로고침 시 지원 상태 초기화를 위해 로컬스토리지 대신 빈 배열로 시작
const appliedJobs = ref([])

const allJobs = ref([])

/* ─────────────────────────────────────────
  더미 지원자
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
      intro: '성실하고 꼼꼼한 백엔드 개발자입니다. 팀워크와 문제 해결을 중시합니다.',
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
  ]
  return pool.map(p => ({ ...p, job: title }))
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
// '지원하기' 테스트를 위해 로컬스토리지 로직 제거
function applyJob(job) {
  // 현재 세션의 appliedJobs.value (ref)를 기준으로 중복 검사
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
  
  appliedJobs.value = list // ref만 업데이트 (새로고침 시 초기화됨)
  alert(`"${job.title}" 공고에 지원이 완료되었습니다.`)
}

/* ─────────────────────────────────────────
  ✅ 기업용 - 지원자 적합도 계산 (신규 추가)
────────────────────────────────────────── */
function calculateSuitability(applicant, job) {
  const jobTitle = job.title.toLowerCase()
  let score = 20 // 기본 점수

  // 데모 데이터를 기반으로 점수 차등 부여
  if (applicant.name === '김민수') { // 스킬: Python, Flask, PostgreSQL, AWS, Docker
    if (jobTitle.includes('ai')) score = 85
    else if (jobTitle.includes('데이터')) score = 90
    else if (jobTitle.includes('보안')) score = 30
  } 
  else if (applicant.name === '이준호') { // 스킬: Network, IDS/IPS, Kali Linux, BurpSuite
    if (jobTitle.includes('보안')) score = 95
    else if (jobTitle.includes('ai')) score = 40
    else if (jobTitle.includes('데이터')) score = 25
  }
  else if (applicant.name === '정가영') { // 스킬: PyTorch, Pandas, MLflow
    if (jobTitle.includes('ai')) score = 90
    else if (jobTitle.includes('데이터')) score = 75
    else if (jobTitle.includes('보안')) score = 25
  }
  
  return Math.min(score, 100) // 100점 만점
}


/* ─────────────────────────────────────────
  구직자 매칭 로직
────────────────────────────────────────── */
// '적합도' 점수 계산 로직
const matchedJobs = computed(() => {
  if (!applicant.value) return []
  
  // 1. 구직자의 키워드 추출 (예: "보안, AI" -> ['보안', 'ai'])
  const userKeywords = applicant.value.job?.toLowerCase().split(/[\s,]+/).filter(Boolean) || []
  if (!userKeywords.length) return []

  const matches = []

  allJobs.value.forEach(job => {
    const title = job.title.toLowerCase()
    let score = 0
    
    // 2. 키워드 매칭 점수 계산 (키워드 당 50점)
    if (userKeywords.includes('ai') && title.includes('ai')) {
      score += 50
    }
    if (userKeywords.includes('보안') && title.includes('보안')) {
      score += 50
    }
    if (userKeywords.includes('데이터') && title.includes('데이터')) {
      score += 50
    }
    // (필요시 '웹', '백엔드' 등 다른 키워드 규칙 추가)

    // 3. 점수가 0보다 큰 경우에만 목록에 추가
    if (score > 0) {
      matches.push({
        job: job, // 원본 공고 데이터
        score: Math.min(score, 100) // 점수는 100점을 넘지 않도록
      })
    }
  })

  // 4. 높은 점수 순으로 정렬
  return matches.sort((a, b) => b.score - a.score)
})

/* ─────────────────────────────────────────
  Mounted
────────────────────────────────────────── */
onMounted(() => {
  if (role.value === 'company') {
    seedIfEmpty()
  }
  
  // 'user' (구직자) 역할일 때, 항상 더미 공고 3개를 allJobs에 할당
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
        title: '데이터 분석가',
        location: '부산',
        period: '2025-11-03 ~ 11-25',
      },
      {
        id: 1003,
        title: '보안 담당자',
        location: '서울',
        period: '2025-11-02 ~ 11-29',
      },
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
          <input v-model="newJobTitle" placeholder="공고명" class="border rounded p-2" />
          <input v-model="newJobLocation" placeholder="근무지" class="border rounded p-2" />
          <input v-model="newJobPeriod" placeholder="채용기간" class="border rounded p-2" />
        </div>
        <button @click="addJob" class="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">공고 등록</button>
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
            <tr v-for="job in companyJobs" :key="job.id" class="border-b hover:bg-slate-50">
              <template v-if="editJobId === job.id">
                <td class="p-2"><input v-model="editTitle" class="border rounded p-1 w-full" /></td>
                <td class="p-2"><input v-model="editLocation" class="border rounded p-1 w-full" /></td>
                <td class="p-2"><input v-model="editPeriod" class="border rounded p-1 w-full" /></td>
                <td class="p-2 text-center text-blue-700">{{ job.applicants.length }}</td>
                <td class="p-2 text-center">
                  <button @click="saveEdit(job)" class="bg-green-600 text-white px-2 py-1 rounded text-sm">저장</button>
                </td>
              </template>
              <template v-else>
                <td class="p-3 font-semibold">{{ job.title }}</td>
                <td class="p-3">{{ job.location }}</td>
                <td class="p-3">{{ job.period }}</td>
                <td class="p-3 text-center">
                  <button class="text-blue-700 underline" @click="openJobDetail(job)">{{ job.applicants.length }}</button>
                </td>
                <td class="p-3 text-center space-x-2">
                  <button @click="editJob(job)" class="text-sm text-blue-600 underline">수정</button>
                  <button @click="deleteJob(job)" class="text-sm text-red-600 underline">삭제</button>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-govblue">{{ selectedJob.title }} 지원자 목록</h2>
          <button @click="closeDetail" class="text-sm border px-4 py-1.5 rounded hover:bg-slate-100">← 공고 목록으로</button>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-govblue text-white">
              <th class="p-3">이름</th> <th class="p-3">이메일</th>
              <th class="p-3">전화번호</th>
              <th class="p-3">학력</th>
              <th class="p-3">경력 요약</th>
              <th class="p-3">보유 기술</th>
              <th class="p-3 text-center">적합도</th> </tr>
          </thead>
          <tbody>
            <tr v-for="a in selectedJob.applicants" :key="a.email" class="border-b hover:bg-slate-50">
              <td class="p-3">
                <div class="font-semibold">{{ a.name }}</div>
                <button @click.stop="openApplicantDetail(a)" class="text-sm text-blue-600 underline hover:text-blue-800">
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

        <div v-if="showApplicantModal && selectedApplicant" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-lg p-6 w-[520px] relative">
            <button @click="closeApplicantDetail" class="absolute top-3 right-3 text-slate-400 hover:text-slate-600">✕</button>
            <h3 class="text-2xl font-bold text-govblue mb-4">{{ selectedApplicant.name }} 님의 이력서</h3>
            <p><strong>이메일:</strong> {{ selectedApplicant.email }}</p>
            <p><strong>전화번호:</strong> {{ selectedApplicant.phone }}</p>
            <p><strong>학력:</strong> {{ selectedApplicant.education }}</p>
            <p class="whitespace-pre-line"><strong>경력:</strong> {{ selectedApplicant.experience }}</p>
            <p><strong>보유 기술:</strong> {{ selectedApplicant.skills }}</p>
            <p class="mt-3 text-slate-700 whitespace-pre-line"><strong>자기소개:</strong> {{ selectedApplicant.intro }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="flex gap-6 border-b border-slate-200 mb-8 justify-center">
        <button @click="activeTab = 'jobs'" :class="['pb-2 font-semibold', activeTab === 'jobs' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']">
          💼 전체 공고
        </button>
        <button @click="activeTab = 'match'" :class="['pb-2 font-semibold', activeTab === 'match' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']">
          🎯 매칭 추천
        </button>
      </div>

      <div v-if="activeTab === 'jobs'">
        <h2 class="text-2xl font-bold text-govblue mb-6">전체 채용공고</h2>
        <div v-if="!allJobs.length" class="text-center text-slate-500 py-8">등록된 공고가 없습니다.</div>
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
            <tr v-for="j in allJobs" :key="j.id" class="border-b hover:bg-slate-50 transition">
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
        <div v-if="!applicant" class="text-center text-slate-500 py-8">📝 먼저 이력서를 등록해주세요.</div>
        <div v-else-if="!matchedJobs.length" class="text-center text-slate-500 py-8">현재 조건에 맞는 공고가 없습니다.</div>
        
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
            <tr v-for="match in matchedJobs" :key="match.job.id" class="border-b hover:bg-slate-50 transition">
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