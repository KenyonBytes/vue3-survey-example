import { RouteRecordRaw } from 'vue-router'

export const main: RouteRecordRaw[] = [
  {
    name: 'question.page',
    path: '/page/:page',
    component: () => import('./pages/UserQuestion/UserQuestion.vue'),
    props: true
  },
  {
    name: 'question.review',
    path: '/review',
    component: () => import('./pages/ReviewQuestions/ReviewQuestions.vue'),
  }
]

export const base: RouteRecordRaw[] = []
