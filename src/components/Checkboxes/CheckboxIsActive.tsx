import { consoleClear } from '../../common/console-clear/console-clear.tsx';
import axios from 'axios';
import { config } from '../../common/api/token.tsx';
import { user_test_active } from '../../common/api/api.tsx';
import toast from 'react-hot-toast';

const CheckboxIsActive = ({ id, isChecked, setResData }: {
  id: string,
  isChecked: boolean,
  setResData: (val: boolean) => void
}) => {

  const isCheck = async () => {
    try {
      const { data } = await axios.put(`${user_test_active}${id}`, '', config);
      if (data.success) {
        setResData(true);
        if (data.body) toast.success('Сиз бу фойдаланувчига тест ишлашга рухсат бердингиз');
        else toast.success('Фойдаланувчини тест ечиш ҳуқуқини олиб қуйдингиз');
      } else setResData(false);
    } catch (err) {
      consoleClear();
      setResData(false);
    }
  };

  return (
    <div>
      <label
        htmlFor={id} // 'checkboxLabelTwo' ni id bilan almashtirdim
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            checked={isChecked} // checked holatini isChecked orqali boshqarish
            onChange={isCheck} // onClick o'rniga onChange ishlatildi
            className="sr-only"
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span className={`opacity-0 ${isChecked && '!opacity-100'}`}>
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                  fill="#3056D3"
                  stroke="#3056D3"
                  strokeWidth="0.4"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default CheckboxIsActive;
