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


    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
