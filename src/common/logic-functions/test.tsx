import axios from 'axios';
import { config } from '../api/token';
import { TestList, TestMainData, TestOneAdmin } from '../../types/test';
import {
  certificate, question_all_filter,
  question_crud, question_transfer,
  quiz_pass,
  quiz_start
} from '../api/api';
import toast from 'react-hot-toast';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void, setIsLoading: (val: boolean) => void, setTotalTime: (Val: number) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(`${quiz_start}${id}`, config);
    if (data.success) {
      setQuizData({
        quizList: data.body.questionDtoList,
        quiz: data.body,
        currentQuestionIndex: 0,
        remainingTime: data.body.duration
      });
      setTotalTime(data.body.duration * 60);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setQuizData({
        quizList: [],
        quiz: {
          questionDtoList: [],
          countAnswers: 0,
          duration: 0
        },
        currentQuestionIndex: 0,
        remainingTime: 0
      });
    }
  } catch (err: any) {
    toast.error(err.response.data.message && 'Бир неча кундан сўнг тест ишлашингиз мумкин');
    setIsLoading(false);
    setQuizData({
      quizList: [],
      quiz: {
        questionDtoList: [],
        countAnswers: 0,
        duration: 0
      },
      currentQuestionIndex: 0,
      remainingTime: 0
    });
    consoleClear();
  }
};

export const sendResults = async (id: string | undefined, duration: number, countAnswers: number, payload: any[], navigate: (path: string) => void, setIsLoading: (val: boolean) => void, setCurrentIndex: (val: number) => void, setQuizData: (val: TestMainData) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.post(`${quiz_pass}/${id}?duration=${duration}&countAnswers=${countAnswers}`, payload, config);
    if (data.success) {
      const queryString = new URLSearchParams({ data: JSON.stringify(data.body) }).toString();
      navigate(`/client/quiz/result?${queryString}`);
      setIsLoading(false);
      setCurrentIndex(0);
      setQuizData({
        quizList: [],
        quiz: {
          questionDtoList: [],
          countAnswers: 0,
          duration: 0
        },
        currentQuestionIndex: 0,
        remainingTime: 0
      });
      localStorage.removeItem('remainingTime');
      localStorage.removeItem('currentIndex');
    } else setIsLoading(false);
  } catch {
    setIsLoading(false);
    toast.error('Илтимос кейинроқ уриниб кўринг');
    consoleClear();
  }
};

export const getCertificate = async (id: number, setIsLoading: (val: any) => void) => {
  setIsLoading((prev: any) => ({ ...prev, [id]: { ...prev[id], email: true } }));
  try {
    const { data } = await axios.post(`${certificate}/${id}`, {}, config);
    if (data.success) {
      toast.success('Сертификат электрон почтангизга муваффақиятли юборилди');
      consoleClear();
    }
  } catch {
    consoleClear();
  } finally {
    setIsLoading((prev: any) => ({ ...prev, [id]: { ...prev[id], email: false } }));
  }
};

