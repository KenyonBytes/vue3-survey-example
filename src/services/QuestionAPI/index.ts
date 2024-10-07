import questions from './questions.json'

export type Question = {
  id: string;
  type: 'text' | 'date' | 'radio' | 'checkbox' | 'textarea';
  label: string;
  placeholder: string;
  component: any;
  options?: string[];
}

export type Page = {
  pageNumber: number;
  pageName: string;
  questions: Question[];
}

export type FormStructure = {
  pages: Page[];
}

export function fetchQuestions(): Promise<FormStructure> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questions as FormStructure)
    }, 100)
  })
}
