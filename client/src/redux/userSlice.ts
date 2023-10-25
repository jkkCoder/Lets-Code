import { createSlice } from "@reduxjs/toolkit"

export interface UserSlice {
    _id: string
    userName: string
    email: string
    isAdmin: boolean | null
    fullName: string
}

const initialState : UserSlice = {
    _id:'',
    userName : '',
    email: '',
    isAdmin: null,
    fullName: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (_, action) => {
            return action.payload
        },
        logout: () => {
            return initialState
        }
    }
})

export const {addUser, logout} = userSlice.actions
export default userSlice.reducer