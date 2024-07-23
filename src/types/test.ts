export interface Test {
  quizData: TestMainData,
  setQuizData: (val: TestMainData) => void
  resultId: number,
  setResult: (val: string) => void
  result: string,
  setResultId: (val: number) => void
  currentIndex: number,
  setCurrentIndex: (val: number) => void
  testList: TestList[] | null
  setTestList: (val: TestList[] | null) => void
  optionDto: OptionsDto[] | null
  setOptionDto: (val: OptionsDto[] | null) => void
  testOne: TestList | null
  setTestOne: (val: TestList | null) => void
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

// admin u/n
export interface TestList {
  id: number
  name: string
  categoryName: string
  categoryId: number
  type: string
  score: number
  attachmentIds: any,
  optionDtos: OptionDtoList[]
  isMain: null | string
}

export interface OptionDtoList {
  id: number;
  answer: string;
  questionId: number;
  isCorrect: boolean;
}

export interface OptionsDto {
  id: number;
  answer: string;
  isCorrect: boolean;
}