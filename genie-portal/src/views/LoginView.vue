<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { eventBus } from '@/eventBus'

const router = useRouter()
const id = ref('')
const password = ref('')
const error = ref('')

function login() {
  if (!id.value || !password.value) {
    error.value = '아이디와 비밀번호를 입력하세요.'
    return
  }

  const users = JSON.parse(localStorage.getItem('kjob.users') || '{}')
  const user = users[id.value]   // 👈 객체로 가져오기

  // ✅ 패스워드 비교 방식 변경
  if (user && user.password === password.value) {
    localStorage.setItem('kjob.username', id.value)
    localStorage.setItem('kjob.role', user.role || 'user') // 👈 role 저장
    eventBus.setUsername(id.value)
    alert(`${id.value}님, 로그인되었습니다.`)

    // ✅ 로그인 후 기업/일반회원 구분 이동
    if (user.role === 'company') {
      router.push('/recruit') // 기업회원 → 채용관리 페이지
    } else {
      router.push('/recruit') // 일반회원 → 참여·채용 페이지
    }
  } else {
    error.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-md w-[360px]">
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-700">로그인</h1>

      <input v-model="id" placeholder="아이디" class="border w-full p-2 rounded mb-3" />
      <input v-model="password" type="password" placeholder="비밀번호" class="border w-full p-2 rounded mb-3" />

      <button @click="login" class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
        로그인
      </button>

      <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>
