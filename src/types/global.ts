export interface Global {
  region: any[] | null;
  setRegion: (region: any[] | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  resData: boolean;
  setResData: (data: boolean) => void;
  selectVal: string;
  setSelectVal: (val: string) => void;
  getMeData: null | any;
  setGetMeData: (data: any | null) => void;
  imgUpload: any
  setImgUpload: (val: any) => void;
  passwordShow: boolean
  setPasswordShow: (val: boolean) => void;
}