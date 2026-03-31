'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { parseISO, format } from 'date-fns'

interface ChartData {
    date: string
    count: number
}

export default function ActivityChart() {
    const repos = useSelector((state: RootState) => state.repos.data)

    if (!repos || repos.length === 0) return <p>Нет данных</p>

    const activityMap: Record<string, number> = {}

    repos.forEach((repo: any) => {
        if (repo.updated_at) {
            const date = format(parseISO(repo.updated_at), 'yyyy-MM-dd')
            activityMap[date] = (activityMap[date] || 0) + 1
        }
    })

    const chartData: ChartData[] = Object.keys(activityMap)
        .sort()
        .map((date) => ({
            date,
            count: activityMap[date],
        }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}