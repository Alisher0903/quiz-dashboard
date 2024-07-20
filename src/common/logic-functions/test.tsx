import axios from "axios"
import { config } from "../api/token"
import { TestMainData, TestQuestionDtoList } from "../../types/test"
import { quiz_pass, quiz_start } from "../api/api"
import { useNavigate } from "react-router-dom"

export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void) => {
    try {
        const { data } = await axios.get(`${quiz_start}/${id}`, config);
        if (data.success) {
            setQuizData({ quizList: data.body.questionDtoList, quiz: data.body, currentQuestionIndex: 0, remainingTime: data.body.duration })
        }
    } catch (error) {
        console.log(error);
    }
}

export const sendResults = async (id: string, duration: number, countAnswers: number, payload: TestQuestionDtoList[]) => {
    const navigate = useNavigate()
    try {
        const { data } = await axios.post(`${quiz_pass}?categoryId=${id}&duration${duration}&countAnswers=${countAnswers}`, payload, config);
        if (data.success) {
            navigate('')
        } else {

        }
    } catch (error) {

    }
}