import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import AddButtons from '../components/buttons/buttons.tsx';
import GlobalModal from '../components/modal/modal.tsx';
import { useEffect, useState } from 'react';
import { addCategory, deleteCategory, getAdminCategory } from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import globalStore from '../common/state-management/globalStore.tsx';
import SelectForm from '../components/select/Select.tsx';

const thead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 2, name: 'Категория номи' },
  { id: 3, name: 'Тавсиф' },
  { id: 4, name: 'Саволлар сони' },
  { id: 5, name: 'Қийин саволлар сони' },
  { id: 6, name: 'Урта саволлар сони' },
  { id: 7, name: 'Осон саволлар сони' },
  { id: 8, name: 'Қўшимча саволлар сони' },
  { id: 9, name: 'Давомийлик вақти' },
  { id: 10, name: 'Қайта қабул қилиш санаси' },
  { id: 11, name: 'Яратган' },
  { id: 12, name: 'Узгартирган' },
  { id: 13, name: 'Учирган' },
  { id: 14, name: 'Ҳаракат' }
];

const defVal = {
  name: '',
  description: '',
  questionCount: '',
  extraQuestionCount: '',
  durationTime: '',
  retakeDate: '',
  easyQuestionCount: '',
  mediumQuestionCount: '',
  hardQuestionCount: '',
  main: ''
};

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
      setAddValue(defVal);
      closeModal();
      closeModalDelete();
      setEditStatus('');
    }
  }, [resData]);

  const openModal = () => setIsModalOpen(true);
  const openModalDelete = () => setIsModalDelete(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditStatus('');
    setAddValue(defVal);
  };

  const closeModalDelete = () => {
    setIsModalDelete(false);
    setEditStatus('');
  };

  const handleInputChange = (name: string, value: string|boolean) => {
    if (addValue?.main === 'true') {
      addValue.retakeDate = 0
      addValue.durationTime = 0
      addValue.extraQuestionCount = 0
      addValue.questionCount = 0
    }
    setAddValue({
      ...addValue,
      [name]: value
    });
  };

  const styles = {
    input: 'w-full rounded-lg border border-stroke bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
  };

  return (
    <>
      <Breadcrumb pageName="Категория" />

      <div className={`mb-5`}>
        <AddButtons
          onClick={openModal}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Қўшиш</p>
          </div>}
        />
      </div>
      <UniversalTable thead={thead}>
        {categoryData ? (
          categoryData.map((item, i) => (
            <tr key={i}>
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
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark min-w-[400px]">
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
                  {item.hardQuestionCount}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.mediumQuestionCount}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.easyQuestionCount}
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
                <p className="text-black dark:text-white">
                  {item.createdBy}
                </p>
              </td>
              <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.updatedBy}
                </p>
              </td><td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.deletedBy}
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
                        item.id && setEditStatus(item.id);
                      }}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9} className="border-b border-[#eee] p-5 dark:border-strokedark text-center">
              Туркум топилмади
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
            <div className={`mb-4 mt-10`}>
              <SelectForm
                val={addValue?.main}
                onChange={e => handleInputChange('main', e.target.value)}
                defOption={`Категория турини танланг`}
                child={<>
                  <option value="true">Асосий категория</option>
                  <option value="false">Асосий булмаган категория</option>
                </>}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="categoryName">Категория номи</label>
              <input
                required
                value={addValue?.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className={styles.input}
                id="categoryName"
                placeholder="Категория номини киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">Тавсиф</label>
              <input
                required
                value={addValue?.description}
                onChange={e => handleInputChange('description', e.target.value)}
                className={styles.input}
                id="description"
                placeholder="Тавсифни киритинг"
              />
            </div>
            {addValue?.main !== 'true' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="questionAmount">Саволлар сони</label>
                  <input
                    required
                    value={addValue?.questionCount}
                    onChange={e => handleInputChange('questionCount', e.target.value)}
                    className={styles.input}
                    type={`number`}
                    id="questionAmount"
                    placeholder="Саволлар сонини киритинг"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="extraQuestionCount">Қўшимча саволлар сони</label>
                  <input
                    required
                    value={addValue?.extraQuestionCount}
                    onChange={e => handleInputChange('extraQuestionCount', e.target.value)}
                    className={styles.input}
                    type="number"
                    id="extraQuestionCount"
                    placeholder="Қўшимча саволлар сонини киритинг"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="durationTime">Давомийлик вақти</label>
                  <input
                    required
                    value={addValue?.durationTime}
                    onChange={e => handleInputChange('durationTime', e.target.value)}
                    className={styles.input}
                    type="number"
                    id="durationTime"
                    placeholder="Давомийлик вақтини киритинг"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="retakeDate">Қайта қабул қилиш санаси</label>
                  <input
                    required
                    value={addValue?.retakeDate}
                    onChange={e => handleInputChange('retakeDate', e.target.value)}
                    className={styles.input}
                    type="number"
                    id="retakeDate"
                    placeholder="Қайта қабул қилиш санасини киритинг"
                  />
                </div>
              </>
            )}

            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={closeModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
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
          <p className={`my-7 text-center font-semibold`}>Категорияни оʻчириб ташламоқчимисиз?</p>
          <div className={`flex justify-end items-center gap-5 mt-5`}>
            <AddButtons children={`Ёпиш`} onClick={closeModalDelete} />
            <AddButtons
              children={isLoading ? 'юкланмоқда...' : `Учириш`}
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
