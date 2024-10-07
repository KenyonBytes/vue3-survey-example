<script lang="ts" setup>
import menuHamburger from '@/components/buttons/menuHamburger.vue'
const emit = defineEmits<{
  (event: 'toggle-drawer'): void
}>()
</script>

<template>
  <header class="w-full p-4 bg-gray-100">
    <div class="flex items-center">
      <menuHamburger class="mr-4" @click="emit('toggle-drawer')" />
      <img src="@/assets/images/logo.svg" />
      <div class="flex-1 text-center text-blue-500 font-semibold">Survey Taking App</div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 64px;
}
</style>
