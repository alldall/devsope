import { configureStore } from '@reduxjs/toolkit'
import reposReducer from './reposSlice'
import reposLanguagesReducer from './reposLanguagesSlice'
import userReducer from './userSlice'
import activityReducer from './activitySlice'

export const store = configureStore({
    reducer: {
        repos: reposReducer,
        reposLanguages: reposLanguagesReducer,
        user: userReducer,
        activity: activityReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch