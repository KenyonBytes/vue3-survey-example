<script lang="ts" setup>
import { onMounted, ref } from 'vue'

// const modelValue = defineModel('modelValue', { type: String })
const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void
}>()
const props = defineProps<{
  modelValue: string[]
  label: string
  options: string[]
  name: string
}>()

const selectedOptions = ref<string[]>(props.modelValue)

onMounted(() => {
  selectedOptions.value = [...props.modelValue]
})

function handleChange(option: string, event?: Event) {
  const isChecked = event
    ? (event.target as HTMLInputElement).checked
    : !selectedOptions.value.includes(option)

  if (isChecked) {
    if (!selectedOptions.value.includes(option)) {
      selectedOptions.value.push(option)
    }
  } else {
    selectedOptions.value = selectedOptions.value.filter((item: string) => item !== option)
  }

  emit('update:modelValue', selectedOptions.value)
}
</script>

<template>
  <div>
    <div
      v-for="option in options"
      :key="option"
      class="checkbox-option flex flex-col cursor-pointer"
      @click="handleChange(option)"
    >
      <div class="flex gap-4">
        <input
          type="checkbox"
          :value="option"
          :name="name"
          :checked="selectedOptions.includes(option)"
          @change="(event) => handleChange(option, event)"
        />
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