//===================ADMIN=========================
// all get or filter
export const allFilterOrGet = async (setData: (val: null | TestList[]) => void, page: number | string, setTotalPage: (val: number) => void, setLoading: (val: boolean) => void, name?: string, categoryId?: string | number, type?: string) => {
  const queryParams: string = [
    name ? `questionName=${name}` : '',
    categoryId ? `categoryId=${categoryId}` : '',
    type ? `type=${type}` : ''
  ].filter(Boolean).join('&');
  const url: string = `${question_all_filter}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
  setLoading(true);
  try {
    const { data } = await axios.get(url, config);
    if (data.success) {
      setLoading(false);
      setData(data.body.body);
      setTotalPage(data.body.totalElements);
    } else {
      setData(null);
      setLoading(false);
      consoleClear();
    }
  } catch {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};

// test crud function
export const adminTestCrud = async (
  {
    urlType,
    crudData,
    setLoading,
    setResData,
    editOrDeleteID
  }: {
    urlType: string,
    crudData: any,
    setLoading: (val: boolean) => void,
    setResData: (val: boolean) => void,
    editOrDeleteID?: string
  }
) => {
  setLoading(true);
  if (urlType === 'post') {
    let addData = {
      name: crudData.name,
      categoryId: crudData.categoryId,
      finiteError: crudData.finiteError,
      type: crudData.type,
      difficulty: crudData.difficulty,
      attachmentIds: crudData.attachmentIds,
      optionDtos: crudData.optionDtos
    };
    if (addData.name && addData.categoryId && addData.difficulty && addData.type) {
      try {
        const { data } = await axios.post(question_crud, addData, config);
        if (data.success) {
          setResData(true);
          setLoading(false);
          toast.success('Тест муваффақиятли сақланди');
        } else {
          toast.error('Тест сақлашда хатолик юз берди');
          setLoading(false);
        }
      } catch {
        consoleClear();
        toast.error('Тест сақлашда хатолик юз берди');
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error('Маълумотлар тўлиқлигини текшириб қайтадан уриниб кўринг');
    }
  } else if (urlType === 'put') {
    try {
      if (editOrDeleteID) {
        const { data } = await axios.put(`${question_crud}/${editOrDeleteID}`, {
          name: crudData.name,
          categoryId: crudData.categoryId,
          type: crudData.type,
          difficulty: crudData.difficulty,
          finiteError: crudData.finiteError ? crudData.finiteError : 0,
          attachmentIds: crudData.attachmentIds ? crudData.attachmentIds : [],
          optionDtos: crudData.optionDtos
        }, config);
        if (data.success) {
          setResData(true);
          setLoading(false);
          toast.success('Тест муваффақиятли таҳрирланди');
        } else {
          toast.error('Хатолик юз берди');
          setLoading(false);
        }
      } else {
        toast.error('Хатолик юз берди');
        setLoading(false);
        consoleClear();
      }
    } catch {
      consoleClear();
      toast.error('Хатолик юз берди');
      setLoading(false);
    }
  } else if (urlType === 'delete') {
    try {
      if (editOrDeleteID) {
        const { data } = await axios.delete(`${question_crud}/${editOrDeleteID}`, config);
        if (data.success) {
          consoleClear();
          setResData(true);
          setLoading(false);
          toast.success('Тест муваффақиятли ўчирилди');
        } else {
          consoleClear();
          toast.error('Хатолик юз берди');
          setLoading(false);
        }
      } else {
        consoleClear();
        toast.error('Хатолик юз берди');
        setLoading(false);
      }
    } catch {
      consoleClear();
      toast.error('Хатолик юз берди');
      setLoading(false);
    }
  }
};

export const questionTransfer = async (
  testIds: any[],
  categoryID: any,
  setData: (val: null | TestList[]) => void,
  page: number | string,
  setTotalPage: (val: number) => void,
  setLoading: (val: boolean) => void,
  closeModalTest: () => void
) => {
  try {
    const transferData = {
      questionIds: testIds,
      categoryId: categoryID
    };
    const { data } = await axios.put(question_transfer, transferData, config);
    if (data.success) {
      await allFilterOrGet(setData, page, setTotalPage, setLoading);
      toast.success('Тест муваффақиятли кўчирилди');
      closeModalTest();
    } else {
      toast.error('Тест кўчиришда қандайдир хатолик юз берди');
      closeModalTest();
    }
  } catch (err) {
    closeModalTest();
    toast.error('Тест кўчиришда қандайдир хатолик юз берди');
    consoleClear();
  }
};

export const testGetOne = async (setData: (val: null | TestOneAdmin) => void, setLoading: (val: boolean) => void, id: string | number) => {
  setLoading(true);
  try {
    const { data } = await axios.get(`${question_crud}/${id}`, config);
    if (data.success) {
      setLoading(false);
      setData(data.body);
    } else {
      setData(null);
      setLoading(false);
      consoleClear();
    }
  } catch {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};
