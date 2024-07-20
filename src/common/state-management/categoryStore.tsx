import { create } from 'zustand';
import { Category, CategoryList } from '../../types/category.ts';

const categoryStore = create<Category>((set) => ({
  categoryData: null,
  setCategoryData: (val: null | CategoryList[]) => set({categoryData: val}),
  addValue: {
    id: 0,
    name: '',
    description: '',
    questionCount: 0,
    extraQuestionCount: 0,
    durationTime: 0,
    retakeDate: 0,
  },
  setAddValue: (val: null | CategoryList) => set({addValue: val}),
}));

export default categoryStore;