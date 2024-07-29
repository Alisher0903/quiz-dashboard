import React from 'react';
import { AdminData, AdminDataList } from '../../types/admin.ts';
import { consoleClear } from '../console-clear/console-clear.tsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { addAdmin, getAdminList } from '../api/api.tsx';
import { config } from '../api/token.tsx';

export const postAdmin = async (
  event: React.FormEvent<HTMLFormElement>,
  addData: AdminData,
  setLoading: (val: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);

  try {
    if (addData.password === addData.confirmPassword) {
      const { data } = await axios.post(addAdmin, addData, config);
      if (data.success) {
        setResData(true);
        setLoading(false);
        toast.success('Admin muvaffaqiyatli qushildi');
      } else {
        setLoading(false);
        toast.error('Nimadur xatolik yuz berdi, keyinroq qayta urinib kuring');
      }
    } else {
      setLoading(false);
      toast.error('Parollar mosligi tug\'ri kelmadi');
      consoleClear();
    }
  } catch {
    setLoading(false);
    toast.error('Bu email bazada mavjud boshqa email bilan urinib kuring');
    consoleClear();
  }
};

export const getAdminLists = async (setData: (val: AdminDataList[] | null) => void, setLoading: (val: boolean) => void) => {
  setLoading(true);
  try {
    const { data } = await axios.get(getAdminList, config);
    if (data.success) {
      setData(data.body);
      setLoading(false);
    } else {
      setLoading(false);
      setData(null);
      consoleClear()
    }
  } catch {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};