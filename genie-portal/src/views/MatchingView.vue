<script setup>
// 3개 -> 7개로 확장
const results = [
  { company: 'AI보안연구소', title: 'AI 엔지니어', location: '대전광역시 유성구', match: 95 },
  { company: '네오테크', title: 'React 웹 프론트엔드 개발자', location: '서울특별시 강남구', match: 92 },
  { company: '국가정보보호원', title: '정보 보안 담당자 (경력)', location: '서울특별시', match: 90 },
  { company: '공공데이터센터', title: '데이터 분석 연구원', location: '세종특별자치시', match: 87 },
  { company: '하이비전소프트', title: 'Spring 백엔드 개발자', location: '경기도 성남시', match: 84 },
  { company: '퓨처데이터랩', title: '컴퓨터 비전(CV) 연구원', location: '대전광역시', match: 81 },
  { company: 'K-Job 클라우드팀', title: 'Node.js 풀스택 개발자', location: '부산광역시', match: 79 },
]
</script>

<template>
  <div class="bg-white rounded-xl shadow p-10">
    <h1 class="text-3xl font-extrabold mb-6">일자리 매칭 결과</h1>
    <p class="text-slate-700 mb-6">AI 분석을 기반으로 아래와 같은 맞춤 일자리를 추천합니다.</p>

    <div class="grid gap-6">
      <div
        v-for="job in results"
        :key="job.company"
        class="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
      >
        <h2 class="text-xl font-bold text-govblue mb-1">{{ job.title }}</h2>
        <p class="text-slate-600">{{ job.company }} · {{ job.location }}</p>
        <p class="text-slate-700 mt-2 font-semibold">적합도: {{ job.match }}%</p>
        <button
          class="mt-4 bg-govblue text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          지원하기
        </button>
      </div>
    </div>
  </div>
</template>