'use client'

import SearchBar from '@/components/SearchBar/SearchBar'
import LanguageChart from '@/components/Charts/LanguageChart'
import ActivityChart from '@/components/Charts/ActivityChart'

export default function Home() {
  return (
    <main>
      <h1>DevScope Dashboard</h1>
      <SearchBar />

      <h2>Top языки</h2>
      <LanguageChart />

      <h2>Активность репозиториев</h2>
      <ActivityChart />
    </main>
  )
}