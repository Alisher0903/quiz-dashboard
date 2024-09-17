import React, { useEffect, useState } from 'react';
import { getMe } from '../../common/global-functions';
import ClientDashboardCard from '../../components/ClientDashboardCard';
import { getClientCertificate, getClientDashboardStatistic } from '../../common/logic-functions/dashboard';
import dashboardStore from '../../common/state-management/dashboardStore';
import { Pagination, Skeleton } from 'antd';
import { getCertificate } from '../../common/logic-functions/test';
import { ClientDashboardStatisticsList } from '../../types/dashboard.ts';

const ClientDashboard: React.FC = () => {
  const { clientstatistic, setClientStatistic } = dashboardStore();
  const [getMee, setGetMee] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: { certificate: boolean, email: boolean } }>({});

  useEffect(() => {
    getMe(setGetMee);
  }, []);

  useEffect(() => {
    getClientDashboardStatistic(currentPage, setClientStatistic, setTotalPage, setIsLoading);
  }, [currentPage, setClientStatistic]);

  const handleUploadCertificate = async (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], certificate: true } }));
    await getClientCertificate(id, setLoadingStates);
  };

  const handleEmailClick = async (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], email: true } }));
    await getCertificate(id, setLoadingStates);
  };

  const onPageChange = (page: number): void => setCurrentPage(page - 1);

  return (
    <>
      <div>
        <div>
          <p className="text-center text-red-600 dark:text-blue-600 text-3xl font-bold">Сизнинг натижаларингиз</p>
          <p className="text-black dark:text-white text-xl font-bold mt-3">
            {getMee?.fullName || 'Меҳмон'}
          </p>
        </div>
        {isLoading ? <Skeleton />
          : clientstatistic ?
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {clientstatistic.map((item: ClientDashboardStatisticsList | any, index: number) => (
                  <ClientDashboardCard
                    data={item}
                    isLoading={loadingStates[item.id]?.certificate || false}
                    isEmailLoading={loadingStates[item.id]?.email || false}
                    onEmailClick={() => handleEmailClick(item.id)}
                    onWebClick={() => handleUploadCertificate(item.id)}
                    key={index}
                  />
                ))}
              </div>
            </div>
            : <div className="flex h-[67vh] justify-center items-center">
              <p className="text-xl">Натижалар топилмади</p>
            </div>
        }
        {totalPage > 0 && (
          <Pagination
            showSizeChanger={false}
            responsive={true}
            defaultCurrent={1}
            total={totalPage}
            onChange={onPageChange}
            rootClassName={`mt-10 mb-5`}
          />
        )}
      </div>
    </>
  );
};

export default ClientDashboard;
