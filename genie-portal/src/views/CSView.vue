<template>
  <div class="bg-white rounded-xl shadow p-10">
    <h1 class="text-3xl font-extrabold mb-6">고객센터</h1>

    <p class="text-slate-700 mb-4">
      지니 포털 이용과 관련된 문의사항을 안내드립니다. 아래 연락처를 통해 언제든 문의해주세요.
    </p>

    <div class="space-y-4 text-slate-700 mb-8">
      <p><strong>대표전화:</strong> 02-0000-0000</p>
      <p><strong>운영시간:</strong> 평일 09:00 ~ 18:00 (주말·공휴일 휴무)</p>
      <p><strong>이메일:</strong> support@genie.go.kr</p>
    </div>

    <hr class="my-8" />

    <!-- 오시는 길 섹션 -->
    <section>
      <h2 class="text-2xl font-bold mb-4 border-l-4 border-govblue pl-3">오시는 길</h2>
      <p class="text-slate-700 mb-4">
        본 기관의 위치는 아래 지도를 참고하시기 바랍니다.
      </p>

      <div class="space-y-4 text-slate-700 mb-8">
        <p><strong>주소:</strong> 서울특별시 중구 충무로5가 73-1</p>
        <p><strong>교통안내:</strong> 지하철 3호선 충무로역 1번 출구에서 도보 5분 거리입니다.</p>
      </div>

      <!-- 지도 표시 -->
      <div class="w-full h-[400px] rounded-xl overflow-hidden shadow">
        <iframe
          src="https://maps.google.com/maps?q=서울특별시%20중구%20충무로5가%2073-1&t=&z=17&ie=UTF8&iwloc=&output=embed"
          class="w-full h-full border-0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </div>
</template>
