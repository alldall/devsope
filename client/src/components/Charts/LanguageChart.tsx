'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
    name: string
    count: number
}

export default function LanguageChart() {
    const reposLanguages = useSelector((state: RootState) => state.reposLanguages.data)

    if (!reposLanguages || reposLanguages.length === 0) return <p>Нет данных</p>

    const languagesMap: Record<string, number> = {}

    reposLanguages.forEach((repoLangs: Record<string, number>) => {
        Object.entries(repoLangs).forEach(([lang, bytes]) => {
            const count = Number(bytes) || 0
            languagesMap[lang] = (languagesMap[lang] || 0) + count
        })
    })

    const chartData: ChartData[] = Object.entries(languagesMap).map(
        ([name, count]) => ({ name, count })
    )

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}