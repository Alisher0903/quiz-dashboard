import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import AddButtons from '../components/buttons/buttons.tsx';
import GlobalModal from '../components/modal/modal.tsx';
import { useState } from 'react';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thead: IThead[] = [
    { id: 1, name: 'T/r' },
    { id: 2, name: 'Category name' },
    { id: 3, name: 'Description' },
    { id: 4, name: 'Action' }
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Breadcrumb pageName="Category" />

      <div className={`mb-5`}>
        <AddButtons
          onClick={openModal}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Add</p>
          </div>}
        />
      </div>
      <UniversalTable
        key={`category${1}`}
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

      {/* modal*/}
      <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
        <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <form className={`mt-5`}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="categoryName">Category name</label>
              <input
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                id="categoryName"
                placeholder="Enter category name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
              <input
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                id="description"
                placeholder="Enter description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="questionAmount">Question count</label>
              <input
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type={`number`}
                id="questionAmount"
                placeholder="Enter question count"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="extraQuestionCount">Extra question count</label>
              <input
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type="number"
                id="extraQuestionCount"
                placeholder="Enter extra question count"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="durationTime">Duration time</label>
              <input
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type="number"
                id="durationTime"
                placeholder="Enter duration time"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="retakeDate">Retake date</label>
              <input
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type="number"
                id="retakeDate"
                placeholder="Enter retake date"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Close`} onClick={closeModal} />
              <AddButtons children={`Save`} disabled />
            </div>
          </form>
        </div>
      </GlobalModal>
    </>
  );
};

export default Category;
