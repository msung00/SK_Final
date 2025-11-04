<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const activeTab = ref('info')

// 개인정보
const personalInfo = ref({
  name: '',
  birth: '',
  phone: '',
  email: '',
})

// 이력서 정보
const resume = ref({
  education: '',
  experience: '',
  skills: '',
  intro: '',
})

onMounted(() => {
  const storedUser = localStorage.getItem('kjob.username')
  if (!storedUser) {
    alert('로그인이 필요합니다.')
    router.push('/login')
    return
  }

  username.value = storedUser

  // 저장된 정보 불러오기
  const savedInfo = JSON.parse(localStorage.getItem(`kjob.info.${storedUser}`) || '{}')
  const savedResume = JSON.parse(localStorage.getItem(`kjob.resume.${storedUser}`) || '{}')

  personalInfo.value = { ...personalInfo.value, ...savedInfo }
  resume.value = { ...resume.value, ...savedResume }
})

// 저장 함수
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
  <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
    <h1 class="text-3xl font-bold text-govblue mb-8 text-center">
      {{ username }} 님의 마이페이지
    </h1>

    <!-- 탭 선택 -->
    <div class="flex justify-center mb-8 border-b border-slate-200">
      <button
        @click="activeTab = 'info'"
        :class="[
          'px-6 py-2 text-sm font-semibold border-b-2',
          activeTab === 'info' ? 'border-govblue text-govblue' : 'border-transparent text-slate-500 hover:text-slate-700'
        ]"
      >
        나의 개인정보
      </button>
      <button
        @click="activeTab = 'resume'"
        :class="[
          'px-6 py-2 text-sm font-semibold border-b-2',
          activeTab === 'resume' ? 'border-govblue text-govblue' : 'border-transparent text-slate-500 hover:text-slate-700'
        ]"
      >
        나의 이력서 관리
      </button>
    </div>

    <!-- 개인정보 입력 -->
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

      <button
        @click="saveInfo"
        class="mt-6 bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        개인정보 저장
      </button>
    </div>

    <!-- 이력서 관리 -->
    <div v-else class="space-y-5">
      <div>
        <label class="block text-sm font-semibold mb-1">학력</label>
        <textarea
          v-model="resume.education"
          class="border rounded-lg w-full p-2 h-20"
          placeholder="예: ○○대학교 컴퓨터공학과 졸업 (2023)"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">경력</label>
        <textarea
          v-model="resume.experience"
          class="border rounded-lg w-full p-2 h-20"
          placeholder="예: ○○회사 보안 엔지니어 (2024~현재)"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">보유 기술</label>
        <textarea
          v-model="resume.skills"
          class="border rounded-lg w-full p-2 h-20"
          placeholder="예: Python, Vue.js, AI 보안, 네트워크 분석"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">자기소개서</label>
        <textarea
          v-model="resume.intro"
          class="border rounded-lg w-full p-2 h-32"
          placeholder="자기소개를 입력하세요."
        ></textarea>
      </div>

      <button
        @click="saveResume"
        class="mt-6 bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        이력서 저장
      </button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
