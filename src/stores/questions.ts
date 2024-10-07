import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchQuestions } from '@/services/QuestionAPI'

import type { FormStructure, Page, Question } from '@/services/QuestionAPI'

type menuItem = {
  label: string;
  routeTo: {
    name: string;
    params?: { page: number; }
  }
};

export const useQuestionStore = defineStore('question', () => {
  const isLoading = ref(false)
  const allQuestions = ref<FormStructure | null>(null)
  const totalPages = ref(0)
  const answers = ref<Record<string, any>>({})

  const menuItems = computed(() => {
    const items: menuItem[] = (allQuestions.value?.pages ?? []).map(page => {
      return { label: page.pageName, routeTo: { name: 'question.page', params: { page: page.pageNumber } } }
    })
    items?.unshift({ label: 'Start Over', routeTo: { name: 'start' } as { name: string; params?: never } })
    items?.push({ label: 'Show Results', routeTo: { name: 'question.review' } })
    return items
  })

  function resetQuestions() {
    Object.keys(answers.value).forEach(key => {
      let value = answers.value[key];

      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          answers.value[key] = [];
        } else {
          answers.value[key] = {};
        }
      } else {
        answers.value[key] = "";
      }
    });
  }

  async function loadQuestions(): Promise<void> {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      allQuestions.value = await fetchQuestions();
      totalPages.value = allQuestions.value.pages.length
      await generateAnswerModel()

    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      isLoading.value = false;
    }
  }

  function generateAnswerModel(): Promise<void> {
    return new Promise((resolve) => {
      if (allQuestions.value) {
        allQuestions.value.pages.forEach((page: Page) => {
          page.questions.forEach((question: Question) => {
            if (question.type === 'checkbox') {
              answers.value[question.id] = []
            } else {
              answers.value[question.id] = ''
            }
          })
        })
      }
      resolve()
    })
  }

  async function loadPage({
    pageNumber,
    retryAttempts = 5,
    delay = 150 }: {
      pageNumber: number;
      retryAttempts?: number;
      delay?: number;
    }): Promise<Question[]> {
    if (allQuestions.value) {
      const page = allQuestions.value.pages.find((p) => p.pageNumber === pageNumber);
      if (page) {
        return page.questions;
      } else {
        console.error(`Page ${pageNumber} is not found.`);
        return []
      }
    } else {
      if (retryAttempts > 0) {
        console.warn('Questions are not loaded yet. Retrying...');
        await new Promise(resolve => setTimeout(resolve, delay));
        await loadQuestions();
        return await loadPage({ pageNumber, retryAttempts: retryAttempts - 1, delay });
      } else {
        console.error('Questions are still not loaded after retries.');
        return []
      }
    }
  }

  return { allQuestions, totalPages, answers, menuItems, loadQuestions, loadPage, resetQuestions }
})
