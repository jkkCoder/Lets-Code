import { createSlice } from "@reduxjs/toolkit";

export interface QuestionSlice {
    _id: string;
    title: string;
    difficulty: string;
}

const initialState = {
    questions: [] as QuestionSlice[]
}

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestions: (state,action) => {
            state.questions = action.payload
        }
    }
})


export const {addQuestions} = questionSlice.actions
export default questionSlice.reducer
