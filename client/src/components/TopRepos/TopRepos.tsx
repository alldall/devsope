'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import styles from './TopRepos.module.scss'

export default function TopRepos() {
    const repos = useSelector((state: RootState) => state.repos.data)
    const user = useSelector((state: RootState) => state.user.data)
    
    if (!user) return null
    if (!repos || repos.length === 0) return <p>Нет данных</p>

    const topRepos = [...repos]
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)

    return (
        <div className={styles.card}>
            <h2>Топ репозитории</h2>
            {topRepos.map((repo: any) => (
                <div key={repo.id} className={styles.repo}>
                    <span className={styles.name}>{repo.name}</span>
                    <span className={styles.stars}>⭐ {repo.stargazers_count}</span>
                </div>
            ))}
        </div>
    )
}