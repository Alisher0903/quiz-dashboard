import { create } from 'zustand';
import { Test } from '../../types/tes.ts';

const testStore = create<Test>((set) => ({}));

export default testStore;