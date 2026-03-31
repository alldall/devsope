'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import styles from './UserCard.module.scss'

export default function UserCard() {
    const user = useSelector((state: RootState) => state.user.data)

    if (!user) return null

    return (
        <div className={styles.card}>
            <img
                src={user.avatar_url}
                alt="avatar"
                className={styles.avatar}
            />

            <div className={styles.info}>
                <div className={styles.name}>
                    {user.name || user.login}
                </div>

                <div className={styles.bio}>
                    {user.bio || 'Нет описания'}
                </div>

                <div className={styles.stats}>
                    <span>👥 {user.followers}</span>
                    <span>📦 {user.public_repos}</span>
                </div>
            </div>
        </div>
    )
}