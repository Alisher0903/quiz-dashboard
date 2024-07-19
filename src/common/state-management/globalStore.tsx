import { create } from 'zustand';
import { Global } from '../../types/global.ts';

const globalStore = create<Global>((set) => ({
  region: null,
  setRegion: (val: any[] | null) => set({ region: val })
}));

export default globalStore;