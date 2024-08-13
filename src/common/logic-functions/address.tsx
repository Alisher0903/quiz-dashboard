import axios from "axios";
import { config } from "../api/token";
import { consoleClear } from "../console-clear/console-clear";
import { district_all, region_all } from "../api/api";
import { DistricsType, RegionsType } from "../../types/address";

export const getRegions = async (setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get(region_all, config);
        if (data.success) {
            setRegions(data.body);
            setIsLoading(false);
            consoleClear();
        } else {
            setRegions([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setRegions([]);
        setIsLoading(false);
        consoleClear();
    }
};

export const getDistrics = async (setDistrics: (val: DistricsType[]) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.get(district_all, config);
        if (data.success) {
            setDistrics(data.body);
            setIsLoading(false);
            consoleClear();
        } else {
            setDistrics([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setDistrics([]);
        setIsLoading(false);
        consoleClear();
    }
};

export const addRegion = async (setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void, name: string, toggleDistrictModal: () => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.post(region_all, { name }, config);
        if (data.success) {
            getRegions(setRegions, setIsLoading)
            consoleClear();
            toggleDistrictModal()
        } else {
            setRegions([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setRegions([]);
        setIsLoading(false);
        consoleClear();
    }
};

export const deleteRegion = async (id: number, setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void, toggleDeleteRegionModal: () => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.delete(`${region_all}/${id}`, config);
        if (data.success) {
            getRegions(setRegions, setIsLoading)
            consoleClear();
            toggleDeleteRegionModal()
        } else {
            setRegions([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setRegions([]);
        setIsLoading(false);
        consoleClear();
    }
};

export const updateRegion = async (id: number, name: string, setRegions: (val: RegionsType[]) => void, setIsLoading: (val: boolean) => void, toggleEditRegionModal: () => void) => {
    setIsLoading(true);
    try {
        const { data } = await axios.put(`${region_all}/${id}`, { name }, config);
        if (data.success) {
            getRegions(setRegions, setIsLoading)
            consoleClear();
            toggleEditRegionModal()
        } else {
            setRegions([]);
            setIsLoading(false);
            consoleClear();
        }
    } catch {
        setRegions([]);
        setIsLoading(false);
        consoleClear();
    }
};