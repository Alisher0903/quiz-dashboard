import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/CategoryCard'
import categoryStore from '../../common/state-management/categoryStore'
import { getClientCategory } from '../../common/logic-functions/category';
import { Skeleton } from 'antd';
import { MdOutlineNotStarted } from "react-icons/md";
import { getMe } from '../../common/global-functions';
import GlobalModal from '../../components/modal/modal';
import AddButtons from '../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';

const ClientQuizStart: React.FC = () => {
  const navigation = useNavigate();
  const { clientCategoryData, setClientCategoryData } = categoryStore();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [categoryId, setCategoryId] = useState('')
  const [getMee, setGetMee] = useState<any>({})

  useEffect(() => {
    getClientCategory(setClientCategoryData, setIsLoading);
  }, [setClientCategoryData])

  useEffect(() => {
    getMe(setGetMee)
  }, [setGetMee])

  console.log(categoryId);


  const toggleModal = () => setIsModal(!isModal)

  return (
    <>
      <div>
        <div>
          <p className='text-center text-red-600 dark:text-blue-600 text-3xl font-bold'>Ёналишлар</p>
          <p className='text-black dark:text-white text-xl font-bold'>Ҳуш келибсиз, {getMee && getMee.fullName}</p>
        </div>
        {isLoading ?
          <div>
            <Skeleton />
          </div> :
          clientCategoryData ? clientCategoryData.map((item) => (
            <div>
              <CategoryCard
                data={item}
                onClick={() => {
                  toggleModal();
                  setCategoryId(item.id)
                }}
              />
            </div>
          )) :
            <div className='flex h-[69vh] justify-center items-center'>
              <p className='text-xl'>Cатегориялар топилмади</p>
            </div>
        }
        <GlobalModal isOpen={isModal} onClose={toggleModal}>
          <div className='w-54 sm:w-64 md:w-96 lg:w-[40rem]'>
            <div className='flex flex-col justify-center items-center'>
              <MdOutlineNotStarted className='text-red-600 dark:text-blue-600' size={100} />
              <p className='text-center sm:text-[17px]'>Сиз аниқ буу тестни бошламоқчимисиз ?</p>
              <div className='flex gap-3 mt-4'>
                <AddButtons onClick={toggleModal}>Орқага</AddButtons>
                <AddButtons onClick={() => navigation(`/client/quiz/${categoryId}`)}>Бошлаш</AddButtons>
              </div>
            </div>
          </div>
        </GlobalModal>
      </div>
    </>
  )
}

export default ClientQuizStart