<template>
  <div class="flex flex-col min-h-screen text-slate-900 bg-govbg">
    <!-- Header -->
    <header class="bg-white shadow border-b border-slate-200 sticky top-0 z-50">
      <div class="container flex items-center justify-between py-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="/src/images/logo.png" alt="지니 로고" class="w-10 h-10 rounded-lg object-contain" />
          <div>
            <p class="text-xl font-bold text-govblue">한국고용정보공단 포털</p>
            <p class="text-xs text-slate-500">Korea Employment Agency Portal</p>
          </div>
        </RouterLink>
        <nav>
          <ul class="flex gap-6 text-sm font-semibold">
            <li><RouterLink to="/civil" class="hover:text-govblue" active-class="text-govblue">민원안내</RouterLink></li>
            <li><RouterLink to="/openinfo" class="hover:text-govblue" active-class="text-govblue">정보공개</RouterLink></li>
            <li><RouterLink to="/policy" class="hover:text-govblue" active-class="text-govblue">정책·사업</RouterLink></li>
            <li><RouterLink to="/news" class="hover:text-govblue" active-class="text-govblue">알림·소식</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-govblue" active-class="text-govblue">기관소개</RouterLink></li>
            <li><RouterLink to="/recruit" class="hover:text-govblue" active-class="text-govblue">참여·채용</RouterLink></li>
            <li><RouterLink to="/cs" class="hover:text-govblue" active-class="text-govblue">고객센터</RouterLink></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Page -->
    <main class="container py-10 flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-200 py-10">
      <div class="container flex justify-between">
        <div>
          <p class="font-bold text-lg">한국고용정보공단 | 공공기관 포털</p>
          <p class="text-sm text-slate-400 mt-1">© 2025 Korea Employment Agency Portal. All rights reserved.</p>
        </div>
        <ul class="text-sm text-slate-400 space-x-4">
          <li class="inline"><RouterLink to="/privacy" class="hover:underline">개인정보처리방침</RouterLink></li>
          <li class="inline"><RouterLink to="/terms" class="hover:underline">이용약관</RouterLink></li>
          <li class="inline"><RouterLink to="/copyright" class="hover:underline">저작권정책</RouterLink></li>
          <li class="inline"><RouterLink to="/map" class="hover:underline">오시는 길</RouterLink></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
