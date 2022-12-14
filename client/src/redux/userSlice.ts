import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/user'

export interface UserState {
    currentUser?: User
    isLoggedIn: boolean
    loading?: boolean
    error: boolean
}

const initialState: UserState = {
    currentUser: undefined,
    isLoggedIn: false,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true
            state.loading = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.loading = false
            state.error = false
            state.currentUser = undefined
        },
        subscription: (state, action: PayloadAction<string>) => {
            if (state.currentUser?.subscribedUsers.includes(action.payload)) {
                state.currentUser?.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex((userId) => userId === action.payload),
                    1
                )
            } else {
                state.currentUser?.subscribedUsers.push(action.payload)
            }
        },
    },
})

// Actions
export const { login, loginSuccess, loginFailure, logout, subscription } = userSlice.actions

// Reducer
export default userSlice.reducer
