<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const role = ref('user')
const activeTab = ref('info')

// 일반회원 데이터
const personalInfo = ref({ name: '', birth: '', phone: '', email: '' })
const resume = ref({ education: '', experience: '', skills: '', intro: '' })

// 기업회원 데이터
const jobPosts = ref([])
const selectedJob = ref(null)

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

  // 일반회원 데이터 불러오기
  if (role.value === 'user') {
    const savedInfo = JSON.parse(localStorage.getItem(`kjob.info.${storedUser}`) || '{}')
    const savedResume = JSON.parse(localStorage.getItem(`kjob.resume.${storedUser}`) || '{}')
    personalInfo.value = { ...personalInfo.value, ...savedInfo }
    resume.value = { ...resume.value, ...savedResume }
  }

  // 기업회원 데이터 불러오기 (RecruitView에서 저장된 데이터)
  if (role.value === 'company') {
    const storedJobs = JSON.parse(localStorage.getItem(`kjob.jobs.${storedUser}`) || '[]')

    // 더미 지원자 자동 추가 (공고별로)
    storedJobs.forEach((job) => {
      if (!job.applicants) {
        const dummyCount = Math.floor(Math.random() * 4) + 3 // 3~6명 랜덤
        job.applicants = Array.from({ length: dummyCount }, (_, i) => ({
          id: i + 1,
          name: ['이준호', '박지현', '김현수', '정가영', '이수민', '최지연'][i % 6],
          job: job.title,
          status: ['지원완료', '서류통과', '면접예정', '1차합격', '최종합격'][i % 5],
          date: `2025-11-${String(3 + i).padStart(2, '0')}`,
        }))
      }
    })

    jobPosts.value = storedJobs
    saveAll()
  }
})

// 저장 함수
function saveInfo() {
  localStorage.setItem(`kjob.info.${username.value}`, JSON.stringify(personalInfo.value))
  alert('개인정보가 저장되었습니다.')
}

function saveResume() {
  localStorage.setItem(`kjob.resume.${username.value}`, JSON.stringify(resume.value))
  alert('이력서가 저장되었습니다.')
}

function saveAll() {
  localStorage.setItem(`kjob.jobs.${username.value}`, JSON.stringify(jobPosts.value))
}

// 상태 변경
function changeStatus(applicant, newStatus) {
  applicant.status = newStatus
  saveAll()
  alert(`${applicant.name}님의 상태가 "${newStatus}"로 변경되었습니다.`)
}
</script>

<template>
  <div class="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
    <h1 class="text-3xl font-bold text-govblue mb-8 text-center">
      {{ username }} 님의 마이페이지
      <span class="text-slate-500 text-lg ml-2">
        ({{ role === 'company' ? '기업회원' : '구직자' }})
      </span>
    </h1>

    <!-- 👤 일반회원 -->
    <div v-if="role === 'user'">
      <div class="flex justify-center mb-8 border-b border-slate-200">
        <button
          @click="activeTab = 'info'"
          :class="['px-6 py-2 text-sm font-semibold border-b-2',
            activeTab === 'info' ? 'border-govblue text-govblue' : 'text-slate-500 border-transparent hover:text-slate-700']"
        >
          개인정보
        </button>
        <button
          @click="activeTab = 'resume'"
          :class="['px-6 py-2 text-sm font-semibold border-b-2',
            activeTab === 'resume' ? 'border-govblue text-govblue' : 'text-slate-500 border-transparent hover:text-slate-700']"
        >
          이력서 관리
        </button>
      </div>

      <div v-if="activeTab === 'info'" class="space-y-5">
        <label class="block text-sm font-semibold mb-1">이름</label>
        <input v-model="personalInfo.name" class="border rounded-lg w-full p-2" placeholder="홍길동" />
        <div class="grid grid-cols-2 gap-4">
          <input v-model="personalInfo.birth" type="date" class="border rounded-lg w-full p-2" />
          <input v-model="personalInfo.phone" class="border rounded-lg w-full p-2" placeholder="010-1234-5678" />
        </div>
        <input v-model="personalInfo.email" class="border rounded-lg w-full p-2" placeholder="example@email.com" />
        <button @click="saveInfo" class="bg-govblue text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">저장</button>
      </div>

      <div v-else class="space-y-5">
        <textarea v-model="resume.education" class="border rounded-lg w-full p-2 h-20" placeholder="학력"></textarea>
        <textarea v-model="resume.experience" class="border rounded-lg w-full p-2 h-20" placeholder="경력"></textarea>
        <textarea v-model="resume.skills" class="border rounded-lg w-full p-2 h-20" placeholder="보유 기술"></textarea>
        <textarea v-model="resume.intro" class="border rounded-lg w-full p-2 h-32" placeholder="자기소개"></textarea>
        <button @click="saveResume" class="bg-govblue text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">이력서 저장</button>
      </div>
    </div>

    <!-- 🏢 기업회원 -->
    <div v-else>
      <h2 class="text-2xl font-semibold mb-6">📋 등록된 채용공고</h2>

      <!-- 공고 목록 -->
      <div v-if="!selectedJob">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-govblue text-white">
              <th class="p-3">공고명</th>
              <th class="p-3">등록일</th>
              <th class="p-3">지원자 수</th>
              <th class="p-3 text-center">보기</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in jobPosts"
              :key="job.id"
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 font-semibold">{{ job.title }}</td>
              <td class="p-3">{{ job.date }}</td>
              <td class="p-3">{{ job.applicants.length }} 명</td>
              <td class="p-3 text-center">
                <button
                  @click="selectedJob = job"
                  class="bg-govblue text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  지원자 보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 지원자 상세 -->
      <div v-else>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-govblue">{{ selectedJob.title }} 지원자 목록</h2>
          <button
            @click="selectedJob = null"
            class="text-sm border px-4 py-1.5 rounded hover:bg-slate-100"
          >
            ← 공고 목록으로
          </button>
        </div>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-govblue text-white">
              <th class="p-3">이름</th>
              <th class="p-3">직무</th>
              <th class="p-3">지원일</th>
              <th class="p-3">상태</th>
              <th class="p-3 text-center">저장</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a in selectedJob.applicants"
              :key="a.id"
              class="border-b hover:bg-slate-50 transition"
            >
              <td class="p-3 font-semibold">{{ a.name }}</td>
              <td class="p-3">{{ a.job }}</td>
              <td class="p-3">{{ a.date }}</td>
              <td class="p-3">
                <select v-model="a.status" class="border rounded px-2 py-1 text-sm">
                  <option>지원완료</option>
                  <option>서류통과</option>
                  <option>면접예정</option>
                  <option>1차합격</option>
                  <option>최종합격</option>
                  <option>불합격</option>
                </select>
              </td>
              <td class="p-3 text-center">
                <button
                  @click="changeStatus(a, a.status)"
                  class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  저장
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
