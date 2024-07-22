import { create } from 'zustand';
import { Test, TestMainData } from '../../types/test.ts';

const useTestStore = create<Test>((set) => ({
    quizData: {
        quiz: {
            questionDtoList: [],
            countAnswers: 0,
            duration: 0
        },
        quizList: [],
        currentQuestionIndex: 0,
        remainingTime: 0
    },
    resultId: 0,
    result: '',
    setResultId: (val: number) => set({ resultId: val }),
    setResult: (val: string) => set({ result: val }),
    setQuizData: (val: TestMainData) => set({ quizData: val }),
    currentIndex: 0,
    setCurrentIndex: (val: number) => set({ currentIndex: val })
}));

export default useTestStore;