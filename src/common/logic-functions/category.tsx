//category all
import { CategoryList } from '../../types/category.ts';
import axios from 'axios';
import { category_admin } from '../api/api.tsx';
import { config } from '../api/token.tsx';

export const getAdminCategory = async (setData: (val: null | CategoryList[]) => void) => {
  try {
    const { data } = await axios.get(category_admin, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch (err) {
    console.error(err);
    setData(null)
  }
};
