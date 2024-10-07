<script lang="ts" setup>
const modelValue = defineModel('modelValue', { type: String })
defineProps<{
  label: string
  options: string[]
  name: string
}>()
</script>

<template>
  <div>
    <div
      v-for="option in options"
      :key="option"
      @click="modelValue = option"
      class="flex flex-col cursor-pointer"
    >
      <div class="flex gap-4">
        <input type="radio" :value="option" :name="name" v-model="modelValue" />
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
