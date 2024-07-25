import axios from 'axios';
import { getMeUrl } from '../api/api.tsx';
import { config } from '../api/token.tsx';

export const getMe = async (setData: (val: any) => void) => {
  try {
    const { data } = await axios.get(getMeUrl, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch {
    setData(null);
  }
};