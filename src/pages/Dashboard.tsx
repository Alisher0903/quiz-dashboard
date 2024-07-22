import React, { useEffect } from 'react';
import CardDataStats from '../components/CardDataStats.tsx';
import ChartOne from '../components/Charts/ChartOne.tsx';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import Select from '../components/select/Select.tsx';
import { getAdminCategory } from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import { getAdminDashboardStatistic, getAdminDashboardStatisticCard } from '../common/logic-functions/dashboard.tsx';
import dashboardStore from '../common/state-management/dashboardStore.tsx';
import { BiCategory } from 'react-icons/bi';
import { FaCircleQuestion, FaFileCircleQuestion } from 'react-icons/fa6';
import { PiArrowsOutCardinal } from 'react-icons/pi';
import { FaUsers } from 'react-icons/fa';

const thead: IThead[] = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'First Name' },
  { id: 3, name: 'Last Name' },
  { id: 4, name: 'Category Name' },
  { id: 5, name: 'Correct Answers' }
];

const Dashboard: React.FC = () => {
  const { setCategoryData, categoryData } = categoryStore();
  const { statisticTable, setStatisticTable, statisticsCard, setStatisticsCard } = dashboardStore();

  useEffect(() => {
    getAdminCategory(setCategoryData);
    getAdminDashboardStatisticCard(setStatisticsCard);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total category" total={`${statisticsCard ? statisticsCard.categoryCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <BiCategory className={`text-2xl`} />
          </div>
        </CardDataStats>
        <CardDataStats title="Total question" total={`${statisticsCard ? statisticsCard.questionCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <FaCircleQuestion className={`text-2xl`} />
          </div>
        </CardDataStats>
        <CardDataStats title="Total result" total={`${statisticsCard ? statisticsCard.resultCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <PiArrowsOutCardinal className={`text-2xl`} />
          </div>
        </CardDataStats>
        <CardDataStats title="Total Users" total={`${statisticsCard ? statisticsCard.userCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <FaUsers className={`text-2xl`} />
          </div>
        </CardDataStats>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <ChartOne />
      </div>
      <div className={`mt-4 md:mt-6 2xl:mt-7.5`}>
        <div className={`max-w-[30%] mb-6`}>
          {categoryData && (
            <Select
              onChange={e => getAdminDashboardStatistic(setStatisticTable, e.target.value)}
              defOption={`Select your subject`}
              child={categoryData.map(item => (
                <option value={item.id} className="text-body dark:text-bodydark" key={item.id}>
                  {item.name}
                </option>
              ))}
            />
          )}
        </div>
        <UniversalTable
          key={`category${1}`}
          thead={thead}
        >
          {statisticTable ? (
            statisticTable.map((item, idx) => (
              <tr key={idx}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {idx + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.firstName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.lastName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.categoryName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.correctAnswers}
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border-b border-[#eee] p-5 dark:border-strokedark text-center">
                Statistics not found
              </td>
            </tr>
          )}
        </UniversalTable>
      </div>
    </>
  );
};

export default Dashboard;
