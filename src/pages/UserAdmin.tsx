import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { BiShow } from 'react-icons/bi';
import { useState } from 'react';
import GlobalModal from '../components/modal/modal.tsx';
import { Pagination } from 'antd';

const UserAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const thead: IThead[] = [
    { id: 1, name: 'Т/р' },
    { id: 2, name: 'Тўлиқ исм' },
    { id: 3, name: 'Категория' },
    { id: 4, name: 'Телефон' },
    { id: 5, name: 'Ҳаракат' }
  ];

  const openModal = async () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onChange = (page: number): void => setCurrentPage(page - 1);

  return (
    <>
      <Breadcrumb pageName="" />
      <UniversalTable thead={thead}>
        {/*{loading ? (*/}
        <tr>
          <td colSpan={thead.length} className="text-center py-5">
            Юкланмоқда...
          </td>
        </tr>
        {/*) : (*/}
        {/*  users.length > 0 ? (*/}
        {/*    users.map((_, index) => (*/}
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <h5 className="font-medium text-black dark:text-white">{(currentPage * 10) + 1}</h5>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">user.fullName</p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">user.categoryName</p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">user.email</p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button onClick={() => openModal()}>
                <BiShow className="text-2xl duration-300" />
              </button>
            </div>
          </td>
        </tr>
        {/*    ))*/}
        {/*  ) : (<>*/}
        {/*    <tr>*/}
        {/*      <td colSpan={5} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">*/}
        {/*        Фойдаланувчи мавжуд эмас*/}
        {/*      </td>*/}
        {/*    </tr>*/}
        {/*  </>)*/}
        {/*)}*/}
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
      <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
        <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
          <h2 className="lg:text-4xl  text-center md:text-2xl py-5 font-semibold">Фойдаланувчи натижалари</h2>
        </div>
      </GlobalModal>
    </>
  );
};

export default UserAdmin;
