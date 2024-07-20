import axios from "axios";
import { config } from "../api/token";
import { TestMainData } from "../../types/test";
import { quiz_pass, quiz_start } from "../api/api";

export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void) => {
    try {
        const { data } = await axios.get(`${quiz_start}${id}`, config);
        if (data.success) {
            setQuizData({ quizList: data.body.questionDtoList, quiz: data.body, currentQuestionIndex: 0, remainingTime: data.body.duration });
        }
    } catch { }
}

export const sendResults = async (id: string | undefined, duration: number, countAnswers: number, payload: any[], navigate: (path: string) => void) => {
    try {
        const { data } = await axios.post(`${quiz_pass}/${id}?duration=${duration}&countAnswers=${countAnswers}`, payload, config);
        if (data.success) {
            navigate('/client/quiz/result');
        }
    } catch { }
}