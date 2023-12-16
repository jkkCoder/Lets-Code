import { createSlice } from "@reduxjs/toolkit"

export interface UserSlice {
    _id: string
    userName: string
    email: string
    isAdmin: boolean | null
    fullName: string,
    profileUrl: string | undefined
}

const initialState : UserSlice = {
    _id:'',
    userName : '',
    email: '',
    isAdmin: null,
    fullName: '',
    profileUrl: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (_, action) => {
            return action.payload
        },
        updateProfile: (state,action) => {
            return {
                ...state,
                profileUrl: action.payload.url
            }
        },
        logout: () => {
            return initialState
        }
    }
})

export const {addUser, logout,updateProfile} = userSlice.actions
export default userSlice.reducer