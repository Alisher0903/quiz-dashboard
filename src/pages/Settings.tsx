import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import AddButtons from '../components/buttons/buttons.tsx';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { BiShow } from 'react-icons/bi';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';

const Settings = () => {
  const thead: IThead[] = [
    { id: 1, name: 'T/r' },
    { id: 2, name: 'Full Name' },
    { id: 3, name: 'Category' },
    { id: 4, name: 'Phone' },
    { id: 5, name: 'Action' }
  ];
  return (
    <>
      <Breadcrumb pageName="Settings" />

      <div className={`mb-5`}>
        <AddButtons
          // onClick={openModal}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Add</p>
          </div>}
        />
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
            <p className="text-black dark:text-white">
              packageItem.invoiceDate
            </p>
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="flex items-center space-x-3.5">
              <button className="hover:text-warning">
                <BiShow className={`text-2xl duration-300`} />
              </button>
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

export default Settings;
