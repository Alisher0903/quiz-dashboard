//category all
import { CategoryList } from '../../types/category.ts';
import axios from 'axios';
import { category_admin, category_all } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import toast from 'react-hot-toast';
import React from 'react';

export const getAdminCategory = async (setData: (val: null | CategoryList[]) => void) => {
  try {
    const { data } = await axios.get(category_admin, config);
    if (data.success) {
      console.clear();
      setData(data.body);
    }
    else {
      console.clear();
      setData(null);
    }
  } catch {
    console.clear();
    setData(null);
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
        console.clear();
        setLoading(false);
        resultData(true);
        toast.success(edit ? 'Категорияни таҳрирлаш муваффақиятли амалга оширилди' : 'Категория муваффақиятли сақланди');
      } else {
        console.clear();
        setLoading(false);
        toast.error(edit ? 'Категорияни таҳрирлашда хатолик юз берди' : 'Категория қўшишда хатолик юз берди');
      }
    }
  } catch {
    setLoading(false);
    toast.error(edit ? 'Категорияни таҳрирлашда хатолик юз берди' : 'Категория қўшишда хатолик юз берди');
    console.clear();
  }
};

// delete category
export const deleteCategory = async (idIn: string | number, seLoading: (val: boolean) => void, setResData: (val: boolean) => void) => {
  seLoading(true);
  try {
    if (idIn) {
      const { data } = await axios.delete(`${category_all}/${idIn}`, config);
      if (data.success) {
        console.clear();
        seLoading(false);
        setResData(true);
        toast.success('Категория муваффақиятли ўчирилди');
      } else {
        console.clear();
        seLoading(false);
        toast.error('Категорияни ўчиришда хатолик юз берди');
      }
    }
  } catch {
    seLoading(false);
    toast.error('Категорияни ўчиришда хатолик юз берди');
    console.clear();
  }
};
