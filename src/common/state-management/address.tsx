import { create } from 'zustand';
import { AddressStoreTypes, DistricsType, RegionsType } from '../../types/address';

const useAddressStore = create<AddressStoreTypes>((set) => ({
    regions: [],
    setRegions: (val: RegionsType[]) => set({ regions: val }),
    districs: [],
    setDistrics: (val: DistricsType[]) => set({ districs: val }),
}));

export default useAddressStore;