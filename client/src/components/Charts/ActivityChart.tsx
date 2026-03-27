'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { parseISO, format } from 'date-fns'

interface ChartData {
    month: string
    count: number
}

export default function ActivityChart() {
    const repos = useSelector((state: RootState) => state.repos.data)

    if (!repos || repos.length === 0) return <p>Нет данных</p>

    const commitsPerMonth: Record<string, number> = {}

    repos.forEach((repo: any) => {
        if (repo.updated_at) {
            const month = format(parseISO(repo.updated_at), 'yyyy-MM')
            commitsPerMonth[month] = (commitsPerMonth[month] || 0) + 1
        }
    })

    const chartData: ChartData[] = Object.keys(commitsPerMonth)
        .sort()
        .map((month) => ({ month, count: commitsPerMonth[month] }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}