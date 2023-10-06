import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import questionSlice from './questionSlice'
import categorySlice from './categorySlice'


export const store = configureStore({
    reducer: {
        user: userSlice,
        questions: questionSlice,
        categories: categorySlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch