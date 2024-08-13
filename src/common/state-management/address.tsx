import { create } from 'zustand';
import { AddressStoreTypes, DistricsType, RegionsType } from '../../types/address';

const useAddressStore = create<AddressStoreTypes>((set) => ({
    regions: [],
    setRegions: (val: RegionsType[]) => set({ regions: val }),
    districs: [],
    setDistrics: (val: DistricsType[]) => set({ districs: val }),
    isRegionModal: false,
    setIsRegionModal: (val: boolean) => set({ isRegionModal: val }),
    isDeleteRegionModal: false,
    setIsDeleteRegionModal: (val: boolean) => set({ isDeleteRegionModal: val }),
    isEditRegionModal: false,
    setIsEditRegionModal: (val: boolean) => set({ isEditRegionModal: val }),
    isDistrictModal: false,
    setIsDistrictModal: (val: boolean) => set({ isDistrictModal: val }),
    regionName: '',
    setRegionName: (val: string) => set({ regionName: val }),
    id: 0,
    setId: (val: number) => set({ id: val }),
}));

export default useAddressStore;