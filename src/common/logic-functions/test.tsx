import axios from 'axios';
import { config } from '../api/token';
import { TestList, TestMainData } from '../../types/test';
import {
  certificate, question_all_filter,
  question_crud,
  quiz_pass,
  quiz_start
} from '../api/api';
import toast from 'react-hot-toast';

export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void, setIsLoading: (val: boolean) => void) => {
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
      localStorage.removeItem('remainingTime')
      localStorage.removeItem('currentIndex')
      setIsLoading(false);
    } else setIsLoading(false);
  } catch (err: any) {
    toast.error(err.response.data.message);
    setIsLoading(false);
  }
};

export const sendResults = async (id: string | undefined, duration: number, countAnswers: number, payload: any[], navigate: (path: string) => void, setResult: (val: string) => void, setIsLoading: (val: boolean) => void, setLoading: (val: boolean) => void, setCurrentIndex: (val: number) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.post(`${quiz_pass}/${id}?duration=${duration}&countAnswers=${countAnswers}`, payload, config);
    if (data.success) {
      navigate('/client/quiz/result');
      getCertificate(data.body, setResult, setLoading);
      setIsLoading(false);
      setCurrentIndex(0);
    } else setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    toast.error('Iltimos keyinroq urinib ko\'ring');
  }
};

export const getCertificate = async (id: number, setResult: (val: string) => void, setIsLoading: (val: boolean) => void) => {
  setIsLoading(true);
  try {
    const { data } = await axios.post(`${certificate}${id}`, {}, config);
    setIsLoading(false);
    setResult(data);
  } catch (error) {
    setIsLoading(false);
  }
};

//===================ADMIN=========================
// all get or filter
export const allFilterOrGet = async (setData: (val: null | TestList[]) => void, name?: string, categoryId?: string | number, type?: string) => {
  const queryParams: string = [
    name ? `questionName=${name}` : '',
    categoryId ? `categoryId=${categoryId}` : '',
    type ? `type=${type}` : ''
  ].filter(Boolean).join('&');
  const url: string = `${question_all_filter}${queryParams ? `?${queryParams}` : ''}`;
  try {
    const { data } = await axios.get(url, config);
    if (data.success) setData(data.body);
    else setData(null);
  } catch (err) {
    setData(null);
    console.error(err);
  }
};

// get one test
export const getOneTest = async (setData: (val: TestList | null | any) => void, id: number | string) => {
  try {
    if (id) {
      const { data } = await axios.get(`${question_crud}/${id}`, config);
      if (data.success) setData(data.body);
      else setData(null);
    }
  } catch (err) {
    setData(null);
    console.error(err);
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
    try {
      const { data } = await axios.post(question_crud, crudData, config);
      if (data.success) {
        setResData(true);
        setLoading(false);
        toast.success('Successfully test saved');
      } else {
        toast.error('Error test saved');
        setLoading(false);
      }
    } catch (err) {
      toast.error('Error test saved');
      console.error(err);
      setLoading(false);
    }
  } else if (urlType === 'put') {
    try {
      if (editOrDeleteID) {
        const { data } = await axios.put(`${question_crud}/${editOrDeleteID}`, crudData, config);
        if (data.success) {
          setResData(true);
          setLoading(false);
          toast.success('Successfully test editing');
        } else {
          toast.error('An error occurred');
          setLoading(false);
        }
      } else {
        toast.error('An error occurred');
        setLoading(false);
      }
    } catch (err) {
      toast.error('An error occurred');
      console.error(err);
      setLoading(false);
    }
  } else if (urlType === 'delete') {
    try {
      if (editOrDeleteID) {
        const { data } = await axios.delete(`${question_crud}/${editOrDeleteID}`, config);
        if (data.success) {
          setResData(true);
          setLoading(false);
          toast.success('Successfully test deleting');
        } else {
          toast.error('An error occurred');
          setLoading(false);
        }
      } else {
        toast.error('An error occurred');
        setLoading(false);
      }
    } catch (err) {
      toast.error('An error occurred');
      console.error(err);
      setLoading(false);
    }
  }
};
