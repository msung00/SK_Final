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

const agreeTerms = ref(false)
const agreePrivacy = ref(false)

// --- ⬇️ (신규 추가된 상태: 약관 내용 표시 여부) ⬇️ ---
const showTermsContent = ref(false)
const showPrivacyContent = ref(false)
// --- ⬆️ (신규 추가된 상태) ⬆️ ---

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
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        class="border w-full p-2 rounded mb-4"
      />

      <div class="mb-4 space-y-2 border-t border-b py-4">
        <div class="flex items-center">
          <input type="checkbox" v-model="agreeTerms" id="terms" class="mr-2" />
          <label for="terms" class="text-sm text-slate-700">
            [필수]
            <button
              type="button"
              @click="showTermsContent = !showTermsContent"
              class="text-blue-600 underline hover:text-blue-800"
            >
              이용약관
            </button>
            에 동의합니다.
          </label>
        </div>

        <div v-if="showTermsContent" class="terms-box">
          <ol class="list-decimal pl-6 space-y-2">
            <li>목적: 본 약관은 서비스 이용에 관한 기본적인 사항을 규정합니다.</li>
            <li>약관의 효력 및 변경: 본 기관은 관련 법령에 따라 약관을 변경할 수 있습니다.</li>
            <li>이용자의 의무: 타인의 정보를 도용하거나 서비스 운영을 방해해서는 안 됩니다.</li>
            <li>기관의 의무: 안정적 서비스 제공 및 개인정보 보호에 최선을 다합니다.</li>
            <li>서비스 이용 제한: 법령 위반 또는 부정 이용 시 서비스가 제한될 수 있습니다.</li>
            <li>게시물의 관리: 부적절한 게시물은 사전 통보 없이 삭제될 수 있습니다.</li>
            <li>면책사항: 천재지변 등 불가항력 사유로 인한 서비스 중단은 면책됩니다.</li>
            <li>관할 법원: 서비스 이용과 관련된 분쟁은 본 기관 소재지 관할 법원으로 합니다.</li>
          </ol>
        </div>

        <div class="flex items-center">
          <input type="checkbox" v-model="agreePrivacy" id="privacy" class="mr-2" />
          <label for="privacy" class="text-sm text-slate-700">
            [필수]
            <button
              type="button"
              @click="showPrivacyContent = !showPrivacyContent"
              class="text-blue-600 underline hover:text-blue-800"
            >
              개인정보처리방침
            </button>
            에 동의합니다.
          </label>
        </div>

        <div v-if="showPrivacyContent" class="terms-box">
          <ol class="list-decimal pl-6 space-y-2">
            <li>처리 목적 및 항목: 민원처리, 서비스 제공을 위한 최소한의 정보.</li>
            <li>보유·이용 기간: 관련 법령에서 정한 기간 또는 목적 달성 시까지.</li>
            <li>제3자 제공: 법령 근거 또는 정보주체 동의가 있는 경우에 한함.</li>
            <li>처리 위탁: 수탁사, 위탁업무 및 관리감독 기준 고지.</li>
            <li>정보주체의 권리: 열람·정정·삭제·처리정지 등.</li>
            <li>안전성 확보조치: 접근통제, 암호화, 접속기록 보관 등.</li>
            <li>영상정보처리기기 운영·관리 방침(해당 시).</li>
            <li>개인정보 보호책임자: 성명 / 연락처 / 이메일.</li>
            <li>쿠키의 사용(해당 시) 및 거부 방법.</li>
            <li>고충처리: 문의 창구 및 처리 절차.</li>
          </ol>
        </div>
      </div>
      <button
        @click="openVerify"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="verified || !agreeTerms || !agreePrivacy"
      >
        {{ verified ? '✅ 인증 완료' : '본인 인증하기' }}
      </button>

      <button
        @click="register"
        class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!verified"
      >
        회원가입 완료
      </button>
    </div>

    <AuthVerifyModal
      v-if="showVerify"
      :role="userType"
      @verified="onVerified"
      @close="showVerify = false"
    />
  </div>
</template>

<style scoped>
.terms-box {
  @apply max-h-24 overflow-y-auto border border-slate-200 p-2 mt-2 text-xs text-slate-600 bg-slate-50 rounded;
}
</style>