<script setup>
import { ref } from 'vue'
import AuthVerifyModal from './AuthVerifyModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const id = ref('')
const password = ref('')
const userType = ref('user') // user=일반회원, company=기업회원
const verified = ref(false)
const showVerify = ref(false)

function openVerify() {
  showVerify.value = true
}
function onVerified(data) {
  verified.value = true
  showVerify.value = false
  alert(`${data.name}님 인증이 완료되었습니다.`)
}

function register() {
  if (!id.value || !password.value) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }
  if (!verified.value) {
    alert('본인인증을 완료해주세요.')
    return
  }

  const users = JSON.parse(localStorage.getItem('kjob.users') || '{}')
  if (users[id.value]) {
    alert('이미 존재하는 아이디입니다.')
    return
  }

  users[id.value] = {
    password: password.value,
    role: userType.value,
    verified: true
  }

  localStorage.setItem('kjob.users', JSON.stringify(users))
  alert(`${userType.value === 'company' ? '기업회원' : '일반회원'} 가입이 완료되었습니다.`)
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-md w-[380px]">
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-700">회원가입</h1>

      <!-- 회원 유형 선택 -->
      <div class="mb-5">
        <label class="block text-sm font-semibold mb-2">회원 유형</label>
        <div class="flex gap-5 justify-center">
          <label class="flex items-center gap-2">
            <input type="radio" value="user" v-model="userType" /> 일반회원 (구직자)
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" value="company" v-model="userType" /> 기업회원 (채용담당자)
          </label>
        </div>
      </div>

      <input v-model="id" placeholder="아이디를 입력하세요" class="border w-full p-2 rounded mb-3" />
      <input v-model="password" type="password" placeholder="비밀번호를 입력하세요" class="border w-full p-2 rounded mb-4" />

      <button
        @click="openVerify"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4"
        :disabled="verified"
      >
        {{ verified ? '✅ 인증 완료' : '본인 인증하기' }}
      </button>

      <button
        @click="register"
        class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
      >
        회원가입 완료
      </button>
    </div>

    <!-- AuthVerifyModal 호출 -->
    <AuthVerifyModal
      v-if="showVerify"
      :role="userType"
      @verified="onVerified"
      @close="showVerify = false"
    />
  </div>
</template>
