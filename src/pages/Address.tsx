import { useEffect } from "react"
import useAddressStore from "../common/state-management/address"
import { addRegion, deleteRegion, getDistrics, getRegions, updateRegion } from "../common/logic-functions/address";
import globalStore from "../common/state-management/globalStore";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import PendingLoader from "../common/Loader/pending-loader";
import UniversalTable, { IThead } from "../components/Tables/UniversalTable";
import { MdDelete, MdEdit, MdOutlineAddCircle } from "react-icons/md";
import AddButtons from "../components/buttons/buttons";
import GlobalModal from "../components/modal/modal";

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

const styles = {
  input: 'w-full rounded-lg border border-stroke bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
};

const Address = () => {
  const {
    regions,
    setRegions,
    districs,
    setDistrics,
    isDistrictModal,
    setIsDistrictModal,
    isRegionModal,
    setIsRegionModal,
    isDeleteRegionModal,
    setIsDeleteRegionModal,
    regionName,
    setRegionName,
    id,
    setId,
    isEditRegionModal,
    setIsEditRegionModal
  } = useAddressStore();
  const { isLoading, setIsLoading } = globalStore()

  useEffect(() => {
    getRegions(setRegions, setIsLoading)
  }, [setRegions]);

  useEffect(() => {
    getDistrics(setDistrics, setIsLoading)
  }, [setDistrics]);

  const toggleRegionModal = () => {
    setIsRegionModal(!isRegionModal)
    setRegionName('')
  };
  const toggleDeleteRegionModal = () => {
    setIsDeleteRegionModal(!isDeleteRegionModal)
    setRegionName('')
  };
  const toggleEditRegionModal = () => {
    setRegionName('')
    setIsEditRegionModal(!isEditRegionModal)
  };
  const toggleDistrictModal = () => {
    setIsDistrictModal(!isDistrictModal)
    setRegionName('')
  };

  console.log(regionName);
  return (
    <>
      <div>
        <Breadcrumb pageName="Манзилар" />
        {!districs && !regions && isLoading && <PendingLoader />}
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-black text-2xl dark:text-white">Вилоятлар</p>
            </div>
            <div className={`my-5`}>
              <AddButtons
                onClick={toggleRegionModal}
                children={<div className={`flex justify-center items-center`}>
                  <MdOutlineAddCircle className={`text-4xl mr-3`} />
                  <p className={`text-lg font-bold`}>Қўшиш</p>
                </div>}
              />
            </div>
          </div>
          <UniversalTable thead={regionsThead}>
            {regions && regions.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-yellow-500">
                      <MdEdit className={`text-2xl duration-300`}
                        onClick={() => {
                          toggleEditRegionModal()
                          setId(item.id);
                          setRegionName(item.name)
                        }} />
                    </button>
                    <button className="hover:text-red-600">
                      <MdDelete className={`text-2xl duration-300`}
                        onClick={() => {
                          toggleDeleteRegionModal()
                          setId(item.id)
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>

            ))}
          </UniversalTable>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-black text-2xl dark:text-white">Туманлар</p>
            </div>
            <div className={`my-5`}>
              <AddButtons
                onClick={toggleDistrictModal}
                children={<div className={`flex justify-center items-center`}>
                  <MdOutlineAddCircle className={`text-4xl mr-3`} />
                  <p className={`text-lg font-bold`}>Қўшиш</p>
                </div>}
              />
            </div>
          </div>
          <UniversalTable thead={districstsThead}>
            {districs && districs.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.regionName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-yellow-500">
                      <MdEdit className={`text-2xl duration-300`} />
                    </button>
                    <button className="hover:text-red-600">
                      <MdDelete
                        className={`text-2xl duration-300`}

                      />
                    </button>
                  </div>
                </td>
              </tr>

            ))}
          </UniversalTable>
        </div>
        <GlobalModal isOpen={isRegionModal} onClose={toggleRegionModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <p className="text-black dark:text-white text-2xl text-center my-3">Вилоят қўшиш</p>
            <div className="mb-4">
              <input
                required
                onChange={(e) => setRegionName(e.target.value)}
                className={styles.input}
                id="lastname"
                placeholder="Вилоят номини киритинг"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                onClick={() => addRegion(setRegions, setIsLoading, regionName, toggleRegionModal)}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal isOpen={isEditRegionModal} onClose={toggleEditRegionModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <p className="text-black dark:text-white text-2xl text-center my-3">Вилоят номини ўзгартириш</p>
            <div className="mb-4">
              <input
                required
                onChange={(e) => setRegionName(e.target.value)}
                className={styles.input}
                id="lastname"
                value={regionName}
                placeholder="Вилоят номини киритинг"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleEditRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                onClick={() => updateRegion(id, regionName, setRegions, setIsLoading, toggleEditRegionModal)}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal onClose={toggleDeleteRegionModal} isOpen={isDeleteRegionModal}>
          <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
            <p className="text-black dark:text-white text-xl text-center my-3">Сиз аниқ бу вилоятни ўчирмоқчимисиз</p>
            <div className={`flex justify-end items-center gap-5 mt-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleDeleteRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Учириш`}
                disabled={isLoading}
                onClick={() => deleteRegion(id, setRegions, setIsLoading, toggleDeleteRegionModal)}
              />
            </div>
          </div>
        </GlobalModal>
        {/* <GlobalModal isOpen={isDistrictModal} onClose={toggleDistrictModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">

          </div>
        </GlobalModal> */}
      </div>
    </>
  )
}

export default Address