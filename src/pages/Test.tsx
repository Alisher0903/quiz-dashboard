import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import AddButtons from '../components/buttons/buttons.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import Select from '../components/select/Select.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import { useEffect } from 'react';
import { getAdminCategory } from '../common/logic-functions/category.tsx';

const thead: IThead[] = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Question' },
  { id: 3, name: 'Description' },
  { id: 4, name: 'Action' }
];

const Test = () => {
  const { categoryData, setCategoryData } = categoryStore();
  useEffect(() => {
    getAdminCategory(setCategoryData);
  }, []);
  return (
    <>
      <Breadcrumb pageName="Test" />

      <div className={`mb-5 w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5`}>
        <AddButtons
          // onClick={openModal}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Add</p>
          </div>}
        />
        <div
          className={`w-full lg:max-w-[70%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}>
          <input
            placeholder="🔎  Search..."
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <Select
            defOption={`Category select`}
            child={categoryData && (
              categoryData.map((item, idx) => (
                <option value={item.id} key={idx}>{item.name}</option>
              )))}
          />
          <Select
            defOption={`Type select`}
            child={<>
              <option value="">salom</option>
            </>}
          />
        </div>
      </div>
      <UniversalTable
        key={`test${1}`}
        thead={thead}
      >
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <h5 className="font-medium text-black dark:text-white">
              1
            </h5>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
              packageItem.invoiceDate
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <p className="text-black dark:text-white">
              packageItem.invoiceDate
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
      </UniversalTable>
    </>
  );
};

export default Test;
