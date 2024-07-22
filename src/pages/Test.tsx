import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import AddButtons from '../components/buttons/buttons.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import Select from '../components/select/Select.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import { useEffect, useState } from 'react';
import { getAdminCategory } from '../common/logic-functions/category.tsx';
import testStore from '../common/state-management/testStore.tsx';
import {
  adminTestCrud,
  getAllTest,
  getTypeFilter,
  testFilterCategory,
  testFilterName
} from '../common/logic-functions/test.tsx';
import TestCrudCheck from '../components/test-crud-check.tsx';
import GlobalModal from '../components/modal/modal.tsx';
import globalStore from '../common/state-management/globalStore.tsx';

const thead: IThead[] = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Question' },
  { id: 3, name: 'Category Name' },
  { id: 3, name: 'Type' },
  { id: 3, name: 'Ball' },
  { id: 4, name: 'Action' }
];

const Test = () => {
  const { categoryData, setCategoryData } = categoryStore();
  const { testList, setTestList, optionDto } = testStore();
  const { isLoading, setIsLoading, resData, setResData } = globalStore();
  const [testType, setTestType] = useState('');
  const [crudTest, setCrudTest] = useState({
    name: '',
    categoryId: null,
    type: '',
    score: '',
    attachmentName: [],
    optionDtos: optionDto,
    isMain: false
  });
  const [isModal, setIsModal] = useState(false);
  const defData = {
    name: '',
    categoryId: null,
    type: '',
    score: '',
    attachmentName: [],
    optionDtos: null,
    isMain: false
  };

  useEffect(() => {
    getAdminCategory(setCategoryData);
    getAllTest(setTestList);
  }, []);

  useEffect(() => {
    crudTest.isMain = testType === 'ANY_CORRECT' ? true : false;
    handleChange('optionDtos', optionDto);
  }, [optionDto]);

  useEffect(() => {
    if (resData) {
      setResData(false);
      closeModal();
    }
  }, [resData]);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setCrudTest(defData);
    setTestType('');
  };

  const handleChange = (name: string, value: string | any) => {
    setCrudTest({
      ...crudTest, [name]: value
    });
  };

  console.log('crud data: ', crudTest);

  return (
    <>
      <Breadcrumb pageName="Test" />

      <div className={`mb-5 w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5`}>
        <AddButtons
          onClick={openModal}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Add</p>
          </div>}
        />
        <div
          className={`w-full lg:max-w-[70%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}>
          <input
            onChange={e => {
              if (e.target.value) testFilterName(e.target.value, setTestList);
              else getAllTest(setTestList);
            }}
            placeholder="🔎  Search..."
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <Select
            onChange={e => testFilterCategory(e.target.value, setTestList)}
            defOption={`Category select`}
            child={categoryData && (
              categoryData.map((item, idx) => (
                <option value={item.id} key={idx}>{item.name}</option>
              )))}
          />
          <Select
            onChange={e => {
              if (e.target.value) getTypeFilter(setTestList, e.target.value);
              else getAllTest(setTestList);
            }}
            defOption={`Type select`}
            child={<>
              <option value="SUM">Sum</option>
              <option value="ONE_CHOICE">One choice</option>
              <option value="MANY_CHOICE">Many choice</option>
              <option value="ANY_CORRECT">Any correct</option>
            </>}
          />
        </div>
      </div>

      <UniversalTable thead={thead}>
        {testList ? (
          testList.map((item, idx) => (
            <tr key={idx}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <h5 className="font-medium text-black dark:text-white">
                  {idx + 1}
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.name || item.question}
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
                    <MdEdit className={`text-2xl duration-300`} />
                  </button>
                  <button className="hover:text-red-600">
                    <MdDelete className={`text-2xl duration-300`} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center font-bold"
                colSpan={6}>Test not found
            </td>
          </tr>
        )}

      </UniversalTable>

      {/*ADD EDIT MODAL*/}
      <GlobalModal onClose={closeModal} isOpen={isModal}>
        <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <input
            type="text"
            value={crudTest.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter question"
            className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 my-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <input
            type="number"
            value={crudTest.score}
            onChange={(e) => handleChange('score', e.target.value)}
            placeholder="Enter ball"
            className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 mb-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <div className={`flex flex-col gap-4`}>
            <Select
              onChange={e => handleChange('categoryId', e.target.value)}
              defOption={`Category select`}
              child={categoryData && (
                categoryData.map((item, idx) => (
                  <option value={item.id} key={idx}>{item.name}</option>
                )))}
            />
            <Select
              val={crudTest.type}
              onChange={e => {
                setTestType(e.target.value);
                handleChange('type', e.target.value);
              }}
              defOption={`Type select`}
              child={<>
                <option value="SUM">Sum</option>
                <option value="ONE_CHOICE">One choice</option>
                <option value="MANY_CHOICE">Many choice</option>
                <option value="ANY_CORRECT">Any correct</option>
              </>}
            />
          </div>
          <TestCrudCheck type={testType} />
          <div className={`flex justify-end items-center mt-5 mb-3 gap-5`}>
            <AddButtons children={`Close`} onClick={closeModal} />
            <AddButtons
              children={isLoading ? 'loading...' : `Save`}
              disabled={!(crudTest.type && crudTest.score && crudTest.name && crudTest.categoryId && crudTest.optionDtos)}
              onClick={() => adminTestCrud({
                urlType: 'post',
                crudData: crudTest,
                setLoading: setIsLoading,
                setResData
              })}
            />
          </div>
        </div>
      </GlobalModal>
    </>
  );
};

export default Test;
