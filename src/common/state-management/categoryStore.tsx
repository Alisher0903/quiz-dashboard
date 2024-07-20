import { create } from 'zustand';
import { Category, CategoryList } from '../../types/category.ts';

const categoryStore = create<Category>((set) => ({
  categoryData: null,
  setCategoryData: (val: null | CategoryList[]) => set({categoryData: val})
}));

export default categoryStore;