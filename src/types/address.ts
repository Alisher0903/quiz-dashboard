export interface AddressStoreTypes {
    regions: RegionsType[];
    setRegions: (val: RegionsType[]) => void;
    districs: DistricsType[];
    setDistrics: (val: DistricsType[]) => void;
}

export interface DistricsType {
    id: number,
    name: string
    regionId: number,
}

export interface RegionsType {
    id: number,
    name: string
}