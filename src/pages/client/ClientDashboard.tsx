import UniversalTable, { IThead } from '../../components/Tables/UniversalTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { category_all } from '../../common/api/api';
import { config, setConfig } from '../../common/api/token';
import { MdStart } from 'react-icons/md';
import GlobalModal from '../../components/modal/modal';
import AddButtons from '../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';

const thead: IThead[] = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Category name' },
  { id: 4, name: 'Action' }
];

const ClientDashboard = () => {
  const [Category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    setConfig();
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await axios.get(`${category_all}`, config);
      if (res.data.success) setCategory(res.data.body);
      else setCategory([]);
    } catch (error) {
      console.error(error);
      setCategory([]);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="lg:px-40">
      <UniversalTable thead={thead}>
        {Category.length > 0 ?
          Category.map((item: any, index: number) => (
            <tr key={item.id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {item.name}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  <button className="hover:text-yellow-500 select-none flex gap-2" onClick={() => {
                    setCategoryId(item.id);
                    toggleModal();
                  }}>
                    START
                    <MdStart className={`text-2xl duration-300`} />
                  </button>
                </p>
              </td>
            </tr>
          )) : (
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark font-bold text-center" colSpan={3}>
                Category not found
              </td>
            </tr>
          )}
      </UniversalTable>
      <GlobalModal isOpen={isOpen} onClose={toggleModal}>
        <div className="w-[300px] py-2">
          <p className="text-[#000] dark:text-white text-lg text-center">Are you sure you want to start this test?</p>
          <div className="flex mt-5 gap-5 justify-end">
            <AddButtons onClick={toggleModal}>
              Cancel
            </AddButtons>
            <AddButtons onClick={() => navigation(`/client/quiz/${categoryId}`)}>
              Start
            </AddButtons>
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

export default ClientDashboard;
