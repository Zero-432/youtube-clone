import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Video } from '../models/video'

export interface VideoState {
    currentVideo?: Video
    loading?: boolean
    error: boolean
}

const initialState: VideoState = {
    currentVideo: undefined,
    loading: false,
    error: false,
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action: PayloadAction<Video>) => {
            state.loading = false
            state.currentVideo = action.payload
        },
        fetchFailure: (state) => {
            state.loading = false
            state.error = true
        },
    },
})

// Actions
export const { fetchStart, fetchSuccess, fetchFailure } = videoSlice.actions

// Reducer
export default videoSlice.reducer
