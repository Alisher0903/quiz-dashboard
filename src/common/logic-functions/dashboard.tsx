import axios from 'axios';
import { statistics_card, statistics_card_all, statistics_categoryBy } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import { DashboardListStatistic, DashboardListStatisticCards } from '../../types/dashboard.ts';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const getAdminDashboardStatistic = async (setData: (val: null) => void, idIn: string | number, page: number | string, setTotalPage: (val: any) => void) => {
  try {
    if (idIn) {
      const { data } = await axios.get(`${statistics_categoryBy}${idIn}?page=${page}&size=10`, config);
      if (data.success) {
        consoleClear();
        setData(data.body.body);
        setTotalPage(data.body.totalElements)
      } else {
        consoleClear();
        setData(null);
      }
    }
  } catch {
    consoleClear();
    setData(null);
  }
};

export const getAdminDashboardStatisticCard = async (setData: (val: null | DashboardListStatisticCards) => void) => {
  try {
    const { data } = await axios.get(statistics_card, config);
    if (data.success) setData(data.body);
    else {
      setData(null);
      consoleClear()
    }
  } catch {
    consoleClear();
    setData(null);
  }
};

export const getAdminDashboardStatisticAll = async (setData: (val: null | DashboardListStatistic[]) => void, page: number | string, setTotalPage: (val: any) => void) => {
  try {
    const { data } = await axios.get(`${statistics_card_all}?page=${page}&size=10`, config);
    if (data.success) {
      setData(data.body.body);
      setTotalPage(data.body.totalElements)
    } else {
      consoleClear();
      setData(null);
    }
  } catch {
    consoleClear();
    setData(null);
  }
};
