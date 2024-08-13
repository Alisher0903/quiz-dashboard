import axios from 'axios';
import { get_certificate, get_certificate_id, statistics_card, statistics_card_all, statistics_client } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import { ClientDashboardStatisticsList, DashboardListStatistic, DashboardListStatisticCards } from '../../types/dashboard.ts';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const getClientDashboardStatistic = async (page: number, size: number, setClientData: (val: null | ClientDashboardStatisticsList[]) => void, setTotalPage: (val: number) => void, setIsLoading: (val: boolean) => void) => {
  setIsLoading(true)
  try {
    const { data } = await axios.get(`${statistics_client}?page=${page}&size=${size}`, config);
    if (data.success) {
      setClientData(data.body.body);
      setTotalPage(data.body.totalElements)
      setIsLoading(false)
    } else {
      setClientData(null);
      setIsLoading(false)
      consoleClear();
    }
  } catch {
    consoleClear();
    setIsLoading(false)
    setClientData(null);
  }
};

export const getClientCertificate = async (id: number, setIsLoading: (val: boolean) => void, setCertifcate: (val: any) => void) => {
  setIsLoading(true)
  try {
    const { data } = await axios.get(`${get_certificate_id}/${id}`, config);
    if (data.success) {
      const { data: certificateData } = await axios.get(`${get_certificate}/${data.body}`, config);
      if (certificateData.success) {
        setCertifcate(certificateData.body)
        setIsLoading(false)
      } else setIsLoading(false)
    } else {
      setIsLoading(false)
      consoleClear();
    }
  } catch {
    setIsLoading(false)
    consoleClear();
  }
};

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
