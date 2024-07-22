import axios from 'axios';
import { statistics_card, statistics_categoryBy } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import { DashboardListStatisticCards } from '../../types/dashboard.ts';

export const getAdminDashboardStatistic = async (setData: (val: null) => void, idIn: string | number) => {
  try {
    if (idIn) {
      const { data } = await axios.get(`${statistics_categoryBy}${idIn}`, config);
      if (data.success) setData(data.body.body);
      else setData(null);
    }
  } catch (err) {
    console.error(err);
    setData(null);
  }
};

export const getAdminDashboardStatisticCard = async (setData: (val: null | DashboardListStatisticCards) => void) => {
  try {
    const { data } = await axios.get(statistics_card, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch (err) {
    console.error(err);
    setData(null);
  }
};
