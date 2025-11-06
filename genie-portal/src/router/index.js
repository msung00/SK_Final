import { createRouter, createWebHistory } from 'vue-router'

// 기본 페이지
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import CivilView from '@/views/CivilView.vue'
import OpenInfoView from '@/views/OpenInfoView.vue'
import NewsView from '@/views/NewsView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import TermsView from '@/views/TermsView.vue'
import CopyrightView from '@/views/CopyrightView.vue'
import PolicyView from '@/views/PolicyView.vue'
import MapView from '@/views/MapView.vue'
import CSView from '@/views/CSView.vue'
import RecruitView from '@/views/RecruitView.vue'
import RegisterView from '@/views/RegisterView.vue'
import MatchingView from '@/views/MatchingView.vue'
import JobsView from '@/views/JobsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistersView from '@/views/RegistersView.vue'
import MyPage from '@/views/MyPage.vue'
import RecruitManageView from '@/views/RecruitManageView.vue'

// 1. 관리자 페이지 import
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    { path: '/about', name: 'about', component: AboutView },
    { path: '/civil', name: 'civil', component: CivilView },
    { path: '/openinfo', name: 'openinfo', component: OpenInfoView },
    { path: '/news', name: 'news', component: NewsView },
    { path: '/privacy', name: 'privacy', component: PrivacyView },
    { path: '/terms', name: 'terms', component: TermsView },
    { path: '/copyright', name: 'copyright', component: CopyrightView },
    { path: '/policy', name: 'policy', component: PolicyView },
    { path: '/map', name: 'map', component: MapView },
    { path: '/cs', name: 'cs', component: CSView },

    { path: '/recruit', name: 'recruit', component: RecruitView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/matching', name: 'matching', component: MatchingView },
    { path: '/jobs', name: 'jobs', component: JobsView },

    { path: '/login', name: 'login', component: LoginView },
    // RegistersView를 메인 회원가입 페이지로 사용
    { path: '/register', name: 'registers', component: RegistersView }, 
    
    { path: '/mypage', name: 'mypage', component: MyPage },
    { path: '/recruit/manage', name: 'recruit-manage', component: RecruitManageView },

    // 2. 관리자 페이지 라우트 추가
    { path: '/admin', name: 'admin', component: AdminView },

    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// 3. 네비게이션 가드 (페이지 접근 제어)
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('kjob.role')
  const username = localStorage.getItem('kjob.username')

  // 관리자 페이지 접근
  if (to.path === '/admin') {
    if (role === 'admin') {
      next() // 허용
    } else {
      alert('관리자만 접근 가능합니다.')
      next('/') // 홈으로
    }
  } 
  
  // 마이페이지 접근
  else if (to.path === '/mypage') {
    if (username) {
      next() // 허용
    } else {
      alert('로그인이 필요합니다.')
      next('/login') // 로그인 페이지로
    }
  } 
  
  // 기업 채용관리 접근
  else if (to.path === '/recruit/manage') {
    if (role === 'company') {
      next() // 허용
    } else {
      alert('기업 회원만 접근 가능합니다.')
      next('/') // 홈으로
    }
  } 
  
  // 나머지 페이지
  else {
    next() // 모두 허용
  }
})

export default router