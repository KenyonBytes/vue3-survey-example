<script lang="ts" setup>
const modelValue = defineModel('modelValue', { type: String })
</script>

<template><input v-model="modelValue" class="border" /></template>

<style scoped></style>
