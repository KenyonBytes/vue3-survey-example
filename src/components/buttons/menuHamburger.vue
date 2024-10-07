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
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      class="iconify iconify--mdi"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
        <path
          d="M20 12L4 12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        ></path>
        <path
          d="M20 17L4 17"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        ></path>
      </g>
    </svg>
  </button>
</template>
