import React, { useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard';
import categoryStore from '../../common/state-management/categoryStore';
import { getClientCategory } from '../../common/logic-functions/category';
import { Pagination, Skeleton } from 'antd';
import { MdOutlineNotStarted } from 'react-icons/md';
import GlobalModal from '../../components/modal/modal';
import AddButtons from '../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';

const ClientQuizStart: React.FC = () => {
  const navigation = useNavigate();
  const { clientCategoryData, setClientCategoryData } = categoryStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<any>('');
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getClientCategory(pageSize, currentPage, setClientCategoryData, setTotalPage, setIsLoading);
  }, [pageSize, currentPage, setClientCategoryData]);

  const toggleModal = () => setIsModal(!isModal);
  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page - 1);
    setPageSize(pageSize);
  };

  return (
    <>
      <div>
        <div>
          <p className="text-center text-red-600 dark:text-blue-600 text-3xl font-bold mb-5">Йўналишлар</p>
          {/* <p className="text-black dark:text-white text-xl font-bold">Ҳуш келибсиз, {getMee && getMee.fullName}</p> */}
        </div>
        {isLoading ? <Skeleton /> :
          clientCategoryData?.length !== 0 ? <div>
            {clientCategoryData && clientCategoryData.map((item) => (
              <div key={item.id}>
                <CategoryCard
                  data={item}
                  onClick={() => {
                    toggleModal();
                    setCategoryId(item);
                  }}
                />
              </div>
            ))}
            <div className="mt-3">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalPage}
                onChange={onPageChange}
              />
            </div>
          </div> : <div className="flex h-[69vh] justify-center items-center">
            <p className="text-xl">Йўналишлар топилмади</p>
          </div>
        }
        <GlobalModal isOpen={isModal} onClose={toggleModal}>
          <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem]">
            <div className="flex flex-col justify-center items-center">
              <MdOutlineNotStarted className="text-red-600 dark:text-blue-600" size={100} />
              <p className="text-center sm:text-[17px]">Ҳақиқатдан ҳам <span className={`font-bold text-red-600`}>{categoryId.name}</span> йўналиш бўйича тест бошламоқчимисиз?</p>
              <div className="flex gap-3 mt-4">
                <AddButtons onClick={toggleModal}>Орқага</AddButtons>
                <AddButtons onClick={() => {
                  navigation(`/client/quiz/${categoryId.id}`);
                  localStorage.removeItem('remainingTime');
                }}>Бошлаш</AddButtons>
              </div>
            </div>
          </div>
        </GlobalModal>
      </div>
    </>
  );
};

export default ClientQuizStart;