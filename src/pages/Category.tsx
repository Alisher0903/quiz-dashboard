import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import AddButtons from '../components/buttons/buttons.tsx';
import GlobalModal from '../components/modal/modal.tsx';
import { useEffect, useState } from 'react';
import { addCategory, deleteCategory, getAdminCategory } from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import globalStore from '../common/state-management/globalStore.tsx';

const thead: IThead[] = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Category name' },
  { id: 3, name: 'Description' },
  { id: 4, name: 'Question Count' },
  { id: 5, name: 'Extra Question Count' },
  { id: 6, name: 'Duration Time' },
  { id: 7, name: 'Retake Date' },
  { id: 8, name: 'Action' }
];

const Category = () => {
  const { categoryData, setCategoryData, setAddValue, addValue } = categoryStore();
  const { isLoading, setIsLoading, resData, setResData } = globalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [editStatus, setEditStatus] = useState<string | number>('');

  useEffect(() => {
    getAdminCategory(setCategoryData);
  }, []);

  useEffect(() => {
    if (resData) {
      setResData(false);
      getAdminCategory(setCategoryData);
      setAddValue({
        id: 0,
        name: '',
        description: '',
        questionCount: '',
        extraQuestionCount: '',
        durationTime: '',
        retakeDate: ''
      });
      closeModal();
      closeModalDelete()
      setEditStatus('');
    }
  }, [resData]);

  const openModal = () => setIsModalOpen(true);
  const openModalDelete = () => setIsModalDelete(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditStatus('');
    setAddValue({
      id: 0,
      name: '',
      description: '',
      questionCount: '',
      extraQuestionCount: '',
      durationTime: '',
      retakeDate: ''
    });
  };

  const closeModalDelete = () => {
    setIsModalDelete(false);
    setEditStatus('');
  };

  const handleInputChange = (name: string, value: string) => {
    setAddValue({
      ...addValue,
      [name]: value
    });
  };

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
        {categoryData ? (
          categoryData.map((item, i) => (
            <tr>
              <td className="border-b border-[#eee] p-5 dark:border-strokedark">
                <h5 className="font-medium text-black dark:text-white">
                  {i + 1}
                </h5>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.name}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.description}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.questionCount}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.extraQuestionCount}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.durationTime}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.retakeDate}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-yellow-500">
                    <MdEdit
                      className={`text-2xl duration-300`}
                      onClick={() => {
                        openModal();
                        setAddValue(item);
                        setEditStatus('edit');
                      }}
                    />
                  </button>
                  <button className="hover:text-red-600">
                    <MdDelete
                      className={`text-2xl duration-300`}
                      onClick={() => {
                        openModalDelete();
                        setEditStatus(item.id);
                      }}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className="border-b border-[#eee] p-5 dark:border-strokedark text-center">
              Category not found
            </td>
          </tr>
        )}
      </UniversalTable>

      {/* modal*/}
      <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
        <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <form className={`mt-5`} onSubmit={(e) => {
            editStatus ? addCategory(e, addValue, setResData, setIsLoading, editStatus)
              : addCategory(e, addValue, setResData, setIsLoading);
          }}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="categoryName">Category name</label>
              <input
                required
                value={addValue?.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                id="categoryName"
                placeholder="Enter category name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
              <input
                required
                value={addValue?.description}
                onChange={e => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                id="description"
                placeholder="Enter description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="questionAmount">Question count</label>
              <input
                required
                value={addValue?.questionCount}
                onChange={e => handleInputChange('questionCount', e.target.value)}
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type={`number`}
                id="questionAmount"
                placeholder="Enter question count"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="extraQuestionCount">Extra question count</label>
              <input
                required
                value={addValue?.extraQuestionCount}
                onChange={e => handleInputChange('extraQuestionCount', e.target.value)}
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type="number"
                id="extraQuestionCount"
                placeholder="Enter extra question count"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="durationTime">Duration time</label>
              <input
                required
                value={addValue?.durationTime}
                onChange={e => handleInputChange('durationTime', e.target.value)}
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type="number"
                id="durationTime"
                placeholder="Enter duration time"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="retakeDate">Retake date</label>
              <input
                required
                value={addValue?.retakeDate}
                onChange={e => handleInputChange('retakeDate', e.target.value)}
                className="w-full px-3 py-2 border rounded dark:text-slate-700"
                type="number"
                id="retakeDate"
                placeholder="Enter retake date"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Close`} onClick={closeModal} />
              <AddButtons
                children={isLoading ? 'loading...' : `Save`}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </form>
        </div>
      </GlobalModal>

      {/*delete modal*/}
      <GlobalModal onClose={closeModalDelete} isOpen={isModalDelete}>
        <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <p className={`my-7 text-center font-semibold`}>Do you want to delete Category?</p>
          <div className={`flex justify-end items-center gap-5 mt-5`}>
            <AddButtons children={`Close`} onClick={closeModalDelete} />
            <AddButtons
              children={isLoading ? 'loading...' : `Delete`}
              disabled={isLoading}
              onClick={() => deleteCategory(editStatus, setIsLoading, setResData)}
            />
          </div>
        </div>
      </GlobalModal>
    </>
  );
};

export default Category;
