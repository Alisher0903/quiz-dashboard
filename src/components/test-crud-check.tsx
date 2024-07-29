import { useEffect, useState } from 'react';
import testStore from '../common/state-management/testStore.tsx';

const TestCrudCheck = ({ type, defQues }: { type: string, defQues?: any }) => {
  const { setOptionDto } = testStore();
  const [questions, setQuestions] = useState([{ id: 1, answer: '', isCorrect: false }]);
  const [checkedId, setCheckedId] = useState<number | null>(null);

  useEffect(() => {
    setOptionDto(questions);
  }, [questions]);

  useEffect(() => {
    setQuestions([{ id: 1, answer: '', isCorrect: false }]);
  }, [type]);

  useEffect(() => {
    defQues && setQuestions(defQues);
  }, [defQues]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      answer: '',
      isCorrect: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const handleCheckboxChange = (id: number) => {
    if (type === 'ANY_CORRECT') {
      setCheckedId(id);
      setQuestions(questions.map(question => ({
        ...question,
        isCorrect: true
      })));
    } else if (type === 'MANY_CHOICE') {
      setQuestions(questions.map(question =>
        question.id === id
          ? { ...question, isCorrect: !question.isCorrect }
          : question
      ));
    } else {
      setQuestions(questions.map(question =>
        question.id === id
          ? { ...question, isCorrect: !question.isCorrect }
          : { ...question, isCorrect: false }
      ));
    }
  };

  const handleTextChange = (id: number, newText: string) => {
    setQuestions(questions.map(question =>
      question.id === id
        ? { ...question, answer: newText }
        : question
    ));
  };

  return (
    <>
      <div className={`mt-4`}>

        {/*=====================================SUM===============================*/}
        {type === 'SUM' && (
          questions.map(question => (
            <div key={question.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked
                onChange={() => handleCheckboxChange(question.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleTextChange(question.id, e.target.value)}
                placeholder="Саволни жавобини киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 ml-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          )))}

        {/*================================ONE_CHOICE===============================*/}
        {type === 'ONE_CHOICE' && (
          questions.map(question => (
            <div key={question.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={question.isCorrect}
                onChange={() => handleCheckboxChange(question.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleTextChange(question.id, e.target.value)}
                placeholder="Саволни жавобини киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 ml-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button onClick={addQuestion} className="text-green-500 ml-2">+</button>
              <button
                onClick={() => removeQuestion(question.id)}
                className={`text-red-500 ml-2 ${questions.length === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={questions.length === 1}
              >-
              </button>
            </div>
          )))}

        {/*===============================MANY_CHOICE================================*/}
        {type === 'MANY_CHOICE' && (
          questions.map(question => (
            <div key={question.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={question.isCorrect}
                onChange={() => handleCheckboxChange(question.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleTextChange(question.id, e.target.value)}
                placeholder="Саволни жавобини киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 ml-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button onClick={addQuestion} className="text-green-500 ml-2">+</button>
              <button
                onClick={() => removeQuestion(question.id)}
                className={`text-red-500 ml-2 ${questions.length === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={questions.length === 1}
              >-
              </button>
            </div>
          )))}

        {/*================================ANY_CORRECT================================*/}
        {type === 'ANY_CORRECT' && (
          questions.map(question => (
            <div key={question.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={checkedId === question.id}
                onChange={() => handleCheckboxChange(question.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleTextChange(question.id, e.target.value)}
                placeholder="Саволни жавобини киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-5 ml-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button onClick={addQuestion} className="text-green-500 ml-2">+</button>
              <button
                onClick={() => removeQuestion(question.id)}
                className={`text-red-500 ml-2 ${questions.length === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={questions.length === 1}
              >-
              </button>
            </div>
          )))}
      </div>
    </>
  );
};

export default TestCrudCheck;
