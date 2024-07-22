export interface Test {
    quizData: TestMainData,
    setQuizData: (val: TestMainData) => void
    resultId: number,
    setResult: (val: string) => void
    result: string,
    setResultId: (val: number) => void
    currentIndex: number,
    setCurrentIndex: (val: number) => void
}

export interface TestMainData {
    quizList: TestQuestionDtoList[],
    quiz: TestData,
    currentQuestionIndex: number,
    remainingTime: number
}

export interface TestData {
    questionDtoList: TestQuestionDtoList[],
    duration: number,
    countAnswers: number
}

export interface TestQuestionDtoList {
    id: number,
    name: string,
    categoryName: string,
    categoryId: number,
    type: string,
    score: number,
    attachmentName: string[],
    optionDtos: TestOptionDtos[],
    isMain: null
}

export interface TestOptionDtos {
    id: number,
    answer: string,
    questionId: number,
    isCorrect: boolean
}