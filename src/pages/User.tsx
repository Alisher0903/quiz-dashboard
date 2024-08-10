import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { BiShow } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { result_get_all, result_one_get } from '../common/api/api';
import { config } from '../common/api/token';
import GlobalModal from '../components/modal/modal.tsx';
import { Pagination } from 'antd';
import { consoleClear } from '../common/console-clear/console-clear.tsx';
import moment from 'moment';
import PendingLoader from '../common/Loader/pending-loader.tsx';

interface IUser {
  id: number;
  fullName: string;
  categoryName: string;
  phoneNumber: null | string;
  status: null | string;
  email?: string;
}

interface IUserDetails {
  id: null | string | number;
  firstName: string;
  lastName: string;
  categoryName: string;
  correctAnswers: number;
  countAnswers: number;
  extraResDtoList: UserDetailsItems[];
  durationTime: number;
  createdAt: string;
  status: null | string;
}

interface UserDetailsItems {
  categoryName: string;
  correctAnswer: number;
  countAnswer: number;
}

const thead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 2, name: 'Тўлиқ исм' },
  { id: 3, name: 'Категория' },
  { id: 4, name: 'Телефон' },
  { id: 5, name: 'Статус' },
  { id: 6, name: 'Ҳаракат' }
];

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${result_get_all}?page=${currentPage}&size=10`, config);
      setUsers(data.body.body);
      setTotalPages(data.body.totalElements);
      setLoading(false);
      consoleClear();
    } catch (error) {
      setLoading(false);
      consoleClear();
    }
  };

  const openModal = async (user: IUser) => {
    setIsModalOpen(true);

    try {
      const { data } = await axios.get(`${result_one_get}${user.id}`, config);
      setUserDetails(data.body);
      consoleClear();
    } catch (error) {
      consoleClear();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserDetails(null);
  };

  const onChange = (page: number): void => setCurrentPage(page - 1);

  return (
    <>
      <Breadcrumb pageName="Фойдаланувчи" />
      <UniversalTable thead={thead}>
        {loading ? (
          <tr>
            <td colSpan={thead.length} className="text-center py-5">
              Юкланмоқда...
            </td>
          </tr>
        ) : (
          users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{(currentPage * 10) + index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.fullName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.categoryName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phoneNumber}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`text-black dark:text-white`}>{user.status}</p>
                  {/*px-3 py-1.5 border-2 rounded-xl*/}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button onClick={() => openModal(user)}>
                      <BiShow className="text-2xl duration-300" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (<>
            <tr>
              <td colSpan={thead.length}
                  className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                Фойдаланувчи мавжуд эмас
              </td>
            </tr>
          </>)
        )}
      </UniversalTable>
      {totalPages > 0 && (
        <Pagination
          showSizeChanger={false}
          responsive={true}
          defaultCurrent={1}
          total={totalPages}
          onChange={onChange}
          rootClassName={`mt-10 mb-5`}
        />
      )}
      {userDetails ? (
        <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <h2 className="lg:text-4xl  text-center md:text-2xl py-5 font-semibold">Фойдаланувчи натижалари</h2>
            <div className="flex flex-col gap-3 md:text-xl lg:text-xl">
              <p className="flex justify-between">
                <strong>Тўлиқ исм:</strong>
                <div className="text-blue-400">{userDetails.firstName} {userDetails.lastName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Категория:</strong>
                <div className="text-blue-400">{userDetails.categoryName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Жавоблар:</strong>
                <div className="text-blue-400">{userDetails.countAnswers}</div>
              </p>
              <p className="flex justify-between">
                <strong>Тўғри Жавоблар:</strong>
                <div className="text-blue-400">{userDetails.correctAnswers}</div>
              </p>
              <p className="flex justify-between">
                <strong>Давомийлиги:</strong>
                <div className="text-blue-400">{userDetails.durationTime}</div>
              </p>
              <p className="flex justify-between">
                <strong>Ишланган вақти:</strong>
                <div className="text-blue-400">{moment(userDetails.createdAt.slice(0, 10)).format('DD/MM/YYYY')}</div>
              </p>
              <p className="flex justify-between">
                <strong>Статус:</strong>
                <div className="text-blue-400">{userDetails.status}</div>
              </p>
            </div>
            {userDetails && userDetails.extraResDtoList.length > 0 && (
              <div className={`border-t my-5`}>
                <h2 className="lg:text-3xl md:text-xl font-semibold mt-3 mb-2">
                  Қўшимча Категориялардан ишланганлар
                </h2>
                {userDetails && userDetails.extraResDtoList.map((item: any, index: number) => (
                  <div className={`flex justify-between items-center gap-5 mb-2`} key={index}>
                    <p className={`text-base`}>{item.categoryName}</p>
                    <p className={`font-bold`}><span
                      className={`text-green-400`}>{item.correctAnswer}</span> / {item.countAnswer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlobalModal>
      ) : (
        (isModalOpen && !userDetails) && <PendingLoader />)}
    </>
  );
};

export default User;
