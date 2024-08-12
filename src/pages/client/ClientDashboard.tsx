import React, { useEffect, useState } from 'react'
import { getMe } from '../../common/global-functions'
import ClientDashboardCard from '../../components/ClientDashboardCard'
import { getClientCertificate, getClientDashboardStatistic } from '../../common/logic-functions/dashboard'
import dashboardStore from '../../common/state-management/dashboardStore'
import { Pagination, Skeleton } from 'antd'

const ClientDashboard: React.FC = () => {
  const { clientstatistic, setClientStatistic } = dashboardStore()
  const [getMee, setGetMee] = useState<any>({})
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [certificate, setCertificate] = useState<any>(null); // State to hold the certificate data


  useEffect(() => {
    getMe(setGetMee)
  }, [])

  useEffect(() => {
    getClientDashboardStatistic(currentPage, pageSize, setClientStatistic, setTotalPage, setIsLoading)
  }, [pageSize, currentPage, setClientStatistic]);

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page - 1);
    setPageSize(pageSize);
  };

  const handleUploadCertificate = (id: number) => {
    getClientCertificate(id, setIsLoading, setCertificate);
  }

  console.log(certificate);
  


  return (
    <>
      <div>
        <div>
          <p className='text-center text-red-600 dark:text-blue-600 text-3xl font-bold'>Бу сизнинг натижаларингиз</p>
          <p className='text-black dark:text-white text-xl font-bold mt-3'>Ҳуш келибсиз, {getMee?.fullName || "Guest"}</p>
        </div>
        {isLoading ?
          <div>
            <Skeleton />
          </div>
          :
          clientstatistic ?
            <div className='mt-4'>
              <div className='flex gap-5 flex-wrap'>
                {clientstatistic.map((item, index) => (
                  <ClientDashboardCard
                    data={item}
                    onClick={() => handleUploadCertificate(item.id)}
                    key={index}
                  />
                ))}
              </div>
              <div className="mt-5">
                <Pagination
                  showSizeChanger
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalPage}
                  onChange={onPageChange}
                />
              </div>
            </div>
            :
            <div className='flex h-[67vh] justify-center items-center'>
              <p className='text-xl'>Жавоблар топилмади</p>
            </div>
        }
      </div>
    </>
  )
}

export default ClientDashboard