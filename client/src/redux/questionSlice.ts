import { createSlice } from "@reduxjs/toolkit";

export  interface QuestionSlice {
    _id?: string;
    title: string;
    difficulty: string;
    Category?: string | undefined | null;
    description?: string;
    testCases?: {
        input: string;
        expectedOutput: string;
        explanation: string;
    }[]
}


const initialState = {
    questions: [] as QuestionSlice[],
    questionsLoading: true as boolean,
    currentQuestion: {} as QuestionSlice,
    currentQuestionLoading: true as boolean,
}

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestions: (state,action) => {
            state.questions = action.payload
        },
        setQuestionsLoading: (state,action) => {
            state.questionsLoading = action.payload
        },
        addCurrentQuestion: (state,action) => {
            state.currentQuestion = action.payload
        },
        removeCurrentQuestion: (state) => {
            state.currentQuestion = {} as QuestionSlice
        },
        setCurrentQuestionLoading: (state,action) => {
            state.currentQuestionLoading = action.payload
        }
    }
})


export const {addQuestions, addCurrentQuestion, removeCurrentQuestion,setCurrentQuestionLoading, setQuestionsLoading} = questionSlice.actions
export default questionSlice.reducer
