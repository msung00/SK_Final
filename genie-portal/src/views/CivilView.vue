<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-3">민원안내</h1>
    <p class="text-slate-600 mb-8">전자민원 신청, 제증명 발급, 신고센터 이용방법을 안내합니다.</p>

    <div class="grid grid-cols-3 gap-6 mb-10">
      <a href="#apply" class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow">전자민원 신청</a>
      <a href="#docs" class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow">제증명 발급</a>
      <a href="#report" class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow">신고센터</a>
    </div>

    <section id="apply" class="mb-12">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">전자민원 신청 절차</h2>
      <ol class="list-decimal pl-6 space-y-2 text-slate-700">
        <li>본인확인</li>
        <li>민원 유형 선택 및 신청서 작성</li>
        <li>증빙서류 업로드 및 수수료 납부(해당 시)</li>
        <li>접수번호 확인 및 처리결과 조회</li>
      </ol>
    </section>

    <section id="docs" class="mb-12">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">제증명 발급 안내</h2>
      <ul class="space-y-2 text-slate-700">
        <li>발급 가능 시간: 24시간(점검 제외)</li>
        <li>수수료: 유형별 상이</li>
        <li>발급 방식: PDF 다운로드 또는 우편(유료)</li>
      </ul>
    </section>

    <section id="report">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">신고센터 이용</h2>
      <p class="text-slate-700">부패·공익·불편 신고는 사실관계 확인을 위해 추가 자료를 요청할 수 있습니다.</p>
    </section>
  </div>
</template>
