export interface Admin {
  addData: AdminData;
  setAddData: (val: AdminData) => void;
  getAdminList: null | AdminDataList[];
  setGetAdminList: (val: AdminDataList[] | null) => void;
}

export interface AdminData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface AdminDataList {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}