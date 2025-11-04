<script setup>
import { ref, onMounted } from 'vue'

// 탭 및 상태
const activeTab = ref('resume')
const applicant = ref(JSON.parse(localStorage.getItem('kjob.applicant') || 'null'))
const appliedJobs = ref(JSON.parse(localStorage.getItem('kjob.applied') || '[]'))

// 이력서 입력 폼
const name = ref('')
const phone = ref('')
const email = ref('')
const job = ref('')

// ✅ 이력서 등록
function saveApplicant() {
  if (!name.value || !phone.value || !email.value || !job.value) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  const data = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    job: job.value,
    date: new Date().toLocaleString(),
  }

  localStorage.setItem('kjob.applicant', JSON.stringify(data))
  applicant.value = data
  alert('이력서가 등록되었습니다!')
}

// ✅ 일자리 매칭 더미 데이터 (확장판)
const matchList = [
  { title: '백엔드 개발자', company: 'K-Job 데이터센터', score: 95, location: '서울' },
  { title: 'AI 연구원', company: '스마트AI연구소', score: 93, location: '대전' },
  { title: '공공기관 보안 담당자', company: '국가정보보호원', score: 91, location: '부산' },
  { title: '데이터 엔지니어', company: '공공데이터랩', score: 89, location: '세종' },
  { title: '웹 프론트엔드 개발자', company: '지니정보시스템', score: 88, location: '서울' },
  { title: '정보보호 컨설턴트', company: 'K-SECURITY', score: 86, location: '인천' },
  { title: 'AI 모델 트레이너', company: 'SmartVision AI', score: 85, location: '대전' },
  { title: '서버 관리자', company: '공공정보센터', score: 84, location: '광주' },
  { title: '데이터 품질 분석가', company: 'DataQuality Inc.', score: 83, location: '부산' },
  { title: '클라우드 운영 엔지니어', company: 'CloudBridge', score: 82, location: '서울' },
]

// ✅ 채용공고 더미 데이터 (10건)
const jobs = [
  { id: 1, title: 'AI 개발 연구원', company: 'K-Job AI팀', location: '대전', date: '2025-11-10 ~ 11-30' },
  { id: 2, title: '정보보안 담당자', company: '국가정보보호원', location: '서울', date: '2025-11-05 ~ 11-28' },
  { id: 3, title: '데이터 분석가', company: '공공데이터랩', location: '부산', date: '2025-10-25 ~ 11-25' },
  { id: 4, title: '시스템 엔지니어', company: '지니정보시스템', location: '세종', date: '2025-11-01 ~ 11-25' },
  { id: 5, title: 'AI 모델 옵티마이저', company: '스마트AI연구소', location: '서울', date: '2025-11-12 ~ 12-01' },
  { id: 6, title: '네트워크 관리자', company: '공공정보센터', location: '인천', date: '2025-10-30 ~ 11-27' },
  { id: 7, title: '웹 서비스 기획자', company: 'K-Job 플랫폼기획팀', location: '광주', date: '2025-11-03 ~ 11-29' },
  { id: 8, title: 'DB 운영 엔지니어', company: '데이터넷', location: '서울', date: '2025-11-08 ~ 12-02' },
  { id: 9, title: '정보보호 정책담당', company: '공공보안정책센터', location: '대구', date: '2025-11-09 ~ 11-30' },
  { id: 10, title: 'AI 인프라 엔지니어', company: 'SmartVision AI', location: '대전', date: '2025-11-01 ~ 11-27' },
]

// ✅ 지원하기
function apply(job) {
  if (!applicant.value) {
    alert('먼저 이력서를 등록해주세요.')
    return
  }

  const list = JSON.parse(localStorage.getItem('kjob.applied') || '[]')
  list.push({
    ...job,
    dateApplied: new Date().toLocaleString(),
    applicant: applicant.value.name,
  })
  localStorage.setItem('kjob.applied', JSON.stringify(list))
  appliedJobs.value = list
  alert(`"${job.title}" 공고에 지원이 완료되었습니다.`)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-8 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold text-govblue mb-8">참여·채용</h1>

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
        <input v-model="name" type="text" placeholder="홍길동" class="border rounded-lg w-full p-2" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-1">전화번호</label>
          <input v-model="phone" type="text" placeholder="010-1234-5678" class="border rounded-lg w-full p-2" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1">이메일</label>
          <input v-model="email" type="email" placeholder="example@kjob.or.kr" class="border rounded-lg w-full p-2" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1">희망 직무</label>
        <input v-model="job" type="text" placeholder="예: 보안 분석가 / 데이터 엔지니어" class="border rounded-lg w-full p-2" />
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

    <!-- 💼 채용정보 -->
    <div v-else class="space-y-4">
      <div v-if="!applicant" class="text-slate-600 text-center py-10">
        📝 먼저 이력서를 등록해주세요.
      </div>
      <div v-else>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-govblue text-white">
              <th class="p-3 rounded-tl-lg">공고명</th>
              <th class="p-3">기관명</th>
              <th class="p-3">근무지</th>
              <th class="p-3">기간</th>
              <th class="p-3 rounded-tr-lg text-center">지원</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in jobs"
              :key="job.id"
              class="border-b hover:bg-slate-50 transition"
            >
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
</template>
