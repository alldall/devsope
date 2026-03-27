import { configureStore } from '@reduxjs/toolkit'
import reposReducer from './reposSlice'
import reposLanguagesReducer from './reposLanguagesSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        repos: reposReducer,
        reposLanguages: reposLanguagesReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch