import { create } from 'zustand';
import { Global } from '../../types/global.ts';

const globalStore = create<Global>((set) => ({
  region: null,
  setRegion: (val: any[] | null) => set({ region: val }),
  isLoading: false,
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  resData: false,
  setResData: (val: boolean) => set({ resData: val }),
  selectVal: '',
  setSelectVal: (val: string) => set({ selectVal: val }),
  getMeData: null,
  setGetMeData: (val: any | null) => set({ getMeData: val }),
  imgUpload: null,
  setImgUpload: (val: any) => set({ imgUpload: val }),
  passwordShow: false,
  setPasswordShow: (val: boolean) => set({ passwordShow: val }),
}));

export default globalStore;