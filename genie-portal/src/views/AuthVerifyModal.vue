<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const emit = defineEmits(['verified', 'close'])
const props = defineProps({
  role: { type: String, default: 'user' } // user or company
})

const name = ref('')
const phone = ref('')
const bizNumber = ref('')
const carrier = ref('SKT')
const authCode = ref('')
const isCodeSent = ref(false)
const step = ref(1) // 1 = 기본입력 / 2 = 인증코드 입력

function sendCode() {
  if (!phone.value) {
    alert('전화번호를 입력해주세요.')
    return
  }
  isCodeSent.value = true
  step.value = 2
  alert('인증번호가 전송되었습니다. (테스트용 더미)')
}

function verify() {
  if (props.role === 'company') {
    if (!bizNumber.value || !name.value || !phone.value) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    if (!authCode.value) {
      alert('인증번호를 입력해주세요.')
      return
    }
    emit('verified', {
      name: name.value,
      phone: phone.value,
      bizNumber: bizNumber.value,
      verified: true
    })
  } else {
    if (!name.value || !phone.value) {
      alert('이름과 전화번호를 입력해주세요.')
      return
    }
    if (!authCode.value) {
      alert('인증번호를 입력해주세요.')
      return
    }
    emit('verified', {
      name: name.value,
      phone: phone.value,
      verified: true
    })
  }
}
</script>

<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
    <div
      class="bg-white rounded-3xl shadow-2xl w-[360px] md:w-[400px] relative overflow-hidden border border-slate-200 animate-scaleIn"
    >
      <!-- 헤더 -->
      <div class="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h2 class="font-bold text-lg tracking-tight">
          {{ props.role === 'company' ? '사업자 본인확인 (PASS)' : '본인확인 (PASS)' }}
        </h2>
        <button @click="$emit('close')" class="hover:opacity-80 text-xl leading-none">&times;</button>
      </div>

      <!-- 본문 -->
      <div class="p-6">
        <p class="text-slate-600 text-center text-sm mb-6">
          {{ props.role === 'company'
            ? '사업자등록번호와 대표자 정보를 입력해주세요.'
            : '이름과 휴대폰 번호를 입력하여 본인 인증을 진행합니다.' }}
        </p>

        <transition name="fade" mode="out-in">
          <div :key="step">
            <!-- Step 1 -->
            <div v-if="step === 1">
              <div v-if="props.role === 'company'">
                <label class="block mb-2 text-sm font-semibold">사업자등록번호</label>
                <input
                  v-model="bizNumber"
                  placeholder="예: 123-45-67890"
                  class="input-field mb-4"
                />
                <label class="block mb-2 text-sm font-semibold">대표자 이름</label>
                <input v-model="name" placeholder="대표자 성명" class="input-field mb-4" />
              </div>

              <div v-else>
                <label class="block mb-2 text-sm font-semibold">이름</label>
                <input v-model="name" placeholder="이름 입력" class="input-field mb-4" />
              </div>

              <label class="block mb-2 text-sm font-semibold">통신사</label>
              <div class="flex gap-3 mb-4 justify-center">
                <label class="carrier-option">
                  <input type="radio" v-model="carrier" value="SKT" /> SKT
                </label>
                <label class="carrier-option">
                  <input type="radio" v-model="carrier" value="KT" /> KT
                </label>
                <label class="carrier-option">
                  <input type="radio" v-model="carrier" value="LGU+" /> LG U+
                </label>
              </div>

              <label class="block mb-2 text-sm font-semibold">휴대폰 번호</label>
              <div class="flex gap-2">
                <input
                  v-model="phone"
                  placeholder="010-XXXX-XXXX"
                  class="input-field flex-1"
                />
                <button
                  @click="sendCode"
                  class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
                >
                  인증번호 전송
                </button>
              </div>
            </div>

            <!-- Step 2 -->
            <div v-else>
              <label class="block mb-2 text-sm font-semibold">인증번호 입력</label>
              <input
                v-model="authCode"
                placeholder="6자리 인증번호"
                maxlength="6"
                class="input-field text-center tracking-widest mb-6"
              />

              <button
                @click="verify"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                인증 완료
              </button>
              <p class="text-center text-xs text-slate-500 mt-3">
                인증번호를 받지 못하셨나요?
                <button @click="sendCode" class="text-blue-600 hover:underline">재전송</button>
              </p>
            </div>
          </div>
        </transition>
      </div>

      <!-- PASS 로고 -->
      <div class="bg-slate-100 py-3 text-center text-gray-400 text-xs select-none">
        ⓒ PASS by K-Job Secure Verification
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply border w-full p-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition;
}

.carrier-option {
  @apply flex items-center gap-2 border px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-50 text-sm;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scaleIn {
  animation: scaleIn 0.25s ease-out;
}
</style>
