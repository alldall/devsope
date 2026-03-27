import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api'

export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async (username: string) => {
        const response = await api.get(`/repos/${username}`)
        return response.data
    }
)

interface ReposState {
    data: any[]
    loading: boolean
    error: string | null
}

const initialState: ReposState = {
    data: [],
    loading: false,
    error: null
}

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Ошибка'
            })
    }
})

export default reposSlice.reducer