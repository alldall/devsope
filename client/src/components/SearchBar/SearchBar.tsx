'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { fetchUser } from '@/store/userSlice'

export default function SearchBar() {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleSearch = () => {
        if (username) {
            dispatch(fetchUser(username))
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Введите GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Поиск</button>
        </div>
    )
}