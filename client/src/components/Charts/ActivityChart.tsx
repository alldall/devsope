'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { parseISO, format } from 'date-fns'
import { fetchActivity } from '@/store/activitySlice'

interface ChartData {
    month: string
    count: number
}

export default function ActivityChart() {
    const dispatch = useDispatch<AppDispatch>()
    const activity = useSelector((state: RootState) => state.activity.data)
    const loading = useSelector((state: RootState) => state.activity.loading)

    useEffect(() => {
        const username = localStorage.getItem('lastSearchedUser')
        if (username) dispatch(fetchActivity(username))
    }, [dispatch])

    if (loading) return <p>Загрузка...</p>
    if (!activity || activity.length === 0) return <p>Нет данных</p>

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activity}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}