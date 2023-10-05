import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import questionSlice from './questionSlice'


export const store = configureStore({
    reducer: {
        user: userSlice,
        quesions: questionSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch