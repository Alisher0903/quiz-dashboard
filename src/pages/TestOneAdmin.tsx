import { Image, Popover } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api_videos_files } from '../common/api/api.tsx';
import { TestOneAdmin } from '../types/test';
import { testGetOne } from '../common/logic-functions/test.tsx';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb.tsx';
import MathFormula from '../components/math-formula.tsx';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import globalStore from '../common/state-management/globalStore.tsx';
import { MdKeyboardBackspace } from 'react-icons/md';

const TestAdminOne = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, setIsLoading } = globalStore();
  const [testOneData, setTestOneData] = useState<null | TestOneAdmin>(null);

  useEffect(() => {
    id && testGetOne(setTestOneData, setIsLoading, id);
  }, []);

  const sortQuiz = (type: string, fullData: TestOneAdmin) => {
    if (!fullData) return <div></div>;

    switch (type) {
      case 'SUM':
        return (
          <div>
            <div className="flex py-5 justify-center items-start gap-3">
              <p className="">{`${fullData.id}.`}</p>
              <MathFormula text={fullData.name} />
            </div>
            {fullData.attachmentIds && fullData.attachmentIds.length > 0 && (
              <div className="flex justify-center items-center py-5">
                <Image
                  style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                  src={api_videos_files + fullData.attachmentIds[0]}
                  alt="img"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label
                htmlFor={`input[${fullData.id}]`}
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ҳисоблаб тўғри жавобни ёзинг (Ҳисоблашда адашиш хатолиги: <span
                className={`text-red-600`}>±{fullData.finiteError}</span>)
              </label>
              <input
                id={`input[${fullData.id}]`}
                placeholder="Жавобни киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 my-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="text"
              />
            </div>
          </div>
        );
      case 'ONE_CHOICE':
        return (
          <div>
            <div className="flex py-5 justify-center items-start gap-3">
              <p className="">{`${fullData.id}.`}</p>
              <MathFormula text={fullData.name} />
            </div>
            {fullData.attachmentIds && fullData.attachmentIds.length > 0 &&
              <div className="flex justify-center items-center py-5">
                <Image
                  style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                  src={api_videos_files + fullData.attachmentIds[0]}
                  prefix="Ammmmm"
                  alt="img"
                />
              </div>}
            <ul className="text-sm flex  flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              <div className="text-red-500 font-bold mb-3">
                Фақат битта тўғри жавобни белгиланг
              </div>
              {fullData.optionDtos.map((item: any, index: number) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`radio-${index}`}
                      type="radio"
                      className="w-5 h-4 text-blue-600 bg-gray-100  focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    {item.file &&
                      <Image width={100} height={70} src={api_videos_files + item.file} className="object-cover ms-1" />
                    }
                    <label
                      htmlFor={`radio-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <MathFormula text={item.answer} />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'MANY_CHOICE':
        return (
          <div>
            <div className="flex py-5 justify-center items-start gap-3">
              <p className="">{`${fullData.id}.`}</p>
              <MathFormula text={fullData.name} />
            </div>
            {fullData.attachmentIds && fullData.attachmentIds.length > 0 &&
              <div className="flex justify-center items-center py-5">
                <Image
                  style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                  src={api_videos_files + fullData.attachmentIds[0]}
                  alt="img"
                />
              </div>}
            <ul className="text-sm flex flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              <div className="text-red-500 font-bold mb-3">
                Бир неча тўғри жавобларни белгиланг
              </div>
              {fullData.optionDtos.map((item: any, index: number) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    {item.file &&
                      <Image width={100} height={70} src={api_videos_files + item.file} className="object-cover ms-1" />
                    }
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <MathFormula text={item.answer} />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'ANY_CORRECT':
        return (
          <div>
            <div className="flex py-5 justify-center items-start gap-3">
              <p className="">{`${fullData.id}.`}</p>
              <MathFormula text={fullData.name} />
            </div>
            {fullData.attachmentIds && fullData.attachmentIds.length > 0 &&
              <div className="flex justify-center items-center py-5">
                <Image
                  style={{ maxWidth: '40rem', maxHeight: '300px', objectFit: 'contain' }}
                  src={api_videos_files + fullData.attachmentIds[0]}
                  alt="img"
                />
              </div>}
            <ul className="text-sm flex flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              <div className="text-red-500 font-bold mb-3">
                Бир неча тўғри жавобларни белгиланг
              </div>
              {fullData.optionDtos.map((item: any, index: number) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    {item.file &&
                      <Image width={100} height={70} src={api_videos_files + item.file} className="object-cover ms-1" />
                    }
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <MathFormula text={item.answer} />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Breadcrumb pageName={`Битта савол`} />
      <Popover title="Орқага қайтиш" overlayStyle={{ textAlign: 'center' }}>
        <MdKeyboardBackspace
          onClick={() => navigate(-1)}
          className={`text-3xl hover:cursor-pointer hover:text-primary duration-300 mb-5`}
        />
      </Popover>
      <p className={`text-xl text-center my-5`}>
        Админ саволни мижозларга қандай кўринишини билиб олиш учун намуна
      </p>
      {isLoading ? <PendingLoader /> : <div className="space-y-4">
        <p className={`text-3xl text-center font-bold mt-10`}>{testOneData?.categoryName}</p>
        {testOneData ? sortQuiz(testOneData.type, testOneData) : <p className={`text-xl text-center my-5`}>
          Савол топилмади
        </p>}
      </div>
      }
    </>
  );
};

export default TestAdminOne;
