export interface Category {
  categoryData: null | CategoryList[]
  setCategoryData: (val: null | CategoryList[]) => void
  addValue: null | CategoryList
  setAddValue: (val: null | any) => void
}

export interface CategoryList {
  id: number
  name: string
  description: string
  questionCount: number | string
  extraQuestionCount: number | string
  durationTime: number | string
  retakeDate: number | string
}