import axios from 'axios';
import {
  get_certificate,
  get_certificate_id,
  statistics_card,
  statistics_card_all,
  statistics_client
} from '../api/api.tsx';
import { config } from '../api/token.tsx';
import {
  ClientDashboardStatisticsList,
  DashboardListStatistic,
  DashboardListStatisticCards
} from '../../types/dashboard.ts';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const getClientDashboardStatistic = async (page: number, setClientData: (val: null | ClientDashboardStatisticsList[]) => void, setTotalPage: (val: number) => void, setIsLoading: (val: boolean) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(`${statistics_client}?page=${page}&size=10`, config);
    if (data.success) {
      setClientData(data.body.body);
      setTotalPage(data.body.totalElements);
      setIsLoading(false);
    } else {
      setClientData(null);
      setIsLoading(false);
      consoleClear();
    }
  } catch {
    consoleClear();
    setIsLoading(false);
    setClientData(null);
  }
};

export const downloadFile = async (url: string, name?: string) => {
  await axios.get(url, { ...config, responseType: 'blob' })
    .then((res) => {
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name ? name : 'Certificate.pdf'}`;
      document.body.appendChild(a);
      a.click();
      consoleClear();
    })
    .catch(() => consoleClear());
};

export const getClientCertificate = async (id: number, setIsLoading: (val: any) => void) => {
  setIsLoading((prev: any) => ({ ...prev, [id]: { ...prev[id], certificate: true } }));
  try {
    const { data } = await axios.get(`${get_certificate_id}/${id}`, config);
    if (data.success) await downloadFile(`${get_certificate}/${data.body}`)
  } catch {
    consoleClear();
  } finally {
    setIsLoading((prev: any) => ({ ...prev, [id]: { ...prev[id], certificate: false } }))
  }
};

export const getAdminDashboardStatisticCard = async (setData: (val: null | DashboardListStatisticCards) => void) => {
  try {
    const { data } = await axios.get(statistics_card, config);
    if (data.success) setData(data.body);
    else setData(null);
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
    } else setData(null);
  } catch {
    consoleClear();
    setData(null);
  }
};
