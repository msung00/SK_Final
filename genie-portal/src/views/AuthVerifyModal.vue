<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['verified'])

const phone = ref('')
const name = ref('')
const agree = ref(false)
const error = ref('')

function verify() {
  if (!phone.value || !name.value || !agree.value) {
    error.value = '모든 항목을 입력하고 동의해주세요.'
    return
  }
  alert(`${name.value}님 본인확인이 완료되었습니다.`)
  emit('verified', { name: name.value, phone: phone.value })
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-white rounded-2xl w-[360px] p-6 shadow-xl">
      <h2 class="text-center text-lg font-bold text-blue-600 mb-4">K-Job 본인확인</h2>

      <div class="flex justify-around mb-5 border-b pb-2">
        <span class="font-semibold text-blue-600">앱 인증하기</span>
        <span class="text-gray-400">QR 인증하기</span>
      </div>

      <p class="text-gray-600 text-sm mb-3">
        K-Job 앱으로 인증요청 알림을 보내드릴게요.
      </p>

      <input v-model="phone" placeholder="아이디 혹은 휴대폰번호" class="border rounded-lg w-full p-2 mb-2 text-sm" />
      <input v-model="name" placeholder="이름" class="border rounded-lg w-full p-2 mb-3 text-sm" />

      <label class="flex items-center text-xs mb-4">
        <input type="checkbox" v-model="agree" class="mr-2" />
        [필수] 개인정보 수집 및 이용 동의
      </label>

      <button
        @click="verify"
        class="bg-blue-600 text-white w-full py-2 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        인증 요청하기
      </button>

      <p v-if="error" class="text-red-500 text-xs mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>
