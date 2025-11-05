<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const role = ref('user')
const activeTab = ref('info')

// 구직자용 정보
const personalInfo = ref({ name: '', birth: '', phone: '', email: '' })
const resume = ref({ education: '', experience: '', skills: '', intro: '' })

// 기업회원용 데이터
const applicants = ref([])

onMounted(() => {
  const storedUser = localStorage.getItem('kjob.username')
  const storedRole = localStorage.getItem('kjob.role') || 'user'

  if (!storedUser) {
    alert('로그인이 필요합니다.')
    router.push('/login')
    return
  }

  username.value = storedUser
  role.value = storedRole

  // 구직자 데이터 불러오기
  if (role.value === 'user') {
    const savedInfo = JSON.parse(localStorage.getItem(`kjob.info.${storedUser}`) || '{}')
    const savedResume = JSON.parse(localStorage.getItem(`kjob.resume.${storedUser}`) || '{}')
    personalInfo.value = { ...personalInfo.value, ...savedInfo }
    resume.value = { ...resume.value, ...savedResume }
  }

  // 기업회원용 지원자 더미 데이터
  if (role.value === 'company') {
    applicants.value = [
      { name: '김현수', job: 'AI 연구원', status: '면접대기', date: '2025-11-01' },
      { name: '이지은', job: '데이터 분석가', status: '서류통과', date: '2025-11-03' },
      { name: '박준호', job: '보안 엔지니어', status: '1차합격', date: '2025-11-04' },
      { name: '홍길동', job: '백엔드 개발자', status: '지원완료', date: '2025-11-02' },
      { name: '최지우', job: '웹 프론트엔드', status: '최종합격', date: '2025-11-05' },
      { name: '김태희', job: '시스템 관리자', status: '면접대기', date: '2025-11-06' },
      { name: '오세훈', job: 'DB 엔지니어', status: '불합격', date: '2025-11-07' },
      { name: '이유진', job: 'AI 옵스 엔지니어', status: '면접대기', date: '2025-11-08' },
      { name: '강지원', job: 'QA 테스터', status: '서류통과', date: '2025-11-09' },
      { name: '정유진', job: '클라우드 운영', status: '지원완료', date: '2025-11-10' },
    ]
  }
})

// 저장
function saveInfo() {
  localStorage.setItem(`kjob.info.${username.value}`, JSON.stringify(personalInfo.value))
  alert('개인정보가 저장되었습니다.')
}

function saveResume() {
  localStorage.setItem(`kjob.resume.${username.value}`, JSON.stringify(resume.value))
  alert('이력서 정보가 저장되었습니다.')
}
</script>

<template>
  <div class="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
    <h1 class="text-3xl font-bold text-govblue mb-8 text-center">
      {{ username }} 님의 마이페이지
      <span class="text-slate-500 text-lg ml-2">({{ role === 'company' ? '기업회원' : '구직자' }})</span>
    </h1>

    <!-- 일반 회원용 -->
    <div v-if="role === 'user'">
      <div class="flex justify-center mb-8 border-b border-slate-200">
        <button
          @click="activeTab = 'info'"
          :class="[ 'px-6 py-2 text-sm font-semibold border-b-2',
            activeTab === 'info' ? 'border-govblue text-govblue' : 'border-transparent text-slate-500 hover:text-slate-700']"
        >
          나의 개인정보
        </button>
        <button
          @click="activeTab = 'resume'"
          :class="[ 'px-6 py-2 text-sm font-semibold border-b-2',
            activeTab === 'resume' ? 'border-govblue text-govblue' : 'border-transparent text-slate-500 hover:text-slate-700']"
        >
          나의 이력서 관리
        </button>
      </div>

      <!-- 개인정보 -->
      <div v-if="activeTab === 'info'" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold mb-1">이름</label>
          <input v-model="personalInfo.name" type="text" class="border rounded-lg w-full p-2" placeholder="홍길동" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-1">생년월일</label>
            <input v-model="personalInfo.birth" type="date" class="border rounded-lg w-full p-2" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">전화번호</label>
            <input v-model="personalInfo.phone" type="text" class="border rounded-lg w-full p-2" placeholder="010-1234-5678" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1">이메일</label>
          <input v-model="personalInfo.email" type="email" class="border rounded-lg w-full p-2" placeholder="example@email.com" />
        </div>
        <button @click="saveInfo" class="mt-6 bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          개인정보 저장
        </button>
      </div>

      <!-- 이력서 -->
      <div v-else class="space-y-5">
        <div>
          <label class="block text-sm font-semibold mb-1">학력</label>
          <textarea v-model="resume.education" class="border rounded-lg w-full p-2 h-20" placeholder="예: ○○대학교 졸업"></textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1">경력</label>
          <textarea v-model="resume.experience" class="border rounded-lg w-full p-2 h-20" placeholder="예: ○○회사 근무 (2022~현재)"></textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1">보유 기술</label>
          <textarea v-model="resume.skills" class="border rounded-lg w-full p-2 h-20" placeholder="예: Python, Vue.js, AI 보안"></textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1">자기소개서</label>
          <textarea v-model="resume.intro" class="border rounded-lg w-full p-2 h-32" placeholder="자기소개를 입력하세요."></textarea>
        </div>
        <button @click="saveResume" class="mt-6 bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          이력서 저장
        </button>
      </div>
    </div>

    <!-- 기업 회원용 -->
    <div v-else>
      <h2 class="text-2xl font-semibold mb-6">📋 지원자 관리</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-govblue text-white">
            <th class="p-3 rounded-tl-lg">지원자명</th>
            <th class="p-3">지원 직무</th>
            <th class="p-3">상태</th>
            <th class="p-3">지원일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in applicants" :key="a.name" class="border-b hover:bg-slate-50 transition">
            <td class="p-3 font-semibold">{{ a.name }}</td>
            <td class="p-3">{{ a.job }}</td>
            <td class="p-3">{{ a.status }}</td>
            <td class="p-3">{{ a.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
