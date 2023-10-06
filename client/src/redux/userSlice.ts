import { createSlice } from "@reduxjs/toolkit"

interface UserSlice {
    _id: string
    userName: string
    email: string
    isAdmin: boolean | null
    fullname: string
}

const initialState : UserSlice = {
    _id:'',
    userName : '',
    email: '',
    isAdmin: null,
    fullname: ''
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