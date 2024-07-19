import { create } from 'zustand';
import { Category } from '../../types/category.ts';

const categoryStore = create<Category>((set) => ({}));

export default categoryStore;