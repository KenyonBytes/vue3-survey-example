<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'click'): void
}>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class="py-2 rounded hover:text-blue-500" @click="handleClick">
    <svg
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="24" height="24" fill="white"></rect>
        <path
          d="M7 17L16.8995 7.10051"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M7 7.00001L16.8995 16.8995"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  </button>
</template>
