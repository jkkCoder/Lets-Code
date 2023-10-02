import { createSlice } from "@reduxjs/toolkit"

interface UserSlice {
    userName: string
    email: string
    isAdmin: boolean | null
    fullname: string
}

const initialState : UserSlice = {
    userName : '',
    email: '',
    isAdmin: null,
    fullname: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        logout: () => {
            return initialState
        }
    }
})

export const {addUser, logout} = userSlice.actions
export default userSlice.reducer