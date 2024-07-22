import axios from "axios";
import { config } from "../api/token";
import { TestMainData } from "../../types/test";
import { certificate, quiz_pass, quiz_start } from "../api/api";
import toast from "react-hot-toast";

export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true)
    try {
        const { data } = await axios.get(`${quiz_start}${id}`, config);
        if (data.success) {
            setQuizData({ quizList: data.body.questionDtoList, quiz: data.body, currentQuestionIndex: 0, remainingTime: data.body.duration });
            setIsLoading(false)
        }
    } catch {
        setIsLoading(false)
    }
}

export const sendResults = async (id: string | undefined, duration: number, countAnswers: number, payload: any[], navigate: (path: string) => void, setResult: (val: string) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true)
    try {
        const { data } = await axios.post(`${quiz_pass}/${id}?duration=${duration}&countAnswers=${countAnswers}`, payload, config);
        if (data.success) {
            navigate('/client/quiz/result');
            getCertificate(data.body, setResult)
            setIsLoading(false)
        }
    } catch {
        setIsLoading(false)
        toast.error('Iltimos keyinror urinib ko\'ring')
    }
}

export const getCertificate = async (id: number, setResult: (val: string) => void) => {
    try {
        const { data } = await axios.post(`${certificate}${id}`, {}, config);
        setResult(data)
    } catch (error) {
        console.log(error);
    }
}