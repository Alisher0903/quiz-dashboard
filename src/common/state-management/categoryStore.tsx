import { create } from 'zustand';
import { Category, CategoryList } from '../../types/category.ts';

const categoryStore = create<Category>((set) => ({
  categoryData: null,
  setCategoryData: (val: null | CategoryList[]) => set({categoryData: val}),
  addValue: {
    id: 0,
    name: '',
    description: '',
    questionCount: '',
    extraQuestionCount: '',
    durationTime: '',
    retakeDate: '',
  },
  setAddValue: (val: null | CategoryList) => set({addValue: val}),
}));

export default categoryStore;