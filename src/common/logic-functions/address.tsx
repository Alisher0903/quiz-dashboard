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