'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { fetchUser } from '@/store/userSlice'
import { fetchRepos } from '@/store/reposSlice'
import { fetchReposLanguages } from '@/store/reposLanguagesSlice'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
    const [username, setUsername] = useState('')
    const [history, setHistory] = useState<string[]>([])
    useEffect(() => {
        const saved = localStorage.getItem('searchHistory')
        if (saved) {
            setHistory(JSON.parse(saved))
        }
    }, [])
    const dispatch = useDispatch<AppDispatch>()

    const handleSearch = () => {
        if (!username) return
        dispatch(fetchUser(username))
        dispatch(fetchRepos(username))
        dispatch(fetchReposLanguages(username))

        let newHistory = [username, ...history.filter((u) => u !== username)]
        newHistory = newHistory.slice(0, 5)
        setHistory(newHistory)
        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    }

    const handleHistoryClick = (user: string) => {
        setUsername(user)

        dispatch(fetchUser(user))
        dispatch(fetchRepos(user))
        dispatch(fetchReposLanguages(user))
    }

    return (
        <div className={styles.container}>
            <input className={styles.input}

                type="text"
                value={username}
                placeholder="Введите GitHub ник"
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className={styles.button} onClick={handleSearch}>Поиск</button>
            <div className={styles.history}>
                {history.map((user) => (
                    <button
                        key={user}
                        className={styles.historyItem}
                        onClick={() => handleHistoryClick(user)}
                    >
                        {user}
                    </button>
                ))}
            </div>
        </div>

    )
}