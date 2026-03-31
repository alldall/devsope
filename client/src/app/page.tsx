'use client'

import SearchBar from '@/components/SearchBar/SearchBar'
import LanguageChart from '@/components/Charts/LanguageChart'
import ActivityChart from '@/components/Charts/ActivityChart'
import styles from './page.module.scss'
import UserCard from '@/components/UserCard/UserCard'
import TopRepos from '@/components/TopRepos/TopRepos'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Loader from '@/components/Loader/Loader'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

export default function Home() {
  const reposLoading = useSelector((state: RootState) => state.repos.loading)
  const userLoading = useSelector((state: RootState) => state.user.loading)
  const languagesLoading = useSelector((state: RootState) => state.reposLanguages.loading)
  const isLoading = reposLoading || userLoading || languagesLoading

  const user = useSelector((state: RootState) => state.user.data)

  return (
    <main className={styles.container}>
      <h1>DevScope Dashboard</h1>

      <ThemeToggle />

      <SearchBar />

      {isLoading ? (
        <Loader />
      ) : (
        user && <UserCard />
      )}

      {user && (
        <div className={styles.charts}>
          <div className={styles.card}>
            <h2>Top языки</h2>
            <LanguageChart />
          </div>

          {user && (
            <>
                <TopRepos />
            </>
          )}

          <div className={styles.card}>
            <h2>Активность репозиториев</h2>
            <ActivityChart />
          </div>
        </div>
      )}
    </main>
  )
}