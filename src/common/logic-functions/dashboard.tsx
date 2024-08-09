import axios from 'axios';
import { statistics_card, statistics_card_all } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import { DashboardListStatistic, DashboardListStatisticCards } from '../../types/dashboard.ts';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const getAdminDashboardStatisticCard = async (setData: (val: null | DashboardListStatisticCards) => void) => {
  try {
    const { data } = await axios.get(statistics_card, config);
    if (data.success) setData(data.body);
    else {
      setData(null);
      consoleClear();
    }
  } catch {
    consoleClear();
    setData(null);
  }
};

export const getAdminDashboardStatisticAll = async (setData: (val: null | DashboardListStatistic[]) => void, page: number | string, setTotalPage: (val: any) => void, regionId?: string | number, categoryId?: string | number) => {
  try {
    const queryParams: string = [
      regionId ? `regionId=${regionId}` : '',
      categoryId ? `categoryId=${categoryId}` : ''
    ].filter(Boolean).join('&');
    const url: string = `${statistics_card_all}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;

    const { data } = await axios.get(url, config);
    if (data.success) {
      setData(data.body.body);
      setTotalPage(data.body.totalElements);
    } else {
      consoleClear();
      setData(null);
    }
  } catch {
    consoleClear();
    setData(null);
  }
};
