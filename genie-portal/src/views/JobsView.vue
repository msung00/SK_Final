<script setup>
const jobList = [
  { id: 1, title: '공공기관 보안 담당자', company: '국가정보보호원', location: '서울', date: '2025-11-10 ~ 2025-11-30' },
  { id: 2, title: '데이터 엔지니어', company: '지니데이터센터', location: '부산', date: '2025-10-25 ~ 2025-11-15' },
  { id: 3, title: 'AI 모델 연구원', company: '스마트AI랩', location: '대전', date: '2025-11-01 ~ 2025-11-25' },
  { id: 4, title: '웹 프론트엔드 개발자', company: '공공정보서비스센터', location: '세종', date: '2025-11-05 ~ 2025-11-28' },
  { id: 5, title: '시스템 운영 관리자', company: '국가정보통신진흥원', location: '서울', date: '2025-10-20 ~ 2025-11-20' },
  { id: 6, title: '네트워크 엔지니어', company: '지니네트웍스', location: '인천', date: '2025-11-02 ~ 2025-11-30' },
  { id: 7, title: '보안 취약점 분석가', company: '사이버보안센터', location: '서울', date: '2025-11-12 ~ 2025-11-29' },
  { id: 8, title: '빅데이터 분석가', company: '공공데이터플랫폼', location: '부산', date: '2025-11-03 ~ 2025-11-26' },
  { id: 9, title: 'AI 서비스 기획자', company: '지니테크', location: '광주', date: '2025-10-29 ~ 2025-11-25' },
  { id: 10, title: '기술지원 엔지니어', company: '한국정보산업진흥협회', location: '대구', date: '2025-11-08 ~ 2025-11-30' },
]
</script>

<template>
  <div class="bg-white rounded-xl shadow p-10">
    <h1 class="text-3xl font-extrabold mb-6">채용정보 조회</h1>
    <p class="text-slate-700 mb-6">현재 진행 중인 채용공고를 확인하세요.</p>

    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-govblue text-white">
          <th class="p-3 rounded-tl-lg">공고명</th>
          <th class="p-3">기관명</th>
          <th class="p-3">근무지</th>
          <th class="p-3">접수기간</th>
          <th class="p-3 rounded-tr-lg text-center">지원</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="job in jobList"
          :key="job.id"
          class="border-b hover:bg-slate-50 transition"
        >
          <td class="p-3 font-semibold">{{ job.title }}</td>
          <td class="p-3">{{ job.company }}</td>
          <td class="p-3">{{ job.location }}</td>
          <td class="p-3">{{ job.date }}</td>
          <td class="p-3 text-center">
            <button
              class="bg-govblue text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
              @click="alert(`${job.company} - ${job.title} 지원 페이지로 이동합니다.`)"
            >
              지원하기
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
