'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function UserCard() {
    const { data, loading, error } = useSelector((state: RootState) => state.user)

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>{error}</p>
    if (!data) return null

    return (
        <div>
            <img src={data.avatar_url} alt={data.login} width={100} />
            <h2>{data.login}</h2>
            <p>Repos: {data.public_repos}</p>
            <p>Followers: {data.followers}</p>
        </div>
    )
}