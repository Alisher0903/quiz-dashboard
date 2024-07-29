import { create } from 'zustand';
import { Admin, AdminData, AdminDataList } from '../../types/admin.ts';

const adminStore = create<Admin>((set) => ({
  addData: {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  },
  setAddData: (val: AdminData) => set({ addData: val }),
  getAdminList: null,
  setGetAdminList: (val: AdminDataList[] | null) => set({ getAdminList: val })
}));

export default adminStore;