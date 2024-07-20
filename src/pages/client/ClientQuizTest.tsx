import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTestStore from "../../common/state-management/testStore";
import { fetchQuiz } from "../../common/logic-functions/test";
import { TestOptionDtos } from "../../types/test";
import AddButtons from "../../components/buttons/buttons";
import { api_videos_files } from "../../common/api/api";

const ClientQuizTest = () => {
  const { quizData, setQuizData, setCurrentIndex, currentIndex } = useTestStore();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: boolean }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const payload = quizData.quizList
    .map((question) => {
      const answer = answers[question.id];
      switch (question.type) {
        case 'ONE_CHOICE':
          return answer !== undefined ? { questionId: question.id, optionId: answer } : null;
        case 'SUM':
          return answer !== undefined ? { questionId: question.id, answer } : null;
        case 'ANY_CORRECT':
          return answer !== undefined ? { questionId: question.id, optionId: answer } : null;
        case 'MANY_CHOICE':
          return answer && answer.length > 0 ? { questionId: question.id, optionIds: answer } : null;
        default:
          return null;
      }
    })
    .filter(answer => answer !== null);

  console.log('payloaddddddddddddddd', payload);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchQuiz(id, setQuizData);
    }
  }, [id, setQuizData]);

  useEffect(() => {
    if (quizData && quizData.remainingTime !== undefined) {
      setRemainingTime(quizData.remainingTime * 60);
    }
  }, [quizData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []); 

  useEffect(() => {
    setSelectedOptions({});
    setIsButtonDisabled(true);
  }, [currentIndex]);

  useEffect(() => {
    if (quizData.quizList[currentIndex]) {
      const currentQuestion = quizData.quizList[currentIndex];
      let hasSelected = false;

      if (currentQuestion.type === 'ONE_CHOICE' || currentQuestion.type === 'ANY_CORRECT') {
        hasSelected = Object.values(selectedOptions).some((value, index) => value && quizData.quizList[currentIndex].optionDtos[index]?.id === answers[currentQuestion.id]);
      } else if (currentQuestion.type === 'MANY_CHOICE') {
        hasSelected = answers[currentQuestion.id]?.length > 0;
      }

      setIsButtonDisabled(!hasSelected);
    }
  }, [selectedOptions, answers, currentIndex, quizData.quizList]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.quizList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleOptionChange = (index: number) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions };
      if (quizData.quizList[currentIndex].type === 'ONE_CHOICE' || quizData.quizList[currentIndex].type === 'ANY_CORRECT') {
        newSelectedOptions[index] = !newSelectedOptions[index];
        for (const key in newSelectedOptions) {
          if (key !== index.toString()) {
            newSelectedOptions[key] = false;
          }
        }
      } else {
        newSelectedOptions[index] = !newSelectedOptions[index];
      }
      return newSelectedOptions;
    });
  };

  const sortQuiz = (type: string, optionList: TestOptionDtos[] | undefined, name: string, attachmentId: string[]) => {
    if (!optionList) return <div></div>;

    switch (type) {
      case 'SUM':
        return (
          <div>
            <div className="flex py-5 justify-center">
              <p className="text-xl">{name}</p>
            </div>
            <div>
              <img src={api_videos_files + attachmentId} alt="" />
            </div>
            <div>
              <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter your Answer
              </label>
              <input
                placeholder="Answer"
                onChange={(e) => handleAnswerChange(optionList[0]?.questionId, e.target.value)}
                className="rounded-xl px-2 py-1"
                type="text"
              />
            </div>
          </div>
        );
      case 'ONE_CHOICE':
      case 'ANY_CORRECT':
        return (
          <div>
            <div className="flex py-5 justify-center">
              <p className="text-xl">{name}</p>
            </div>
            <ul className="text-sm flex flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              {optionList.map((item, index) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      checked={!!selectedOptions[index]}
                      onChange={() => {
                        handleAnswerChange(item.questionId, item.id);
                        handleOptionChange(index);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {item.answer}
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
            <div className="flex py-5 justify-center">
              <p className="text-xl">{name}</p>
            </div>
            <ul className="text-sm flex flex-col gap-2 font-medium dark:border-gray-600 dark:text-white">
              {optionList.map((item, index) => (
                <li key={index} className="w-full border rounded-lg border-gray-200 dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      checked={!!selectedOptions[index]}
                      onChange={(e) => {
                        const newValues = answers[item.questionId] || [];
                        if (e.target.checked) {
                          handleAnswerChange(item.questionId, [...newValues, item.id]);
                        } else {
                          handleAnswerChange(item.questionId, newValues.filter((id: number) => id !== item.id));
                        }
                        handleOptionChange(index);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {item.answer}
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="dark:bg-[#24303F] bg-white shadow-lg w-full p-5 rounded-2xl">
      <div className="">
        <p className="text-2xl">{currentIndex + 1} / {quizData.quizList.length}</p>
      </div>
      <div>
        {sortQuiz(
          quizData.quizList[currentIndex]?.type,
          quizData.quizList[currentIndex]?.optionDtos,
          quizData.quizList[currentIndex]?.name,
          quizData.quizList[currentIndex]?.attachmentName
        )}
      </div>
      <div className="flex justify-between mt-5">
        <p>Remaining Time: {formatTime(remainingTime ? remainingTime : 0)}</p>
        <div className="flex gap-5">
          <AddButtons onClick={handleNextQuestion} disabled={isButtonDisabled}>{currentIndex + 1 === quizData.quizList.length ? 'Submit' : 'Next'}</AddButtons>
        </div>
      </div>
    </div>
  );
};

export default ClientQuizTest;
