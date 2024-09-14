import axios from 'axios';
import { config } from '../api/token';
import { consoleClear } from '../console-clear/console-clear';
import { district_all, region_all } from '../api/api';
import { DistricsType, RegionsType } from '../../types/address';
import toast from 'react-hot-toast';

export const getRegionsPage = async (setRegions: (val: RegionsType[]) => void, page: number, setTotalElement: (val: number) => void, setIsLoading: (val: boolean) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(region_all + `/getAllRegionPage?page=${page}&size=10`, config);
    if (data.success) {
      setTotalElement(data.body.totalElements);
      setRegions(data.body.body);
    } else setRegions([]);
  } catch {
    setRegions([]);
  } finally {
    setIsLoading(false);
    consoleClear();
  }
};

export const getDistrictPage = async (setDistricts: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, page: number, setTotalElement: (val: number) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(district_all + `/getAllDistrictPage?page=${page}&size=10`, config);
    if (data.success) {
      setTotalElement(data.body.totalElements);
      setDistricts(data.body.body);
    } else setDistricts([]);
  } catch {
    setDistricts([]);
  } finally {
    setIsLoading(false);
    consoleClear();
  }
};

export const addRegion = async (setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void, name: string, toggleDistrictModal: () => void, page: number, setTotalRegions: (val: number) => void) => {
  if (!name.trim()) {
    toast.error('Исм бўш бўлиши мумкин эмас');
    return;
  }

  setIsLoading(true);
  try {
    const { data } = await axios.post(region_all, { name }, config);
    if (data.success) {
      await getRegionsPage(setRegions, page, setTotalRegions, setIsLoading);
      toast.success('Вилоят муваффақиятли қўшилди');
      toggleDistrictModal();
    } else setIsLoading(false);
  } catch {
  } finally {
    setIsLoading(false);
    consoleClear();
  }
};

export const addDistrict = async (name: string, regionId: number, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleDistrictModal: () => void, page: number, totalElement: (val: number) => void) => {
  if (!name.trim() && !regionId) {
    toast.error('Исм ва вилоятни киритинг');
    return;
  }

  setIsLoading(true);
  try {
    const { data } = await axios.post(district_all, { name, regionId }, config);
    if (data.success) {
      await getDistrictPage(setDistrics, setIsLoading, page, totalElement);
      toast.success('Туман муваффақиятли қўшилди');
      toggleDistrictModal();
    }
  } catch {
  } finally {
    setIsLoading(false);
    consoleClear();
  }
};

export const deleteRegion = async (id: number, setRegions: (val: RegionsType[]) => void, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleDeleteRegionModal: () => void, page: number, setTotalRegions: (val: number) => void, pageDistrict: number, totalElementDistrict: (val: number) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.delete(`${region_all}/${id}`, config);
    if (data.success) {
      await getRegionsPage(setRegions, page, setTotalRegions, setIsLoading);
      await getDistrictPage(setDistrics, setIsLoading, pageDistrict, totalElementDistrict);
      toast.success('Вилоят муваффақиятли ўчирилди');
      toggleDeleteRegionModal();
    } else {
      setIsLoading(false);
      consoleClear();
    }
  } catch {
    setIsLoading(false);
    consoleClear();
  }
};

export const deleteDistrict = async (id: number, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleDeleteRegionModal: () => void, pageDistrict: number, totalElementDistrict: (v: number) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.delete(`${district_all}/${id}`, config);
    if (data.success) {
      await getDistrictPage(setDistrics, setIsLoading, pageDistrict, totalElementDistrict);
      toggleDeleteRegionModal();
      toast.success('Туман муваффақиятли ўчирилди');
    } else {
      setIsLoading(false);
      consoleClear();
    }
  } catch {
    setIsLoading(false);
    consoleClear();
  }
};

export const updateRegion = async (id: number, name: string, setRegions: (val: RegionsType[]) => void, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleEditRegionModal: () => void, page: number, setTotalRegions: (val: number) => void, pageDistrict: number, totalElementDistrict: (v: number) => void) => {
  if (!name.trim()) {
    toast.error('Исм бўш бўлиши мумкин эмас');
    return;
  }

  setIsLoading(true);
  try {
    const { data } = await axios.put(`${region_all}/${id}`, { name }, config);
    if (data.success) {
      await getRegionsPage(setRegions, page, setTotalRegions, setIsLoading);
      await getDistrictPage(setDistrics, setIsLoading, pageDistrict, totalElementDistrict);
      toast.success('Вилоят номи муваффақиятли таҳрирланди');
      toggleEditRegionModal();
    } else {
      setIsLoading(false);
      consoleClear();
    }
  } catch {
    setIsLoading(false);
    consoleClear();
  }
};

export const updateDistrict = async (id: number, name: string, regionId: number, setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void, toggleEditDistrictModal: () => void, pageDistrict: number, totalElementDistrict: (v: number) => void) => {
  if (!name.trim() && !regionId) {
    toast.error('Исм ва вилоятни киритинг');
    return;
  }

  setIsLoading(true);
  try {
    const { data } = await axios.put(district_all, { id, name, regionId }, config);
    if (data.success) {
      await getDistrictPage(setDistrics, setIsLoading, pageDistrict, totalElementDistrict);
      toast.success('Туман номи муваффақиятли таҳрирланди');
      toggleEditDistrictModal();
    } else {
      setIsLoading(false);
      consoleClear();
    }
  } catch {
    setIsLoading(false);
    consoleClear();
  }
};