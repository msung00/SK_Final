<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-3">알림·소식</h1>
    <p class="text-slate-600 mb-8">기관의 공지사항, 보도자료, 이벤트 소식을 확인하세요.</p>

    <div class="grid grid-cols-3 gap-6">
      <section class="col-span-2">
        <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">공지사항</h2>
        <ul class="bg-white border border-slate-200 rounded-xl divide-y">
          <li class="px-4 py-3 flex justify-between">
            <a href="#" class="font-medium hover:underline">10/27(월) 00:00~04:00 시스템 점검 안내</a>
            <time class="text-xs text-slate-500">2025-10-22</time>
          </li>
          <li class="px-4 py-3 flex justify-between">
            <a href="#" class="font-medium hover:underline">전자민원 서비스 개선 공지</a>
            <time class="text-xs text-slate-500">2025-10-20</time>
          </li>
          <li class="px-4 py-3 flex justify-between">
            <a href="#" class="font-medium hover:underline">개인정보 처리방침 개정 예고</a>
            <time class="text-xs text-slate-500">2025-10-15</time>
          </li>
        </ul>
      </section>

      <aside>
        <h2 class="text-xl font-bold mb-3 border-l-4 border-govblue pl-3">보도자료</h2>
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <img src="C:\project\SK_Final\SK_Final\genie-portal\src\images\portal.png">
          <div class="p-4 space-y-2">
            <a href="#" class="font-semibold hover:underline">지니 포털 개편, 접근성 강화</a>
            <p class="text-sm text-slate-600">민원 편의성 향상과 정보 접근성 제고를 위한 디자인 개편 시행.</p>
            <time class="text-xs text-slate-500">2025-10-22</time>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
