import { create } from 'zustand';
import { Category, CategoryList } from '../../types/category.ts';

const categoryStore = create<Category>((set) => ({
  categoryData: null,
  setCategoryData: (val: null | CategoryList[]) => set({categoryData: val}),
  addValue: {
    name: '',
    description: '',
    questionCount: '',
    extraQuestionCount: '',
    durationTime: '',
    retakeDate: '',
    easyQuestionCount: '',
    mediumQuestionCount: '',
    hardQuestionCount: '',
    main: false
  },
  setAddValue: (val: null | CategoryList) => set({addValue: val}),
}));

export default categoryStore;