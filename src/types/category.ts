export interface Category {
  categoryData: null | CategoryList[]
  setCategoryData: (val: null | CategoryList[]) => void
}

export interface CategoryList {
  id: number
  name: string
  description: string
  questionCount: number
  extraQuestionCount: number
  durationTime: number
  retakeDate: number
}