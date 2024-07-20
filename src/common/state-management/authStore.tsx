import { create } from 'zustand';
import { Auth } from '../../types/auth.ts';

const authStore = create<Auth>((set) => ({
  email: '',
  setEmail: (val: string) => set({email: val}),
  password: '',
  setPassword: (val: string) => set({password: val}),
}));

export default authStore;