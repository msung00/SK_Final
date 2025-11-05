<script setup>
import { ref, onMounted } from 'vue'

const role = ref(localStorage.getItem('kjob.role') || 'user')
const applicant = ref(JSON.parse(localStorage.getItem('kjob.applicant') || 'null'))
const appliedJobs = ref(JSON.parse(localStorage.getItem('kjob.applied') || '[]'))
const activeTab = ref('resume')

// 구직자 이력서 등록용 상태
const name = ref('')
const phone = ref('')
const email = ref('')
const job = ref('')

// 기업회원용 채용공고 관리
const companyJobs = ref(JSON.parse(localStorage.getItem('kjob.companyJobs') || '[]'))

// 이력서 저장
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

// 구직자용 매칭 리스트
const matchList = [
  { title: '백엔드 개발자', company: 'K-Job 데이터센터', score: 95, location: '서울' },
  { title: 'AI 연구원', company: '스마트AI연구소', score: 93, location: '대전' },
  { title: '정보보호 담당자', company: '공공보안센터', score: 90, location: '부산' },
]

// 구직자용 채용공고 리스트
const jobs = [
  { id: 1, title: 'AI 엔지니어', company: 'K-Job AI팀', location: '대전', date: '2025-11-10 ~ 11-30' },
  { id: 2, title: '보안 담당자', company: 'K-Security', location: '서울', date: '2025-11-01 ~ 11-25' },
  { id: 3, title: '데이터 분석가', company: 'SmartData', location: '부산', date: '2025-11-05 ~ 11-27' },
]

// 지원하기
function apply(job) {
  if (!applicant.value) {
    alert('먼저 이력서를 등록해주세요.')
    return
  }
  const list = JSON.parse(localStorage.getItem('kjob.applied') || '[]')
  list.push({ ...job, applicant: applicant.value.name, dateApplied: new Date().toLocaleString() })
  localStorage.setItem('kjob.applied', JSON.stringify(list))
  appliedJobs.value = list
  alert(`"${job.title}" 공고에 지원이 완료되었습니다.`)
}

// ✅ 기업회원용 - 채용공고 등록
const newJobTitle = ref('')
const newJobLocation = ref('')
const newJobPeriod = ref('')

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
    applicants: Math.floor(Math.random() * 50) + 10,
  }
  const list = [...companyJobs.value, newJob]
  companyJobs.value = list
  localStorage.setItem('kjob.companyJobs', JSON.stringify(list))
  newJobTitle.value = newJobLocation.value = newJobPeriod.value = ''
  alert('채용공고가 등록되었습니다.')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold text-govblue mb-8">참여·채용</h1>

    <!-- ✅ 기업회원 화면 -->
    <div v-if="role === 'company'">
      <h2 class="text-2xl font-bold mb-4 text-blue-700">기업 채용관리 대시보드</h2>
      <p class="text-slate-700 mb-6">
        귀사의 채용공고 현황을 확인하고 새 공고를 등록하세요.
      </p>

      <!-- 채용공고 등록 폼 -->
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

      <!-- 등록된 공고 -->
      <div v-if="companyJobs.length">
        <h3 class="text-lg font-semibold mb-3 text-blue-700">등록된 채용공고</h3>
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
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 font-semibold">{{ job.title }}</td>
              <td class="p-3">{{ job.location }}</td>
              <td class="p-3">{{ job.period }}</td>
              <td class="p-3 text-center font-bold text-blue-700">{{ job.applicants }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-slate-500 text-center py-10">
        아직 등록된 공고가 없습니다.
      </div>
    </div>

    <!-- ✅ 일반회원 화면 -->
    <div v-else>
      <!-- 탭 -->
      <div class="flex gap-6 border-b border-slate-200 mb-8">
        <button
          @click="activeTab = 'resume'"
          :class="['pb-2 font-semibold', activeTab === 'resume' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']"
        >
          🧾 이력서 등록
        </button>
        <button
          @click="activeTab = 'match'"
          :class="['pb-2 font-semibold', activeTab === 'match' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']"
        >
          🔍 일자리 매칭
        </button>
        <button
          @click="activeTab = 'jobs'"
          :class="['pb-2 font-semibold', activeTab === 'jobs' ? 'text-govblue border-b-2 border-govblue' : 'text-slate-500']"
        >
          💼 채용정보 조회
        </button>
      </div>

      <!-- 🧾 이력서 등록 -->
      <div v-if="activeTab === 'resume'" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-1">이름</label>
          <input v-model="name" placeholder="홍길동" class="border rounded-lg w-full p-2" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-1">전화번호</label>
            <input v-model="phone" placeholder="010-1234-5678" class="border rounded-lg w-full p-2" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">이메일</label>
            <input v-model="email" placeholder="example@kjob.or.kr" class="border rounded-lg w-full p-2" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1">희망 직무</label>
          <input v-model="job" placeholder="예: 보안 분석가 / 데이터 엔지니어" class="border rounded-lg w-full p-2" />
        </div>

        <div class="text-right">
          <button @click="saveApplicant" class="bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            등록하기
          </button>
        </div>
      </div>

      <!-- 🔍 일자리 매칭 -->
      <div v-else-if="activeTab === 'match'" class="space-y-4">
        <div v-if="!applicant" class="text-slate-600 text-center py-10">
          📝 먼저 이력서를 등록해주세요.
        </div>
        <div v-else>
          <p class="mb-4 text-slate-700">
            <strong>{{ applicant.name }}</strong> 님에게 추천드리는 일자리입니다:
          </p>
          <ul class="space-y-3">
            <li
              v-for="m in matchList"
              :key="m.title"
              class="border rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition"
            >
              <div>
                <p class="font-bold">{{ m.title }}</p>
                <p class="text-sm text-slate-500">{{ m.company }} · {{ m.location }}</p>
              </div>
              <span class="text-govblue font-semibold">{{ m.score }}점</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 💼 채용정보 조회 -->
      <div v-else>
        <div v-if="!applicant" class="text-slate-600 text-center py-10">
          📝 먼저 이력서를 등록해주세요.
        </div>
        <div v-else>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-govblue text-white">
                <th class="p-3">공고명</th>
                <th class="p-3">기관명</th>
                <th class="p-3">근무지</th>
                <th class="p-3">기간</th>
                <th class="p-3 text-center">지원</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobs" :key="job.id" class="border-b hover:bg-slate-50 transition">
                <td class="p-3 font-semibold">{{ job.title }}</td>
                <td class="p-3">{{ job.company }}</td>
                <td class="p-3">{{ job.location }}</td>
                <td class="p-3">{{ job.date }}</td>
                <td class="p-3 text-center">
                  <button
                    @click="apply(job)"
                    class="bg-govblue text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    지원하기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 지원 내역 -->
          <div v-if="appliedJobs.length" class="mt-10">
            <h2 class="text-xl font-semibold text-govblue mb-4">📄 내 지원 내역</h2>
            <ul class="space-y-3">
              <li
                v-for="a in appliedJobs"
                :key="a.title"
                class="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p class="font-semibold">{{ a.title }}</p>
                  <p class="text-sm text-slate-500">{{ a.company }} · {{ a.location }}</p>
                </div>
                <p class="text-xs text-slate-400">{{ a.dateApplied }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
