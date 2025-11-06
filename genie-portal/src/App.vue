<template>
  <div class="flex flex-col min-h-screen text-slate-900 bg-govbg">
    <header class="bg-white shadow border-b border-slate-200 sticky top-0 z-50">
      <div class="container flex items-center justify-between py-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <img
            src="/src/images/logo.png"
            alt="K-Job 로고"
            class="w-10 h-10 rounded-lg object-contain"
          />
          <div>
            <p class="text-xl font-bold text-govblue">K-Job 인재 헌터스 포털</p>
            <p class="text-xs text-slate-500">Korea Job Talent Hunters Portal</p>
          </div>
        </RouterLink>

        <nav>
          <ul class="flex gap-6 text-sm font-semibold items-center">
            <li>
              <RouterLink
                to="/civil"
                class="hover:text-govblue"
                active-class="text-govblue"
                >서비스 안내</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/openinfo"
                class="hover:text-govblue"
                active-class="text-govblue"
                >채용 공지</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/policy"
                class="hover:text-govblue"
                active-class="text-govblue"
                >복지 정책</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/news" class="hover:text-govblue" active-class="text-govblue"
                >알림·소식</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/about" class="hover:text-govblue" active-class="text-govblue"
                >회사 소개</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/recruit"
                class="hover:text-govblue"
                active-class="text-govblue"
                >참여·채용</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/cs" class="hover:text-govblue" active-class="text-govblue"
                >고객센터</RouterLink
              >
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-3 ml-6">
          <template v-if="username">
            <p class="text-sm font-semibold text-govblue">
              {{ username }}님
              <span class="text-xs text-slate-500 ml-1">
                ({{
                  role === 'company'
                    ? '기업회원'
                    : role === 'admin'
                    ? '관리자'
                    : '구직자'
                }})
              </span>
            </p>

            <RouterLink
              v-if="role === 'admin'"
              to="/admin"
              class="text-sm border border-slate-300 px-3 py-1 rounded hover:bg-slate-100"
            >
              관리자 페이지
            </RouterLink>

            <RouterLink
              v-else
              to="/mypage"
              class="text-sm border border-slate-300 px-3 py-1 rounded hover:bg-slate-100"
            >
              마이페이지
            </RouterLink>

            <button
              @click="logout"
              class="bg-govblue text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              로그아웃
            </button>
          </template>

          <template v-else>
            <RouterLink
              to="/login"
              class="text-sm bg-govblue text-white px-3 py-1.5 rounded hover:bg-blue-700"
            >
              로그인
            </RouterLink>
            <RouterLink
              to="/register"
              class="text-sm border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-100"
            >
              회원가입
            </RouterLink>
          </template>
        </div>
        </div>
    </header>

    <main class="container py-10 flex-1">
      <RouterView />
    </main>

    <footer class="bg-slate-900 text-slate-200 py-10">
      <div class="container flex justify-between flex-wrap gap-6">
        <div>
          <p class="font-bold text-lg">K-Job 인재 헌터스 | 고용서비스 포털</p>
          <p class="text-sm text-slate-400 mt-1">
            © 2025 Korea Job Talent Hunters Portal. All rights reserved.
          </p>
        </div>
        <ul class="text-sm text-slate-400 space-x-4">
          <li class="inline">
            <RouterLink to="/privacy" class="hover:underline"
              >개인정보처리방침</RouterLink
            >
          </li>
          <li class="inline">
            <RouterLink to="/terms" class="hover:underline">이용약관</RouterLink>
          </li>
          <li class="inline">
            <RouterLink to="/copyright" class="hover:underline">저작권정책</RouterLink>
          </li>
          <li class="inline">
            <RouterLink to="/map" class="hover:underline">오시는 길</RouterLink>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const username = ref(localStorage.getItem('kjob.username') || null)
const role = ref(localStorage.getItem('kjob.role') || 'user')
const router = useRouter()

window.addEventListener('storage', (e) => {
  if (e.key === 'kjob.username') username.value = e.newValue
  if (e.key === 'kjob.role') role.value = e.newValue
})

onMounted(() => {
  const storedUser = localStorage.getItem('kjob.username')
  const storedRole = localStorage.getItem('kjob.role')
  if (storedUser) username.value = storedUser
  if (storedRole) role.value = storedRole
})

function logout() {
  localStorage.removeItem('kjob.username')
  localStorage.removeItem('kjob.role')
  username.value = null
  role.value = 'user'
  router.push('/')
}
</script>

<style scoped>
.container {
  @apply max-w-7xl mx-auto px-4;
}
</style>