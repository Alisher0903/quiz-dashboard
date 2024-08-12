import { consoleClear } from '../console-clear/console-clear.tsx';
import axios from 'axios';
import { config } from '../api/token.tsx';
import { result_archive, result_status_edit } from '../api/api.tsx';
import toast from 'react-hot-toast';

// result archive
export const UserResultArchive = async ({ setData, setLoading, resultID }: {
  setData: (val: any[] | null) => void,
  setLoading: (val: boolean) => void,
  resultID: string
}) => {

  setLoading(true);
  try {
    const { data } = await axios.get(`${result_archive}${resultID}`, config);
    if (data.success) {
      setData(data.body);
      setLoading(false);
    } else {
      setData(null);
      setLoading(false);
    }
  } catch (err) {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};

//result edit status
export const statusUpdate = async ({ status, ball, resultID, getUser, close }: {
  status: string,
  ball?: string,
  resultID: string | number,
  getUser: () => void,
  close: () => void,
}) => {
  try {
    const { data } = await axios.put(`${result_status_edit}${resultID}?status=${status}${status === 'APPROVED' ? `&practicalScore=${ball}` : ''}`, '', config);
    if (data.success) {
      getUser();
      toast.success(`${status === 'APPROVED' ? 'Натижани муваффақиятли тасдиқладингиз' : 'Натижани бекор қилдингиз'}`);
      close();
    } else {
      getUser();
      close();
      toast.success(`Нимадур хатолик юз берди`);
    }
  } catch (err) {
    close();
    consoleClear();
  }
};