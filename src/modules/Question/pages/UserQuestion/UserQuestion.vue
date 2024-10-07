<script lang="ts" setup>
import BInput from '@/components/base/BInput.vue'
import BDatePicker from '@/components/base/BDatePicker.vue'
import BRadioGroup from '@/components/base/BRadioGroup.vue'
import BCheckboxGroup from '@/components/base/BCheckboxGroup.vue'
import BTextarea from '@/components/base/BTextarea.vue'
import { useQuestionStore } from '@/stores/questions'
import { computed, DefineComponent, onMounted, ref, watch } from 'vue'
import { Question } from '@/services/QuestionAPI'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

interface Props {
  page: string | Number
}
const props = defineProps<Props>()

const pageQuestions = ref<Question[]>([])
const questionStore = useQuestionStore()
const userStore = useUserStore()

const $router = useRouter()

type ComponentMap = {
  [key: string]: DefineComponent<any, any, any>
}
const componentMap: ComponentMap = {
  BInput,
  BDatePicker,
  BRadioGroup,
  BCheckboxGroup,
  BTextarea
}

onMounted(async () => {
  populateQuestions()
})

async function populateQuestions() {
  pageQuestions.value = await questionStore.loadPage({
    pageNumber: Number(props.page)
  })
}

const { answers } = storeToRefs(questionStore)
const totalPages = computed(() => Number(questionStore.totalPages))
const currentPage = computed(() => Number(props.page))
const lastPage = computed(() => currentPage.value >= totalPages.value)
const showPreviousButton = computed(() => currentPage.value !== 1)
const buttonText = computed(() => (lastPage.value ? 'Review Answers' : 'Next Page'))

const pageGreeting = computed(() => {
  const percentDone = Math.floor((currentPage.value / totalPages.value) * 100)
  if (percentDone <= 33) return `Just getting started, ${userStore.userName}.`
  if (percentDone > 33 && percentDone <= 67)
    return `More than 2/3 done, ${userStore.userName}. Keep it up!`
  if (percentDone >= 100) return `${userStore.userName}, you made it! Last page!`
})

const nextPage = () =>
  $router.push({ name: 'question.page', params: { page: Number(props.page) + 1 } })
const previousPage = () =>
  $router.push({ name: 'question.page', params: { page: Number(props.page) - 1 } })
const routeToSubmit = () => $router.push({ name: 'question.review' })

watch(currentPage, () => {
  populateQuestions()
})

function onEnter(el: Element, done: () => void) {
  const index = (el as HTMLElement).dataset.index
  const parsedIndex = index ? parseFloat(index) : 0
  gsap.fromTo(
    el,
    {
      opacity: 0,
      x: -100
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      delay: parsedIndex * 0.15,
      ease: 'ease-out',
      onComplete: done
    }
  )
}
function onLeave(el: Element, done: () => void) {
  const index = (el as HTMLElement).dataset.index
  const parsedIndex = index ? parseFloat(index) : 0
  gsap.to(el, {
    opacity: 0,
    height: 0,
    width: 0,
    delay: parsedIndex * 0.15,
    onComplete: done
  })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full md:w-3/4 mx-auto p-4">
    <div>
      <h5 class="text-2xl text-[#0B5C5E] mb-6 mt-10">{{ pageGreeting }}</h5>
      <TransitionGroup @enter="onEnter" @leave="onLeave" tag="div" class="w-full">
        <div v-for="(question, index) in pageQuestions" :key="question.id" :data-index="index">
          <div style="margin-bottom: 1.5rem">
            <label class="font-semibold pb-2">{{ question.label }}</label>
            <div>
              <component
                :is="componentMap[question.component]"
                :type="question.type"
                :label="question.label"
                :placeholder="question.placeholder"
                :name="question.id"
                :options="question.options"
                class="w-full"
                v-model="answers[question.id]"
              />
            </div>
          </div>
        </div>
      </TransitionGroup>
      <div class="grid grid-cols-2">
        <Transition name="slide-fade">
          <div>
            <button
              v-if="showPreviousButton"
              @click="previousPage()"
              class="button border p-3 text-gray-400 hover:text-gray-500"
            >
              <span class="">Previous Page</span>
            </button>
          </div>
        </Transition>
        <div>
          <button
            @click="lastPage ? routeToSubmit() : nextPage()"
            class="button button--cta col-start-2 border p-3 bg-green-400 text-green-800 hover:text-green-950"
          >
            <Transition name="slide-fade">
              <span class="font-semibold" :key="buttonText">
                {{ buttonText }}
              </span>
            </Transition>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
  position: absolute;
}
</style>
