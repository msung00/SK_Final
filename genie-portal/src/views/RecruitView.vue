<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRegister() {
  router.push('/register')
}

function startMatching() {
  router.push('/matching')
}

function viewJobs() {
  router.push('/jobs')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-10">
    <h1 class="text-3xl font-extrabold mb-6">채용지원</h1>
    <p class="text-slate-700 mb-6">
      본 기관은 구직자를 위한 다양한 일자리 연계 서비스를 제공합니다.  
      아래 항목을 통해 구직자 등록, 일자리 매칭, 채용정보를 확인하세요.
    </p>

    <div class="grid grid-cols-3 gap-6 mb-10">
      <div class="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition group">
        <h2 class="text-xl font-bold text-govblue mb-3">구직자 등록</h2>
        <p class="text-slate-600 mb-4">기본정보, 경력, 희망 조건을 입력해 등록할 수 있습니다.</p>
        <button
          @click="goToRegister"
          class="bg-govblue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          등록하기
        </button>
      </div>

      <div class="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition group">
        <h2 class="text-xl font-bold text-govblue mb-3">일자리 매칭</h2>
        <p class="text-slate-600 mb-4">AI 기반으로 구직자의 경력과 희망직무에 맞는 일자리를 추천합니다.</p>
        <button
          @click="startMatching"
          class="bg-govblue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          매칭 시작
        </button>
      </div>

      <div class="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition group">
        <h2 class="text-xl font-bold text-govblue mb-3">채용정보 조회</h2>
        <p class="text-slate-600 mb-4">공공기관 및 민간기업의 최신 채용정보를 확인할 수 있습니다.</p>
        <button
          @click="viewJobs"
          class="bg-govblue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          공고 확인
        </button>
      </div>
    </div>
  </div>
</template>
