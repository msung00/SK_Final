<script setup>
// 3개 -> 7개로 확장
const jobList = [
  { id: 1003, title: '정보 보안 담당자 (경력)', company: '국가정보보호원', location: '서울', date: '2025-11-02 ~ 11-29' },
  { id: 1002, title: '데이터 분석가 (신입)', company: 'K-Job 데이터센터', location: '부산', date: '2025-11-03 ~ 11-25' },
  { id: 1001, title: 'AI 엔지니어', company: '스마트AI랩', location: '대전', date: '2025-11-01 ~ 11-30' },
  { id: 1004, title: 'React 웹 프론트엔드 개발자', company: '네오테크', location: '서울 (강남)', date: '2025-11-05 ~ 12-05' },
  { id: 1005, title: 'Spring 백엔드 개발자 (3년 이상)', company: '하이비전소프트', location: '판교', date: '2025-11-10 ~ 12-10' },
  { id: 1006, title: '컴퓨터 비전(CV) 연구원 (석사 이상)', company: '퓨처데이터랩', location: '대전', date: '2025-11-01 ~ 11-30' },
  { id: 1007, title: 'Node.js 풀스택 개발자', company: '네오테크', location: '부산 (해운대)', date: '2025-11-07 ~ 11-20' },
]

function apply(job) {
  const applicant = JSON.parse(localStorage.getItem('kjob.applicant') || 'null')
  if (!applicant) {
    alert('먼저 구직자 등록을 완료해주세요.')
    return
  }

  alert(`${applicant.name}님, "${job.title}" 공고에 지원이 완료되었습니다.`)
}
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
              @click="apply(job)"
              class="bg-govblue text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
            >
              지원하기
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>