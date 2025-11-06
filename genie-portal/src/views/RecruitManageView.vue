<script setup>
import { ref, computed } from 'vue'

// 지원자 더미데이터 (9명 -> 15명으로 확장)
const applicants = ref([
  { id: 1, name: '이준호', job: 'AI 개발자', company: 'K-Job 데이터랩', date: '2025-11-03', status: '서류심사 중', email: 'junho@kjob.or.kr' },
  { id: 2, name: '김지민', job: '정보보안 담당자', company: 'K-Job 보안센터', date: '2025-11-04', status: '면접 예정', email: 'jimin@kjob.or.kr' },
  { id: 3, name: '박수현', job: '데이터 엔지니어', company: 'K-Job AI팀', date: '2025-11-05', status: '합격', email: 'suhyun@kjob.or.kr' },
  { id: 4, name: '최영호', job: '웹 프론트엔드 개발자', company: 'K-Job 플랫폼본부', date: '2025-11-06', status: '불합격', email: 'youngho@kjob.or.kr' },
  { id: 5, name: '정가영', job: '백엔드 개발자', company: 'K-Job 클라우드팀', date: '2025-11-07', status: '서류심사 중', email: 'gayoung@kjob.or.kr' },
  { id: 6, name: '윤태현', job: '클라우드 엔지니어', company: 'K-Job 클라우드팀', date: '2025-11-08', status: '서류심사 중', email: 'taehyun@kjob.or.kr' },
  { id: 7, name: '이서윤', job: 'AI 데이터 분석가', company: 'K-Job 데이터랩', date: '2025-11-09', status: '면접 예정', email: 'seoyoon@kjob.or.kr' },
  { id: 8, name: '한지호', job: '보안 정책 담당', company: 'K-Job 보안센터', date: '2025-11-10', status: '합격', email: 'jiho@kjob.or.kr' },
  { id: 9, name: '김유진', job: 'AI 연구원', company: 'K-Job AI팀', date: '2025-11-10', status: '불합격', email: 'yujin@kjob.or.kr' },
  // --- (신규 추가) ---
  { id: 10, name: '문채원', job: '웹 프론트엔드 개발자', company: 'K-Job 플랫폼본부', date: '2025-11-11', status: '서류심사 중', email: 'chaewon@kjob.or.kr' },
  { id: 11, name: '강민혁', job: '데이터 엔지니어', company: 'K-Job AI팀', date: '2025-11-11', status: '면접 예정', email: 'minhyuk@kjob.or.kr' },
  { id: 12, name: '송하윤', job: 'AI 개발자', company: 'K-Job 데이터랩', date: '2025-11-12', status: '서류심사 중', email: 'hayoon@kjob.or.kr' },
  { id: 13, name: '임도현', job: '정보보안 담당자', company: 'K-Job 보안센터', date: '2025-11-12', status: '불합격', email: 'dohyun@kjob.or.kr' },
  { id: 14, name: '조은우', job: '백엔드 개발자', company: 'K-Job 클라우드팀', date: '2025-11-13', status: '합격', email: 'eunwoo@kjob.or.kr' },
  { id: 15, name: '신예은', job: 'AI 연구원', company: 'K-Job AI팀', date: '2025-11-13', status: '서류심사 중', email: 'yeeun@kjob.or.kr' },
])

const selectedApplicant = ref(null)
const filter = ref('전체')

// 상태별 필터링
const filteredApplicants = computed(() => {
  if (filter.value === '전체') return applicants.value
  return applicants.value.filter(a => a.status === filter.value)
})

// 상태 변경
function changeStatus(applicant, newStatus) {
  applicant.status = newStatus
  alert(`${applicant.name}님의 상태가 '${newStatus}'로 변경되었습니다.`)
}

// 이력서 상세 보기
function viewResume(applicant) {
  selectedApplicant.value = applicant
}

// 통계 계산
const totalApplicants = computed(() => applicants.value.length)
const passed = computed(() => applicants.value.filter(a => a.status === '합격').length)
const failed = computed(() => applicants.value.filter(a => a.status === '불합격').length)
const screening = computed(() => applicants.value.filter(a => a.status === '서류심사 중').length)
const interview = computed(() => applicants.value.filter(a => a.status === '면접 예정').length)
</script>

<template>
  <div class="bg-white rounded-xl shadow p-8 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-govblue mb-6">📊 채용 관리 대시보드</h1>
    <p class="text-slate-600 mb-10">
      기업 회원 전용 – 지원자 현황을 한눈에 확인하고 채용 단계를 관리할 수 있습니다.
    </p>

    <div class="grid grid-cols-4 gap-6 mb-10">
      <div class="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
        <p class="text-sm text-slate-600">전체 지원자</p>
        <p class="text-2xl font-bold text-blue-700">{{ totalApplicants }}명</p>
      </div>
      <div class="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
        <p class="text-sm text-slate-600">합격</p>
        <p class="text-2xl font-bold text-green-700">{{ passed }}명</p>
      </div>
      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
        <p class="text-sm text-slate-600">면접 예정</p>
        <p class="text-2xl font-bold text-yellow-700">{{ interview }}명</p>
      </div>
      <div class="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg">
        <p class="text-sm text-slate-600">불합격</p>
        <p class="text-2xl font-bold text-red-700">{{ failed }}명</p>
      </div>
    </div>

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-slate-800">지원자 목록</h2>
      <div class="flex gap-3">
        <select v-model="filter" class="border rounded-lg px-3 py-1 text-sm">
          <option>전체</option>
          <option>서류심사 중</option>
          <option>면접 예정</option>
          <option>합격</option>
          <option>불합격</option>
        </select>
      </div>
    </div>

    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-govblue text-white">
          <th class="p-3 rounded-tl-lg">지원자명</th>
          <th class="p-3">지원 직무</th>
          <th class="p-3">지원일</th>
          <th class="p-3">상태</th>
          <th class="p-3 text-center">관리</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="a in filteredApplicants"
          :key="a.id"
          class="border-b hover:bg-slate-50 transition"
        >
          <td class="p-3 font-semibold">{{ a.name }}</td>
          <td class="p-3">{{ a.job }}</td>
          <td class="p-3">{{ a.date }}</td>
          <td class="p-3 font-medium text-govblue">{{ a.status }}</td>
          <td class="p-3 flex justify-center gap-2">
            <button
              @click="viewResume(a)"
              class="text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded"
            >
              이력서 보기
            </button>
            <button
              @click="changeStatus(a, '합격')"
              class="text-sm bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded"
            >
              합격
            </button>
            <button
              @click="changeStatus(a, '불합격')"
              class="text-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded"
            >
              불합격
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedApplicant" class="mt-10 border-t pt-6 animate-fadeIn">
      <h2 class="text-xl font-bold mb-4">📄 {{ selectedApplicant.name }} 님의 이력서</h2>
      <p class="mb-2"><strong>직무:</strong> {{ selectedApplicant.job }}</p>
      <p class="mb-2"><strong>이메일:</strong> {{ selectedApplicant.email }}</p>
      <p class="mb-2"><strong>지원일:</strong> {{ selectedApplicant.date }}</p>
      <p class="mb-2"><strong>현재 상태:</strong> {{ selectedApplicant.status }}</p>
      <div class="mt-4 text-right">
        <button
          @click="selectedApplicant = null"
          class="bg-slate-300 px-4 py-2 rounded hover:bg-slate-400"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>