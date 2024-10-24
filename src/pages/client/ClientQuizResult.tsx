import { Skeleton } from 'antd';
import globalStore from '../../common/state-management/globalStore';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';

const ClientQuizResult = () => {
  const { isLoading } = globalStore();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get('data');
  const resultData = data ? JSON.parse(data) : null;

  console.log(resultData);

  if (isLoading) {
    return (
      <div className="bg-white flex flex-col items-center dark:bg-[#24303F] w-full rounded-xl p-5">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#24303F] w-full rounded-xl p-5">
      <p className="text-4xl font-bold text-red-600 dark:text-[#3C50E0] text-center">Табриклаймиз!</p>
      <p className={`text-center my-3 dark:text-white`}>
        Тест ишлаш жараёни муваффақиятли якунланди. {' '}
        <Link className="text-blue-600 hover:underline" to={'/'}>Бош саҳифага</Link>
        {' '}
        қайтиш
      </p>
      <div className={'max-w-[700px] mx-auto mt-10 border border-black/70 dark:border-whiter rounded-xl p-7'}>
        <h1 className={'text-center lg:text-3xl md:text-2xl text-xl mb-10 font-bold'}>{resultData?.categoryName}</h1>
        <div className="flex items-center justify-between border-b border-black/50 dark:border-whiter mb-5">
          <p>Исм:</p>
          <p className={'font-semibold'}>{resultData?.firstName}</p>
        </div>
        <div className="flex items-center justify-between border-b border-black/50 dark:border-whiter mb-5">
          <p>Фамилия:</p>
          <p className={'font-semibold'}>{resultData?.lastName}</p>
        </div>
        <div className="flex items-center justify-between border-b border-black/50 dark:border-whiter mb-5">
          <p>Натижа:</p>
          <p className={'font-semibold'}><span
            className={'text-green-500'}>{resultData.correctAnswer}</span>/{resultData?.countAnswer}</p>
        </div>
        <div className="flex items-center justify-between border-b border-black/50 dark:border-whiter mb-5">
          <p>Тупланган балл:</p>
          <p className={'font-semibold'}>{resultData?.testScore} (балл)</p>
        </div>
        <div className="flex items-center justify-between border-b border-black/50 dark:border-whiter mb-5">
          <p>Ишлашга кетган вақт:</p>
          <p className={'font-semibold'}>{resultData?.duration} (мин)</p>
        </div>
        <div className="flex items-center justify-between border-b border-black/50 dark:border-whiter mb-5">
          <p>Ишлаган санаси:</p>
          <p className={'font-semibold'}>{moment(resultData?.createdAt.slice(0, 10)).format('DD.MM.YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientQuizResult;
