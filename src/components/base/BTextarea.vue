<script lang="ts" setup>
const modelValue = defineModel('modelValue', { type: String })
withDefaults(
  defineProps<{
    label?: string
    rows?: number
    cols?: number
    placeholder?: string
  }>(),
  {
    rows: 5
  }
)
</script>

<template>
  <textarea
    v-model="modelValue"
    :rows="rows"
    :cols="cols"
    class="border p-2 rounded"
    :placeholder="placeholder"
  />
</template>

<style scoped></style>
