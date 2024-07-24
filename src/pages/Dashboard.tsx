import React, { useEffect, useState } from 'react';
import CardDataStats from '../components/CardDataStats.tsx';
import ChartOne from '../components/Charts/ChartOne.tsx';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
// import Select from '../components/select/Select.tsx';
import {Select} from 'antd';
import { getAdminCategory } from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import {
  getAdminDashboardStatistic,
  getAdminDashboardStatisticAll,
  getAdminDashboardStatisticCard
} from '../common/logic-functions/dashboard.tsx';
import dashboardStore from '../common/state-management/dashboardStore.tsx';
import { BiCategory } from 'react-icons/bi';
import { FaCircleQuestion } from 'react-icons/fa6';
import { PiArrowsOutCardinal } from 'react-icons/pi';
import { FaUsers } from 'react-icons/fa';
import { Pagination } from 'antd';

const thead: IThead[] = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'First Name' },
  { id: 3, name: 'Last Name' },
  { id: 4, name: 'Category Name' },
  { id: 5, name: 'Correct Answers' }
];
const { Option } = Select;

const Dashboard: React.FC = () => {
  const { setCategoryData, categoryData } = categoryStore();
  const { statisticTable, setStatisticTable, statisticsCard, setStatisticsCard, page, setPage } = dashboardStore();
  const [totalPage, setTotalPage] = useState(0);
  const [categoryID, setCategoryID] = useState(null);

  useEffect(() => {
    getAdminCategory(setCategoryData);
    getAdminDashboardStatisticCard(setStatisticsCard);
    getAdminDashboardStatisticAll(setStatisticTable, page, setTotalPage);
  }, []);

  useEffect(() => {
    categoryID
      ? getAdminDashboardStatistic(setStatisticTable, categoryID, page, setTotalPage)
      : getAdminDashboardStatisticAll(setStatisticTable, page, setTotalPage);
  }, [page, categoryID]);

  const onChange = (page: number): void => setPage(page - 1);
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
        <div className={`w-full md:w-1/2 lg:max-w-[30%] mb-6`}>
          {categoryData && (
            <Select
              placeholder={`Select your subject`}
              value={categoryID}
              className={`w-full bg-transparent rounded-[10px] h-10`}
              allowClear
              onChange={(value) => setCategoryID(value)}
            >
              {categoryData.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          )}
        </div>
        <UniversalTable thead={thead}>
          {statisticTable ? (
            statisticTable.map((item, idx) => (
              <tr key={idx}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {(+page * 10) + idx + 1}
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
        {totalPage > 0 && (
          <Pagination
            showSizeChanger={false}
            responsive={true}
            defaultCurrent={1}
            total={totalPage}
            onChange={onChange}
            rootClassName={`mt-10 mb-5`}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
