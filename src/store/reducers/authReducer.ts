import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface AuthState {
    uid : string
}

const initialState: AuthState = {
    uid: '',
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.uid = action.payload
        },
        logout: (state) => {
            state.uid = ''
        }
    }
})

export const { login, logout } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.uid

export default authSlice.reducer