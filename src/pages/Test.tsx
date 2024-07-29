import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import AddButtons from '../components/buttons/buttons.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import categoryStore from '../common/state-management/categoryStore.tsx';
import React, { useEffect, useState } from 'react';
import { getAdminCategory } from '../common/logic-functions/category.tsx';
import testStore from '../common/state-management/testStore.tsx';
import { adminTestCrud, allFilterOrGet } from '../common/logic-functions/test.tsx';
import TestCrudCheck from '../components/test-crud-check.tsx';
import GlobalModal from '../components/modal/modal.tsx';
import globalStore from '../common/state-management/globalStore.tsx';
import toast from 'react-hot-toast';
import ImageUpload from '../components/img-upload.tsx';
import { Pagination, Select } from 'antd';
import SelectForm from '../components/select/Select.tsx';
import { TestList } from '../types/test.ts';
import { consoleClear } from '../common/console-clear/console-clear.tsx';

const thead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 2, name: 'Савол' },
  { id: 3, name: 'Категория номи' },
  { id: 3, name: 'Тури' },
  { id: 3, name: 'Балл' },
  { id: 4, name: 'Ҳаракат' }
];
const { Option } = Select;

const Test = () => {
  const { categoryData, setCategoryData } = categoryStore();
  const { testList, setTestList, optionDto } = testStore();
  const { isLoading, setIsLoading, resData, setResData, imgUpload, setImgUpload } = globalStore();
  const [testType, setTestType] = useState('');
  const [editOrDeleteStatus, setEditOrDeleteStatus] = useState('');
  const [editOrDeleteID, serEditOrDeleteID] = useState<any>('');
  const [nameFilter, setNameFilter] = useState<any>('');
  const [categoryFilter, setCategoryFilter] = useState<any>('');
  const [typeFilter, setTypeFilter] = useState<any>('');
  const [defQuiz, setDefQuiz] = useState<any>('');
  const [page, setPage] = useState<number | string>(0);
  const [totalPage, setTotalPage] = useState(0);
  const [crudTest, setCrudTest] = useState<TestList | any>({
    name: '',
    categoryId: '',
    type: '',
    score: '',
    attachmentIds: [],
    optionDtos: optionDto,
    isMain: false
  });
  const [isModal, setIsModal] = useState(false);
  const defData = {
    name: '',
    categoryId: '',
    type: '',
    score: '',
    attachmentIds: [],
    optionDtos: null,
    isMain: false
  };

  useEffect(() => {
    getAdminCategory(setCategoryData);
    allFilterOrGet(setTestList, page, setTotalPage);
    consoleClear();
  }, []);

  useEffect(() => {
    allFilterOrGet(setTestList, page, setTotalPage);
    consoleClear()
  }, [page]);

  useEffect(() => {
    allFilterOrGet(setTestList, page, setTotalPage, nameFilter && nameFilter, categoryFilter && categoryFilter, typeFilter && typeFilter);
  }, [nameFilter, categoryFilter, typeFilter, page]);

  useEffect(() => {
    crudTest.isMain = testType === 'ANY_CORRECT' ? true : false;
    handleChange('optionDtos', optionDto);
    consoleClear();
  }, [optionDto]);

  useEffect(() => {
    imgUpload ? crudTest.attachmentIds = [`${imgUpload}`] : crudTest.attachmentIds = [];
  }, [imgUpload]);

  useEffect(() => {
    if (resData) {
      setResData(false);
      closeModal();
      allFilterOrGet(setTestList, page, setTotalPage);
    }
  }, [resData]);

  const openModal = () => setIsModal(true);

  const closeModal = () => {
    setIsModal(false);
    setCrudTest(defData);
    setTestType('');
    setEditOrDeleteStatus('');
    serEditOrDeleteID('');
    setDefQuiz('');
    setImgUpload(null);
  };

  const handleChange = (name: string, value: string | any) => {
    setCrudTest({
      ...crudTest, [name]: value
    });
  };

  const onChange = (page: number): void => setPage(page - 1);

  return (
    <>
      <Breadcrumb pageName="Тест" />

      <div className={`mb-5 w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5`}>
        <AddButtons
          onClick={() => {
            openModal();
            setEditOrDeleteStatus('post');
          }}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Қўшиш</p>
          </div>}
        />
        <div
          className={`w-full lg:max-w-[70%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}>
          <input
            onChange={e => setNameFilter(e.target.value)}
            placeholder="🔎  Қидирмоқ..."
            type={`search`}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark bg-white dark:text-form-input dark:focus:border-primary"
          />
          <Select
            placeholder={`Категория танлаш`}
            className={`w-full bg-transparent rounded-[10px] h-12`}
            allowClear
            onChange={(value) => setCategoryFilter(value)}
          >
            {categoryData && categoryData.map(item => (
              <Option value={item.id} key={item.id}>{item.name}</Option>
            ))}
          </Select>

          <Select
            placeholder={`Турни танланг`}
            className={`w-full bg-transparent rounded-[10px] h-12`}
            allowClear
            onChange={(value) => setTypeFilter(value)}
          >
            <Option value="SUM">Ҳисобланган натижа</Option>
            <Option value="ONE_CHOICE">Бир тўғри жавобли тест</Option>
            <Option value="MANY_CHOICE">Кўп тўғри жавобли тест</Option>
            <Option value="ANY_CORRECT">Ҳар қандай тўғри</Option>
          </Select>
        </div>
      </div>

      <UniversalTable thead={thead}>
        {testList ? (
          testList.map((item, idx) => (
            <tr key={item.id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <h5 className="font-medium text-black dark:text-white">
                  {(+page * 10) + idx + 1}
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.name}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.categoryName}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.type}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.score}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-yellow-500">
                    <MdEdit className={`text-2xl duration-300`} onClick={() => {
                      openModal();
                      setCrudTest(item);
                      setEditOrDeleteStatus('put');
                      serEditOrDeleteID(item.id);
                      setDefQuiz(item.optionDtos);
                    }} />
                  </button>
                  <button className="hover:text-red-600">
                    <MdDelete
                      className={`text-2xl duration-300`}
                      onClick={() => {
                        serEditOrDeleteID(item.id);
                        setEditOrDeleteStatus('delete');
                        openModal();
                      }}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr key={10005}>
            <td
              className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center font-bold"
              colSpan={6}
            >
              Синов топилмади
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

      {/*ADD EDIT MODAL*/}
      <GlobalModal onClose={closeModal} isOpen={isModal}>
        <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          {editOrDeleteStatus === 'delete' ? (
            <p className={`my-7 text-center font-semibold`}>Тестни ўчириб ташламоқчимисиз?</p>
          ) : (
            <>
              <input
                type="text"
                value={crudTest.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Саволни киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 my-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                value={crudTest.score}
                onChange={(e) => handleChange('score', e.target.value)}
                placeholder="Баллни киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 mb-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <div className={`flex flex-col gap-4`}>
                <SelectForm
                  val={`${crudTest.categoryId}`}
                  onChange={e => handleChange('categoryId', e.target.value)}
                  defOption={`Категория танлаш`}
                  child={categoryData && (
                    categoryData.map(item => (
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )))}
                />
                <SelectForm
                  val={`${crudTest.type}`}
                  onChange={e => {
                    setTestType(e.target.value);
                    handleChange('type', e.target.value);
                  }}
                  defOption={`Турни танланг`}
                  child={<>
                    <option value="SUM">Ҳисобланган натижа</option>
                    <option value="ONE_CHOICE">Бир тўғри жавобли тест</option>
                    <option value="MANY_CHOICE">Кўп тўғри жавобли тест</option>
                    <option value="ANY_CORRECT">Ҳар қандай тўғри</option>
                  </>}
                />
              </div>
              <p className={`text-center mt-4`}>
                {editOrDeleteStatus === 'put' && 'Вариантларни узгартирсангиз булади'}
              </p>
              {editOrDeleteStatus === 'put' ? (
                <TestCrudCheck type={crudTest.type ? crudTest.type : testType} defQues={defQuiz} />
              ) : (
                <TestCrudCheck type={crudTest.type ? crudTest.type : testType} />
              )}
              <div className={`flex justify-center items-center mt-10`}>
                <ImageUpload />
              </div>
              <p className={`text-center mt-2`}>Расм юклаш ихтиёрий</p>
            </>
          )}
          <div className={`flex justify-end items-center mt-5 mb-3 gap-5`}>
            <AddButtons children={`Ёпиш`} onClick={closeModal} />
            <AddButtons
              children={isLoading ? 'юкланмоқда...' : `${editOrDeleteStatus === 'delete' ? 'Ҳа' : 'Сақлаш'}`}
              disabled={editOrDeleteStatus === 'post' ? !(crudTest.type && crudTest.score && crudTest.name && crudTest.categoryId && crudTest.optionDtos) : false}
              onClick={() => {
                editOrDeleteStatus ? (
                  adminTestCrud({
                    urlType: editOrDeleteStatus,
                    crudData: crudTest,
                    setLoading: setIsLoading,
                    setResData,
                    editOrDeleteID: editOrDeleteStatus !== 'post' ? editOrDeleteID : ''
                  })
                ) : toast.error('Хатолик юз берди, қайта уриниб кўринг');
              }}
            />
          </div>
        </div>
      </GlobalModal>
    </>
  );
};

export default Test;
