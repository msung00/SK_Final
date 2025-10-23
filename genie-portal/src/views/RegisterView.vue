<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showModal = ref(false)

// 폼 입력값 (나중에 서버 전송 가능)
const form = ref({
  name: '',
  email: '',
  job: '',
  location: '',
  experience: '',
})

// 등록 완료 버튼 클릭
function submitForm() {
  // (여기서 실제 서버 저장 로직 가능)
  console.log('등록된 정보:', form.value)
  showModal.value = true // 완료 모달 열기
}

// 확인 버튼 → 채용지원 페이지로 이동
function closeModal() {
  showModal.value = false
  router.push('/recruit')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-10 max-w-3xl mx-auto relative">
    <h1 class="text-3xl font-extrabold mb-6">구직자 등록</h1>

    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-slate-700 mb-1">이름</label>
        <input v-model="form.name" type="text" placeholder="홍길동" class="w-full border rounded-lg p-2" />
      </div>

      <div>
        <label class="block text-slate-700 mb-1">이메일</label>
        <input v-model="form.email" type="email" placeholder="example@email.com" class="w-full border rounded-lg p-2" />
      </div>

      <div>
        <label class="block text-slate-700 mb-1">희망 직무</label>
        <input v-model="form.job" type="text" placeholder="예: 웹 개발자, 데이터 분석가" class="w-full border rounded-lg p-2" />
      </div>

      <div>
        <label class="block text-slate-700 mb-1">희망 근무지</label>
        <input v-model="form.location" type="text" placeholder="예: 서울특별시" class="w-full border rounded-lg p-2" />
      </div>

      <div>
        <label class="block text-slate-700 mb-1">경력사항</label>
        <textarea v-model="form.experience" rows="4" placeholder="이전 경력 및 이력사항을 입력하세요" class="w-full border rounded-lg p-2"></textarea>
      </div>

      <button type="submit" class="bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        등록 완료
      </button>
    </form>

    <!-- ✅ 등록 완료 모달 -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center">
        <h2 class="text-2xl font-bold mb-3 text-govblue">등록이 완료되었습니다!</h2>
        <p class="text-slate-700 mb-6">
          구직자 정보가 성공적으로 등록되었습니다.<br />
          채용지원 페이지로 돌아가시겠습니까?
        </p>
        <button
          @click="closeModal"
          class="bg-govblue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
