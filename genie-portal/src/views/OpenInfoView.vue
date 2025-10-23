<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-3">정보공개</h1>
    <p class="text-slate-600 mb-8">사전정보공표, 정보공개 청구, 통계·공시 자료를 제공합니다.</p>

    <div class="grid grid-cols-3 gap-6 mb-10">
      <a href="#pre" class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow">사전정보공표</a>
      <a href="#request" class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow">정보공개 청구</a>
      <a href="#stats" class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow">공시·통계</a>
    </div>

    <section id="pre" class="mb-12">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">사전정보공표</h2>
      <ul class="list-disc pl-6 space-y-1 text-slate-700">
        <li>기관 운영계획 및 예산</li>
        <li>주요 사업 현황</li>
        <li>감사결과 요약</li>
      </ul>
    </section>

    <section id="request" class="mb-12">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">정보공개 청구</h2>
      <ol class="list-decimal pl-6 space-y-1 text-slate-700">
        <li>회원/비회원 청구서 제출</li>
        <li>접수·처리(10일 이내) 및 연장·이의신청 안내</li>
        <li>결정통지 및 열람/사본 교부</li>
      </ol>
    </section>

    <section id="stats">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">공시·통계</h2>
      <p class="text-slate-700">연차별 사업성과, 예산집행 현황 등을 제공합니다.</p>
    </section>
  </div>
</template>
