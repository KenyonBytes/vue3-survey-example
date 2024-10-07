<script setup lang="ts">
import MainHeader from './MainHeader.vue'
import MainDrawer from './MainDrawer.vue'
import { ref } from 'vue'

const drawerIsToggled = ref(false)
</script>

<template>
  <MainHeader @toggle-drawer="drawerIsToggled = !drawerIsToggled" />
  <MainDrawer :is-visible="drawerIsToggled" @toggle-drawer="drawerIsToggled = !drawerIsToggled" />
  <router-view />
</template>

<style scoped></style>
