import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    user: {
        fullName: string,
        username: string,
        profilePic: string,
        coverPic: string,
        email: string,
        isEmailVerified: boolean
    },
    accessToken: string,
    refreshToken: string
}

const initialState: UserState = {
    user: {
        fullName: '',
        username: '',
        profilePic: '',
        coverPic: '',
        email: ''
    },
    accessToken: '',
    refreshToken: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action: PayloadAction<UserState>) => {
            state = action.payload
        },
        logout: (state) => {
            state = initialState
        }
    }
})

export const {login,logout} = userSlice.actions
export default userSlice.reducer