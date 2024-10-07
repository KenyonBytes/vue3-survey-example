<script setup lang="ts">
import menuClose from '@/components/buttons/menuClose.vue'
import { useQuestionStore } from '@/stores/questions'
import { storeToRefs } from 'pinia'
defineProps<{
  isVisible: boolean
}>()

const questionStore = useQuestionStore()
const { menuItems } = storeToRefs(questionStore)

const emit = defineEmits<{
  (event: 'toggle-drawer'): void
}>()

const toggleDrawer = () => {
  emit('toggle-drawer')
}
</script>

<template>
  <div v-if="isVisible" class="drawer fixed inset-0 z-50" @click.self="toggleDrawer">
    <div class="fixed inset-0 bg-gray-300 bg-opacity-75" @click.self="toggleDrawer"></div>

    <div class="fixed inset-y-0 left-0 bg-white w-64 h-full p-4">
      <menuClose class="absolute top-0 right-3" @click="toggleDrawer" />
      <nav class="mt-10 flex flex-col">
        <router-link
          v-for="item of menuItems"
          :key="item.label"
          :to="{ name: item.routeTo.name, params: item.routeTo?.params }"
          @click="emit('toggle-drawer')"
        >
          <span class="hover:text-[#0B5C5E] hover:font-semibold">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  overflow: hidden;
  height: 100vh;
  padding-left: 0;
  border-left: 1px solid whitesmoke;
  background: white;
  z-index: 200;
  transition: all 0.2s;
}
</style>
