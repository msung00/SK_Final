<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const id = ref('')
const password = ref('')
const error = ref('')

function login() {
  const users = JSON.parse(localStorage.getItem('kjob.users') || '{}')
  if (users[id.value] === password.value) {
    localStorage.setItem('kjob.username', id.value)
    alert(`${id.value}님 로그인되었습니다.`)
    router.push('/')
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

      <button @click="login" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        로그인
      </button>

      <p v-if="error" class="text-red-500 text-sm text-center mt-3">{{ error }}</p>

      <RouterLink to="/register" class="text-blue-500 text-sm text-center block mt-4 hover:underline">
        회원가입하기
      </RouterLink>
    </div>
  </div>
</template>
