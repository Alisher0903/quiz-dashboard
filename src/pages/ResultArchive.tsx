import Breadcrumb from '../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { UserResultArchive } from '../common/logic-functions/user.tsx';
import globalStore from '../common/state-management/globalStore.tsx';
import userStore from '../common/state-management/userStore.tsx';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Popover } from 'antd';

const ResultArchive = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { isLoading, setIsLoading } = globalStore();
  const { resultList, setResultList } = userStore();

  useEffect(() => {
    id && UserResultArchive({ setData: setResultList, setLoading: setIsLoading, resultID: id });
  }, []);

  return (
    <>
      <Breadcrumb pageName={`Архив`} />
      <Popover title="Орқага қайтиш">
        <MdKeyboardBackspace
          onClick={() => navigate('/user')}
          className={`text-3xl hover:cursor-pointer hover:text-primary duration-300 mb-5`}
        />
      </Popover>

      <div className="space-y-4">
        {isLoading ? <PendingLoader /> : (
          resultList ? resultList.map((q, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${q.correct ? 'bg-green-100 dark:bg-green-400' : 'bg-red-100 dark:bg-red-400'}`}
            >
              <p className="text-lg font-semibold mb-2 dark:text-form-input">{index + 1}. {q.question}</p>
              {q.correctAnswer && (
                <p className="mb-2 dark:text-form-input">
                  <span className="font-semibold">Тўғри жавоб:</span> {q.correctAnswer.map((item, idx) => (
                  <p className={idx === 0 ? 'inline-block' : ''}>{item}</p>
                ))}
                </p>
              )}
              <p className={`dark:text-form-input`}>
                <span className="font-semibold">{!q.correctAnswer ? 'Жавобингиз туғри' : 'Сизнинг жавобингиз'}: </span>
                {q.answer.map((item, idx) => (
                  <p className={idx === 0 ? 'inline-block' : ''}>{item}</p>
                ))}
              </p>
            </div>
          )) : <>

          </>
        )}
      </div>
    </>
  );
};

export default ResultArchive;