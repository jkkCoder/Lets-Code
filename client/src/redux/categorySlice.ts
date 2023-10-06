import { createSlice } from "@reduxjs/toolkit"
import { QuestionSlice } from "./questionSlice"

interface CategorySlice {
    _id: string
    name: string
    question: QuestionSlice[]
}

const initialState  = {
    categories: [] as CategorySlice[],
    categoryLoading: false
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories = action.payload
        },
        setCategoryLoading: (state,action) => {
            state.categoryLoading = action.payload
        }
    }
})

export const {addCategory, setCategoryLoading} = categorySlice.actions
export default categorySlice.reducer