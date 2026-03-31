'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { fetchUser } from '@/store/userSlice'
import { fetchRepos } from '@/store/reposSlice'
import { fetchReposLanguages } from '@/store/reposLanguagesSlice'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleSearch = () => {
        if (!username) return
        dispatch(fetchUser(username))
        dispatch(fetchRepos(username))
        dispatch(fetchReposLanguages(username))
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
        </div>
    )
}