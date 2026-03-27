import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api'

export const fetchReposLanguages = createAsyncThunk(
    'reposLanguages/fetch',
    async (username: string) => {
        const response = await api.get(`/repos-languages/${username}`)
        return response.data
    }
)

interface ReposLanguagesState {
    data: Array<Record<string, number>>
    loading: boolean
    error: string | null
}

const initialState: ReposLanguagesState = {
    data: [],
    loading: false,
    error: null
}

const reposLanguagesSlice = createSlice({
    name: 'reposLanguages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReposLanguages.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchReposLanguages.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchReposLanguages.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Ошибка'
            })
    }
})

export default reposLanguagesSlice.reducer