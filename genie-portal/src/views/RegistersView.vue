<script setup>
import { ref } from 'vue'
import AuthVerifyModal from './AuthVerifyModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const id = ref('')
const password = ref('')
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

  users[id.value] = password.value
  localStorage.setItem('kjob.users', JSON.stringify(users))
  alert('회원가입이 완료되었습니다.')
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-md w-[360px]">
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-700">회원가입</h1>

      <input v-model="id" placeholder="아이디" class="border w-full p-2 rounded mb-3" />
      <input v-model="password" type="password" placeholder="비밀번호" class="border w-full p-2 rounded mb-3" />

      <button @click="openVerify" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4">
        본인 인증하기
      </button>

      <button @click="register" class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
        회원가입 완료
      </button>
    </div>

    <AuthVerifyModal v-if="showVerify" @verified="onVerified" />
  </div>
</template>
