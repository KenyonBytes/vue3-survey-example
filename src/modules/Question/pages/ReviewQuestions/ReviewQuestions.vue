<script lang="ts" setup>
import { useQuestionStore } from '@/stores/questions'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const questionStore = useQuestionStore()
</script>

<template>
  <div class="flex flex-col justify-center text-center mt-10">
    <h1 class="text-3xl text-green-800 font-semibold">
      Phew, you made it, {{ userStore.userName }}.
    </h1>
    <span class="text-sm text-gray-500">(Forgive me, I kinda thought you wouldn't have!)</span>
    <div v-if="questionStore.allQuestions" class="p-10 text-left w-full md:w-auto mx-auto">
      <h4 class="text-xl">Let's Review Your Answers</h4>
      <div class="flex flex-col gap-6">
        <div v-for="page of questionStore.allQuestions.pages" :key="page.pageNumber">
          <span class="font-semibold">Your Answers for Page {{ page.pageNumber }}</span>
          <div v-for="question of page.questions">
            {{ question.label }}
            <div
              v-if="questionStore.answers[question.id] && questionStore.answers[question.id].length"
              class="ml-2 text-blue-400"
            >
              {{
                typeof questionStore.answers[question.id] === 'object'
                  ? questionStore.answers[question.id].join(', ')
                  : questionStore.answers[question.id]
              }}
            </div>
            <div v-else class="font-light ml-2 text-red-300">You may have missed this one!</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center my-6">
        <router-link
          :to="{ name: 'question.page', params: { page: 1 } }"
          class="bg-blue-100 rounded-md p-4 font-semibold text-blue-500"
          @click="questionStore.resetQuestions()"
        >
          Want to Retake?
        </router-link>
      </div>
    </div>
    <div v-else class="mt-10">
      <div class="text-2xl">Oops, questions aren't loaded yet!</div>
    </div>
  </div>
</template>
