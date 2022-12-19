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
        subscription: (state, action: PayloadAction<string | undefined>) => {
            if (action.payload && state.currentUser?.subscribedUsers.includes(action.payload)) {
                state.currentUser?.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex((userId) => userId === action.payload),
                    1
                )
            } else {
                action.payload && state.currentUser?.subscribedUsers.push(action.payload)
            }
        },
        addSub: (state) => {
            if (state.currentUser) {
                state.currentUser.subscribers += 1
            }
        },
        minusSub: (state) => {
            if (state.currentUser) {
                state.currentUser.subscribers -= 1
            }
        },
    },
})

// Actions
export const { login, loginSuccess, loginFailure, logout, subscription, addSub, minusSub } = userSlice.actions

// Reducer
export default userSlice.reducer
