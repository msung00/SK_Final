<script setup>
import genieImg from '@/images/genie.png'
</script>

<template>
  <section class="grid grid-cols-2 gap-10 items-center">
    <div>
      <p class="text-sm font-semibold text-govblue mb-2">국민과 함께하는 공공서비스</p>
      <h1 class="text-4xl font-extrabold mb-4">지니 공공기관 포털</h1>
      <p class="text-slate-600">
        민원 신청, 정책 확인, 정보공개, 기관소개 등 주요 서비스를 한 곳에서 이용하세요.
      </p>
      <div class="mt-6 flex gap-3">
        <RouterLink
          to="/civil"
          class="bg-govblue text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          민원 신청 바로가기
        </RouterLink>
        <RouterLink
          to="/openinfo"
          class="border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 font-medium"
        >
          정보공개 안내
        </RouterLink>
      </div>
    </div>

    <div>
      <img
        :src="genieImg"
        alt="공공서비스 이미지"
        class="rounded-xl shadow object-contain w-full max-h-[450px]"
      />
    </div>
  </section>

  <section class="mt-14">
    <h2 class="text-2xl font-bold mb-6 border-l-4 border-govblue pl-3">자주 찾는 서비스</h2>

    <div class="grid grid-cols-4 gap-6">
      <!-- 민원 안내 -->
      <RouterLink
        to="/civil"
        class="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
      >
        <div class="flex items-center justify-between">
          <p class="font-semibold">민원 안내</p>
          <div class="bg-govsky/10 text-govblue p-2 rounded-lg group-hover:bg-govblue group-hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M4 6h16M4 12h10M4 18h16" />
            </svg>
          </div>
        </div>
        <p class="text-sm text-slate-600 mt-2">민원 통합신청 및 제증명 발급</p>
      </RouterLink>

      <!-- 정보공개 -->
      <RouterLink
        to="/openinfo"
        class="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
      >
        <div class="flex items-center justify-between">
          <p class="font-semibold">정보공개</p>
          <div
            class="bg-govsky/10 text-govblue p-2 rounded-lg group-hover:bg-govblue group-hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="4" y="4" width="16" height="16" />
              <path d="M8 8h8M8 12h5" />
            </svg>
          </div>
        </div>
        <p class="text-sm text-slate-600 mt-2">공공데이터 및 사전정보공표</p>
      </RouterLink>

      <!-- 공지·보도 -->
      <RouterLink
        to="/news"
        class="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
      >
        <div class="flex items-center justify-between">
          <p class="font-semibold">공지·보도</p>
          <div
            class="bg-govsky/10 text-govblue p-2 rounded-lg group-hover:bg-govblue group-hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M8 8h8M8 12h5" />
            </svg>
          </div>
        </div>
        <p class="text-sm text-slate-600 mt-2">기관 공지사항 및 보도자료</p>
      </RouterLink>

      <!-- 기관소개 -->
      <RouterLink
        to="/about"
        class="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
      >
        <div class="flex items-center justify-between">
          <p class="font-semibold">기관소개</p>
          <div
            class="bg-govsky/10 text-govblue p-2 rounded-lg group-hover:bg-govblue group-hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <circle cx="12" cy="8" r="3" />
              <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            </svg>
          </div>
        </div>
        <p class="text-sm text-slate-600 mt-2">기관 비전 및 조직도 안내</p>
      </RouterLink>
    </div>
  </section>
</template>
