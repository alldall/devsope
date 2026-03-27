import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api'

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (username: string) => {
        const response = await api.get(`/user/${username}`)
        return response.data
    }
)

interface UserState {
    data: any
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Ошибка'
            })
    }
})

export default userSlice.reducer