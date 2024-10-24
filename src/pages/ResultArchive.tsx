import Breadcrumb from '../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { UserResultArchive } from '../common/logic-functions/user.tsx';
import globalStore from '../common/state-management/globalStore.tsx';
import userStore from '../common/state-management/userStore.tsx';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Popover } from 'antd';
import MathFormula from '../components/math-formula.tsx';

const ResultArchive = () => {
  const navigate = useNavigate();
  const { id, fullName } = useParams<{ id: string, fullName: string }>();
  const { isLoading, setIsLoading } = globalStore();
  const { resultList, setResultList } = userStore();

  useEffect(() => {
    id && UserResultArchive({ setData: setResultList, setLoading: setIsLoading, resultID: id });
  }, []);

  const groupedResults = resultList
    ? resultList.resArchives.reduce((acc: any, curr: any) => {
      if (!acc[curr.categoryName]) {
        acc[curr.categoryName] = [];
      }
      acc[curr.categoryName].push(curr);
      return acc;
    }, {}) : {};

  const difficultyTranslate = (type: string) => {
    if (type === 'EASY') return 'Осон';
    else if (type === 'MEDIUM') return 'Ўрта';
    else if (type === 'HARD') return 'Қийин';
  };

  const difficultyCount = (data: any[]) => {
    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;

    data.forEach((item: any) => {
      if (item.difficulty === 'EASY') {
        easyCount++;
      } else if (item.difficulty === 'MEDIUM') {
        mediumCount++;
      } else if (item.difficulty === 'HARD') {
        hardCount++;
      }
    });

    return {
      easy: easyCount,
      medium: mediumCount,
      hard: hardCount
    };
  };

  return (
    <>
      <Breadcrumb pageName={'Архив'} />
      <div className={'flex flex-col md:flex-row justify-between gap-10'}>
        <Popover title="Орқага қайтиш" overlayStyle={{ textAlign: 'center' }}>
          <MdKeyboardBackspace
            onClick={() => navigate(-1)}
            className={`text-3xl hover:cursor-pointer hover:text-primary duration-300 mb-5`}
          />
        </Popover>
        <h2 className={'text-2xl font-bold'}>{fullName} ишлаган тест натижалари</h2>
        <p></p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <PendingLoader />
        ) : resultList && Object.keys(groupedResults).length > 0 ? (
          Object.keys(groupedResults).map((category, catIdx) => {
            const counts = difficultyCount(groupedResults[category]);

            return (
              <div key={catIdx}>
                {/* Display category name once */}
                <div className="py-5 mt-6 md:mt-9 lg:mt-16">
                  <p className={`lg:text-4xl md:text-2xl text-xl text-center font-semibold`}>
                    {category}
                  </p>
                  <p className={'flex items-center justify-center gap-5 text-base flex-wrap'}>
                    <span>Жами саволлар сони: {groupedResults[category]?.length} та</span>
                    <span>Қийин саволлар сони: {counts.hard} та</span>
                    <span>Ўрта саволлар сони: {counts.medium} та</span>
                    <span>Осон саволлар сони: {counts.easy} та</span>
                  </p>
                </div>

                {groupedResults[category].map((q: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 my-3 rounded-md ${q.correct ? 'bg-green-100 dark:bg-green-400' : 'bg-red-100 dark:bg-red-400'}`}
                  >
                    <p>Қийинлик даражаси: {difficultyTranslate(q.difficulty)}</p>
                    <p className="text-lg font-semibold mb-2 dark:text-form-input flex gap-3">
                      {index + 1}. <MathFormula text={q.question} />
                    </p>
                    {q.correctAnswer && (
                      <p className="mb-2 dark:text-form-input">
                        <span className="font-semibold mr-1">Тўғри жавоб:</span>
                        {q.correctAnswer.map((item: any, idx: number) => (
                          <p className={idx === 0 ? 'inline-block' : ''}>
                            <MathFormula text={item} />
                          </p>
                        ))}
                      </p>
                    )}
                    <p className={`dark:text-form-input`}>
                      <span className="font-semibold">
                        {!q.correctAnswer ? 'Жавобингиз туғри' : 'Сизнинг жавобингиз'}:{' '}
                      </span>
                      {q.answer.map((item: any, idx: number) => (
                        <p className={idx === 0 ? 'inline-block' : ''}>
                          <MathFormula text={item} />
                        </p>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div>
            <p className={`text-center text-base`}>Архивда ҳеч қандай маълумот топилмади.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultArchive;
