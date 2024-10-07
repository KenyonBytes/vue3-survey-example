<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useQuestionStore } from './stores/questions'
import { onMounted } from 'vue'
const questionStore = useQuestionStore()

onMounted(async () => {
  await questionStore.loadQuestions()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
