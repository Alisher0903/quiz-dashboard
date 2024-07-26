import axios from 'axios';
import { getMeUrl } from '../api/api.tsx';
import { config } from '../api/token.tsx';

export const getMe = async (setData: (val: any) => void) => {
  try {
    const { data } = await axios.get(getMeUrl, config);
    if (data.success) {
      setData(data.body);
      console.clear();
    }
    else {
      setData(null);
      console.clear();
    }
  } catch {
    setData(null);
    console.clear();
  }
};