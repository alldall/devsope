import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api'

export const fetchActivity = createAsyncThunk(
    'activity/fetch',
    async (username: string) => {
        const response = await api.get(`/activity/${username}`)
        return response.data
    }
)

interface ActivityState {
    data: Array<{ date: string; count: number }>
    loading: boolean
    error: string | null
}

const initialState: ActivityState = { data: [], loading: false, error: null }

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchActivity.pending, state => { state.loading = true; state.error = null })
            .addCase(fetchActivity.fulfilled, (state, action) => { state.loading = false; state.data = action.payload })
            .addCase(fetchActivity.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Ошибка' })
    }
})

export default activitySlice.reducer