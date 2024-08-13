import { useEffect } from "react"
import useAddressStore from "../common/state-management/address"
import { getDistrics, getRegions } from "../common/logic-functions/address";
import globalStore from "../common/state-management/globalStore";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import PendingLoader from "../common/Loader/pending-loader";
import UniversalTable, { IThead } from "../components/Tables/UniversalTable";
import { MdDelete, MdEdit, MdOutlineAddCircle } from "react-icons/md";
import AddButtons from "../components/buttons/buttons";

const regionsThead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 3, name: 'Номи' },
  { id: 4, name: 'Ҳаракат' },
];

const districstsThead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 3, name: 'Номи' },
  { id: 3, name: 'Вилоят номи' },
  { id: 4, name: 'Ҳаракат' },
];

const Address = () => {
  const { regions, setRegions, districs, setDistrics } = useAddressStore();
  const { isLoading, setIsLoading } = globalStore()

  useEffect(() => {
    getRegions(setRegions, setIsLoading)
  }, [setRegions]);

  useEffect(() => {
    getDistrics(setDistrics, setIsLoading)
  }, [setDistrics]);

  return (
    <>
      <div>
        <Breadcrumb pageName="Манзилар" />
        {isLoading && <PendingLoader />}
        <div>
          <div className={`mb-5`}>
            <AddButtons
              // onClick={openModal}
              children={<div className={`flex justify-center items-center`}>
                <MdOutlineAddCircle className={`text-4xl mr-3`} />
                <p className={`text-lg font-bold`}>Қўшиш</p>
              </div>}
            />
            <UniversalTable thead={regionsThead}>
              {regions && regions.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.name}</p>
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

              ))}
            </UniversalTable>
          </div>
          <div>
            <UniversalTable thead={districstsThead}>
              {districs && districs.map((item, index) => (
                <tr key={item.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.regionId}</p>
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

              ))}
            </UniversalTable>
          </div>
        </div>
      </>
      )
}

      export default Address