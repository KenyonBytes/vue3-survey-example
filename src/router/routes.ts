import StartPage from '@/pages/StartPage.vue'
import { RouteRecordRaw } from 'vue-router'

function resolveImportedRoutes(
  modules: Record<string, { [key: string]: any }>,
  exportName: string
) {
  return Object.values(modules)
    .filter((module) => module[exportName])
    .flatMap((module) => module[exportName])
}

const routes: RouteRecordRaw[] = [
  ...resolveImportedRoutes(import.meta.glob('../modules/*/routes.ts', { eager: true }), 'base'),
  {
    path: '/',
    component: () => import(`@/layouts/MainLayout/MainLayout.vue`),
    children: [
      ...resolveImportedRoutes(import.meta.glob('../modules/*/routes.ts', { eager: true }), 'main'),
      {
        path: '/',
        name: 'start',
        component: StartPage
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

export default routes
