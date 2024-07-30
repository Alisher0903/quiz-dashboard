//category all
import { CategoryList } from '../../types/category.ts';
import axios from 'axios';
import { category_admin, category_all } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import toast from 'react-hot-toast';
import React from 'react';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const getAdminCategory = async (setData: (val: null | CategoryList[]) => void) => {
  try {
    const { data } = await axios.get(category_admin, config);
    if (data.success) {
      setData(data.body);
      consoleClear();
    }
    else {
      setData(null);
      consoleClear();
    }
  } catch {
    setData(null);
    consoleClear();
  }
};

// add or edit u/n category
export const addCategory = async (
  event: React.FormEvent<HTMLFormElement>,
  addData: CategoryList | null,
  resultData: (val: boolean) => void,
  setLoading: (val: boolean) => void,
  edit?: string | number
) => {
  event.preventDefault();
  setLoading(true);
  try {
    if (addData) {
      const { data } = edit ? await axios.put(category_all, addData, config) : await axios.post(category_all, addData, config);
      if (data.success) {
        consoleClear();
        setLoading(false);
        resultData(true);
        toast.success(edit ? 'Категорияни таҳрирлаш муваффақиятли амалга оширилди' : 'Категория муваффақиятли сақланди');
      } else {
        consoleClear();
        setLoading(false);
        toast.error(edit ? 'Категорияни таҳрирлашда хатолик юз берди' : 'Категория қўшишда хатолик юз берди');
      }
    }
  } catch (err: any) {
    setLoading(false);
    toast.error(edit ? 'Категорияни таҳрирлашда хатолик юз берди' : `${!err.response.data.success ? 'Асосий категория аллақачон мавжуд' : 'Категория қўшишда хатолик юз берди'}`);
    consoleClear();
  }
};

// delete category
export const deleteCategory = async (idIn: string | number, seLoading: (val: boolean) => void, setResData: (val: boolean) => void) => {
  seLoading(true);
  try {
    if (idIn) {
      const { data } = await axios.delete(`${category_all}/${idIn}`, config);
      if (data.success) {
        consoleClear();
        seLoading(false);
        setResData(true);
        toast.success('Категория муваффақиятли ўчирилди');
      } else {
        consoleClear();
        seLoading(false);
        toast.error('Категорияни ўчиришда хатолик юз берди');
      }
    }
  } catch {
    seLoading(false);
    toast.error('Категорияни ўчиришда хатолик юз берди');
    consoleClear();
  }
};
