import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { BiShow } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { result_get_all, result_get_by_id } from '../common/api/api';
import { config } from '../common/api/token';
import GlobalModal from '../components/modal/modal.tsx';
import { Pagination } from 'antd';

interface IUser {
  id: number;
  fullName: string;
  categoryName: string;
  email: string;
}

interface IUserDetails {
  firstName: string;
  categoryName: string;
  correctAnswers: number;
  countAnswers: number;
  durationTime: string;
}

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const pageSize = 10; // Items per page

  const thead: IThead[] = [
    { id: 1, name: 'T/r' },
    { id: 2, name: 'Full Name' },
    { id: 3, name: 'Category' },
    { id: 4, name: 'Phone' },
    { id: 5, name: 'Action' }
  ];

  const openModal = async (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);

    try {
      const { data } = await axios.get(`${result_get_by_id}${user.id}`, config);
      setUserDetails(data.body);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserDetails(null);
  };

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${result_get_all}?page=${page}&size=10`, config);
      setUsers(data.body.body);
      setTotalPages(data.body.totalPages || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, []);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <>
      <Breadcrumb pageName="User" />
      <UniversalTable thead={thead}>
        {loading ? (
          <tr>
            <td colSpan={thead.length} className="text-center py-5">
              Loading...
            </td>
          </tr>
        ) : (
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
                <p className="text-black dark:text-white">{user.email}</p>
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
        )}
      </UniversalTable>
      <Pagination
        className="mt-3"
        current={currentPage}
        total={totalPages + pageSize} // Calculate total number of items
        onChange={(page) => setCurrentPage(page)}
        pageSize={pageSize} // Set items per page
      />
      {userDetails ? (
        <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
          {selectedUser && userDetails && (
            <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
              <h2 className="lg:text-4xl  text-center md:text-2xl py-5 font-semibold">User Results</h2>
              <div className="flex flex-col gap-3 md:text-xl lg:text-xl">
                <p className="flex justify-between">
                  <strong>Full Name:</strong>
                  <div className="text-blue-400">{userDetails.firstName}</div>
                </p>
                <p className="flex justify-between">
                  <strong>Category:</strong>
                  <div className="text-blue-400">{userDetails.categoryName}</div>
                </p>
                <p className="flex justify-between">
                  <strong>Correct Answers:</strong>
                  <div className="text-blue-400">{userDetails.correctAnswers}</div>
                </p>
                <p className="flex justify-between">
                  <strong>Count:</strong>
                  <div className="text-blue-400">{userDetails.countAnswers}</div>
                </p>
                <p className="flex justify-between">
                  <strong>Duration:</strong>
                  <div className="text-blue-400">{userDetails.durationTime}</div>
                </p>
              </div>
              {userDetails && userDetails.extraResDtoList.length > 0 && (
                <div className={`border-t my-5`}>
                  <h2 className="lg:text-4xl md:text-2xl font-semibold mt-3 mb-2">
                    Additional categories are processed questions
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
          )}
        </GlobalModal>
      ) : (
        isModalOpen && (
          <div className="flex h-screen items-center justify-center">
            <div
              className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          </div>
        ))}
    </>
  );
};

export default User;
