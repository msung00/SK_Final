<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-3 text-govblue">채용 서비스 안내</h1>
    <p class="text-slate-600 mb-10 leading-relaxed">
      K-Job은 중소기업의 채용과 구직자의 취업을 연결하는 <strong>스마트 고용 매칭 플랫폼</strong>입니다.<br>
      단순한 구인·구직 게시판을 넘어, 인재 데이터 기반의 <strong>맞춤형 매칭</strong> 서비스를 제공합니다.
    </p>

    <!-- 서비스 항목 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <!-- 기업회원 -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
        <h3 class="font-bold text-lg mb-2 text-govblue">기업 회원 서비스</h3>
        <p class="text-slate-600 text-sm mb-4">
          기업 회원으로 가입하면 손쉽게 <strong>채용 공고 등록</strong> 및 <strong>지원자 관리</strong>가 가능합니다.
        </p>
        <RouterLink
          to="/register"
          class="inline-block bg-govblue text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          기업 회원가입
        </RouterLink>
      </div>

      <!-- 인재 매칭 -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
        <h3 class="font-bold text-lg mb-2 text-govblue">AI 인재 매칭</h3>
        <p class="text-slate-600 text-sm mb-4">
          AI 매칭 시스템이 기업의 직무 요건과 구직자의 역량을 분석하여 <strong>적합한 인재</strong>를 추천합니다.
        </p>
        <RouterLink
          to="/matching"
          class="inline-block bg-govblue text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          매칭 서비스 보기
        </RouterLink>
      </div>

      <!-- 구직자 지원 서비스 -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
        <h3 class="font-bold text-lg mb-2 text-govblue">구직자 지원 서비스</h3>
        <p class="text-slate-600 text-sm mb-4">
          일반 회원으로 가입하면 <strong>이력서 등록</strong> 후 다양한 기업의 채용공고에 지원할 수 있습니다.
        </p>
        <RouterLink
          to="/register"
          class="inline-block bg-govblue text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          일반 회원가입
        </RouterLink>
      </div>
    </div>

    <!-- 서비스 이용 절차 -->
    <section id="process" class="mb-12">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">
        채용 서비스 이용 절차
      </h2>
      <ol class="list-decimal pl-6 space-y-2 text-slate-700">
        <li>회원 유형 선택 및 가입 완료 (기업 / 구직자)</li>
        <li>기업: 채용 공고 등록 및 직무 요건 입력</li>
        <li>구직자: 이력서 등록 후 공고에 지원</li>
        <li>AI 매칭 시스템을 통한 자동 매칭 결과 확인</li>
      </ol>
    </section>

    <!-- 중소기업 혜택 -->
    <section id="benefit" class="mb-12">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">
        중소기업 회원 혜택
      </h2>
      <ul class="space-y-2 text-slate-700">
        <li>✅ 신규 회원 기업 대상 7일 무료 공고 등록</li>
        <li>✅ 우수 기업 홍보관 노출 및 뉴스레터 홍보</li>
        <li>✅ 채용 절차 관리 대시보드 무료 제공</li>
      </ul>
    </section>

    <!-- 문의 -->
    <section id="contact">
      <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">
        문의 및 제휴
      </h2>
      <p class="text-slate-700 mb-3">
        제휴 및 서비스 문의는 아래로 연락해주세요.
      </p>
      <ul class="text-slate-700 space-y-1">
        <li>📧 이메일: <strong>support@kjob.co.kr</strong></li>
        <li>📞 전화: <strong>02-567-8901</strong></li>
        <li>🏢 주소: 서울특별시 강남구 테헤란로 321 K-JOB BIZ Tower 5층</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
strong {
  color: #2b5fff;
}
</style>
