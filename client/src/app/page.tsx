'use client'

import SearchBar from '@/components/SearchBar/SearchBar'
import LanguageChart from '@/components/Charts/LanguageChart'
import ActivityChart from '@/components/Charts/ActivityChart'
import styles from './page.module.scss'
import UserCard from '@/components/UserCard/UserCard'

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>DevScope Dashboard</h1>

      <SearchBar />
      <UserCard />

      <div className={styles.charts}>
        <div className={styles.card}>
          <h2>Top языки</h2>
          <LanguageChart />
        </div>

        <div className={styles.card}>
          <h2>Активность репозиториев</h2>
          <ActivityChart />
        </div>
      </div>
    </main>
  )
}