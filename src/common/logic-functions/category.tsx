//category all
import { CategoryList } from '../../types/category.ts';
import axios from 'axios';
import { category_admin, category_all } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import toast from 'react-hot-toast';

export const getAdminCategory = async (setData: (val: null | CategoryList[]) => void) => {
  try {
    const { data } = await axios.get(category_admin, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch (err) {
    console.error(err);
    setData(null);
  }
};

// add category
export const addCategory = async (addData: CategoryList | null, resultData: (val: boolean) => void, setLoading: (val: boolean) => void) => {
  setLoading(true);
  try {
    if (addData) {
      const { data } = await axios.post(category_all, addData, config);
      if (data.success) {
        setLoading(false);
        resultData(true);
        toast.success('Successfully category saved');
      } else {
        setLoading(false);
        toast.error('Error adding category');
      }
    }
  } catch (err) {
    setLoading(false);
    toast.error('Error adding category');
    console.error(err);
  }
};
