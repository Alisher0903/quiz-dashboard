import { Skeleton } from 'antd';
import globalStore from '../../common/state-management/globalStore';
import useTestStore from '../../common/state-management/testStore';
import { Link } from 'react-router-dom';

const ClientQuizResult = () => {
  const { result } = useTestStore();
  const { isLoading } = globalStore();

  if (isLoading) {
    return (
      <div className="bg-white flex flex-col items-center dark:bg-[#24303F] w-full rounded-xl p-5">
        <Skeleton />
      </div>
    );
  }

  if (result) {
    return (
      <div className="bg-white flex flex-col items-center dark:bg-[#24303F] w-full rounded-xl p-5">
        <div className="flex justify-center items-center flex-col">
          <p className="text-4xl font-bold text-red-600 dark:text-[#3C50E0]">Congratulations!</p>
          <div className="tenor-gif-embed" data-postid="9526867700513320718" data-share-method="host"
               data-aspect-ratio="1" data-width="100%">
            <img src="https://media.tenor.com/hDY7src9Lw4AAAAi/dear-harsh-beta.gif" alt="" />
          </div>
          <div>
            <Link to={'https://gmail.com/'} className='text-center' target={`_blank`}>{result}</Link>
            <p className={`text-center my-3`}>
              <Link className="text-blue-600 hover:underline" to={'/client/dashboard'}>Back to home</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col items-center dark:bg-[#24303F] w-full rounded-xl p-5">
      <div className="flex justify-center items-center flex-col">
        <p>Iltimos test javobini olish uchun birinchi test yeching</p>
        <Link className="text-blue-600" to={'/client/dashboard'}>Test yechishga o'tish</Link>
      </div>
    </div>
  );
};

export default ClientQuizResult;
