<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useQuestionStore } from '@/stores/questions'
import BInput from '@/components/base/BInput.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const questionStore = useQuestionStore()

onMounted(() => {
  userName.value == 'Valued Survey Participant'
    ? (nameModel.value = '')
    : (nameModel.value = userName.value)
})

const nameModel = ref('')
const { userName } = storeToRefs(userStore)

const handleUserNameUpdate = (v: string | undefined): void => {
  !v ? (userStore.userName = 'Valued Survey Participant') : (userStore.userName = v)
}
</script>

<template>
  <div class="w-full md:w-96 mx-auto mt-32 flex flex-col gap-6 justify-center text-center p-4">
    <h1 class="text-xl md:text-3xl text-[#0B5C5E] font-bold">Welcome, {{ userStore.userName }}!</h1>
    <div class="flex flex-col font-semibold">
      <label>First, please tell us who you are</label>
      <BInput
        v-model="nameModel"
        @update:model-value="handleUserNameUpdate"
        label="Your Name"
        aria-placeholder="Enter your name"
        placeholder="Enter your name"
      />
    </div>
    <div class="flex justify-center mt-6">
      <button
        @click="$router.push({ name: 'question.page', params: { page: 1 } })"
        class="bg-blue-100 rounded-md p-4 font-semibold text-blue-500"
      >
        Let's Get Started!
      </button>
    </div>
  </div>
</template>
