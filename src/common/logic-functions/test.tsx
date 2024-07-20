import axios from "axios"
import { config } from "../api/token"
import { TestMainData } from "../../types/test"
import { quiz_pass, quiz_start } from "../api/api"
import { useNavigate } from "react-router-dom"

const navigate = useNavigate()


export const fetchQuiz = async (id: string | undefined, setQuizData: (val: TestMainData) => void) => {
    try {
        const { data } = await axios.get(`${quiz_start}${id}`, config);
        if (data.success) {
            setQuizData({ quizList: data.body.questionDtoList, quiz: data.body, currentQuestionIndex: 0, remainingTime: data.body.duration })
        }
    } catch (error) {
        console.log(error);
    }
}

export const sendResults = async (id: string | undefined, duration: number, countAnswers: number, payload: any[]) => {
    try {
        const { data } = await axios.post(`${quiz_pass}/${id}?duration=${duration}&countAnswers=${countAnswers}`, payload, config);
        if (data.success) {
            console.log('aaaaaaaaa');

        } else {

        }
    } catch (error) {

    }
}