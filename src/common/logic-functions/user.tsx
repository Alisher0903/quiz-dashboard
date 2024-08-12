import { consoleClear } from '../console-clear/console-clear.tsx';
import axios from 'axios';
import { config } from '../api/token.tsx';
import { result_archive } from '../api/api.tsx';

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