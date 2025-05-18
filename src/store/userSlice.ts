import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "@/types";



const initialState: UserState = {
    user: null,
    authStatus: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: UserState, action: PayloadAction<UserState>) => {
            return action.payload
        },
        logout: function(state){
            state.user = null
            state.authStatus = false
        }
    }
})

export const {login,logout} = userSlice.actions
export default userSlice.reducer